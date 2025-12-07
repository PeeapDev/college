/**
 * SIS (School Information System) Client
 *
 * This client provides integration with the national School Information System (CSIS)
 * for certificate verification, student record synchronization, and blockchain operations.
 */

interface SISConfig {
  baseUrl: string
  apiKey: string
  institutionId: string
}

interface CertificateData {
  certificateNo: string
  studentName: string
  studentId: string
  program: string
  graduationYear: string
  classOfDegree: string
  cgpa: number
  issueDate: string
  institutionName: string
  institutionCode: string
}

interface VerificationResult {
  valid: boolean
  certificate?: CertificateData
  blockchainHash?: string
  verifiedAt?: string
  error?: string
}

interface BlockchainRecord {
  hash: string
  transactionId: string
  timestamp: string
  status: 'pending' | 'confirmed' | 'failed'
}

class SISClient {
  private config: SISConfig

  constructor(config: Partial<SISConfig> = {}) {
    this.config = {
      baseUrl: config.baseUrl || process.env.SIS_API_URL || 'http://localhost:3001/api',
      apiKey: config.apiKey || process.env.SIS_API_KEY || '',
      institutionId: config.institutionId || process.env.SIS_INSTITUTION_ID || '',
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-API-Key': this.config.apiKey,
      'X-Institution-ID': this.config.institutionId,
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }))
        throw new Error(error.message || `HTTP ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.error(`SIS API Error [${endpoint}]:`, error)
      throw error
    }
  }

  /**
   * Verify a certificate using the SIS blockchain (Solana)
   */
  async verifyCertificate(certificateNo: string): Promise<VerificationResult> {
    try {
      // First check if we have a blockchain record for this certificate
      const result = await this.request<{
        success: boolean
        verified?: boolean
        data?: {
          verified: boolean
          signature: string
          recordData: any
          explorerUrl: string
        }
        error?: string
      }>(`/blockchain/verify?studentId=${certificateNo}`)

      if (result.success && result.data) {
        return {
          valid: result.verified || false,
          blockchainHash: result.data.signature,
          verifiedAt: new Date().toISOString(),
        }
      }
      return { valid: false, error: result.error }
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Verification failed',
      }
    }
  }

  /**
   * Store a certificate on the Solana blockchain via SIS
   */
  async storeCertificate(certificate: CertificateData): Promise<BlockchainRecord> {
    const result = await this.request<{
      success: boolean
      data: {
        blockchainRecord: any
        signature: string
        slot: number
        explorerUrl: string
      }
      error?: string
    }>('/blockchain/store', {
      method: 'POST',
      body: JSON.stringify({
        studentId: certificate.studentId,
        schoolId: this.config.institutionId,
        recordType: 'CERTIFICATE',
        recordData: {
          certificateNo: certificate.certificateNo,
          studentName: certificate.studentName,
          program: certificate.program,
          graduationYear: certificate.graduationYear,
          classOfDegree: certificate.classOfDegree,
          cgpa: certificate.cgpa,
          issueDate: certificate.issueDate,
          institutionName: certificate.institutionName,
          institutionCode: certificate.institutionCode,
        },
      }),
    })

    if (!result.success) {
      throw new Error(result.error || 'Failed to store certificate')
    }

    return {
      hash: result.data.blockchainRecord.dataHash,
      transactionId: result.data.signature,
      timestamp: new Date().toISOString(),
      status: 'confirmed',
    }
  }

  /**
   * Get blockchain records for a student
   */
  async getStudentRecords(studentId: string): Promise<BlockchainRecord[]> {
    return this.request<BlockchainRecord[]>(
      `/blockchain/records?studentId=${studentId}`
    )
  }

  /**
   * Sync student data with SIS
   */
  async syncStudent(studentData: {
    studentId: string
    firstName: string
    lastName: string
    program: string
    enrollmentDate: string
    status: string
  }): Promise<{ success: boolean; sisId?: string }> {
    return this.request('/students/sync', {
      method: 'POST',
      body: JSON.stringify({
        ...studentData,
        institutionId: this.config.institutionId,
      }),
    })
  }

  /**
   * Report graduation to SIS
   */
  async reportGraduation(graduationData: {
    studentId: string
    program: string
    classOfDegree: string
    cgpa: number
    graduationDate: string
  }): Promise<{ success: boolean; recordId?: string }> {
    return this.request('/graduations/report', {
      method: 'POST',
      body: JSON.stringify({
        ...graduationData,
        institutionId: this.config.institutionId,
      }),
    })
  }

  /**
   * Get SIS connection status (Solana blockchain)
   */
  async getStatus(): Promise<{
    connected: boolean
    blockchain?: {
      type: string
      network: string
      walletAddress?: string
      balance?: number
    }
    lastSync?: string
    pendingRecords?: number
  }> {
    try {
      const result = await this.request<{
        success: boolean
        data: {
          blockchain: {
            type: string
            connected: boolean
            network: string
            currentSlot: number
            walletAddress: string
            balance: number
          }
          statistics: {
            totalRecordsStored: number
          }
        }
      }>('/blockchain/status')

      return {
        connected: result.data.blockchain.connected,
        blockchain: {
          type: result.data.blockchain.type,
          network: result.data.blockchain.network,
          walletAddress: result.data.blockchain.walletAddress,
          balance: result.data.blockchain.balance,
        },
        pendingRecords: result.data.statistics.totalRecordsStored,
      }
    } catch {
      return { connected: false }
    }
  }
}

// Export singleton instance
export const sisClient = new SISClient()

// Export class for custom instances
export { SISClient }
export type { SISConfig, CertificateData, VerificationResult, BlockchainRecord }
