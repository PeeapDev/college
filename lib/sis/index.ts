/**
 * SIS Integration Module
 *
 * This module provides the bridge between the College Management System
 * and the national School Information System (CSIS).
 */

export { sisClient, SISClient } from './client'
export type {
  SISConfig,
  CertificateData,
  VerificationResult,
  BlockchainRecord,
} from './client'

/**
 * SIS Integration Features:
 *
 * 1. Certificate Verification
 *    - Verify certificates against blockchain records
 *    - Generate verification QR codes
 *    - Public verification portal integration
 *
 * 2. Student Data Synchronization
 *    - Sync student enrollment data to national registry
 *    - Update student status changes
 *    - Track multi-school enrollment history
 *
 * 3. Graduation Reporting
 *    - Report graduation to national system
 *    - Store certificates on blockchain
 *    - Generate immutable academic records
 *
 * 4. Blockchain Operations
 *    - Store academic records on-chain
 *    - Verify record authenticity
 *    - Track record history
 *
 * Usage:
 *
 * ```typescript
 * import { sisClient } from '@/lib/sis'
 *
 * // Verify a certificate
 * const result = await sisClient.verifyCertificate('CERT-2024-0001')
 *
 * // Store a certificate on blockchain
 * const record = await sisClient.storeCertificate({
 *   certificateNo: 'CERT-2024-0001',
 *   studentName: 'John Kamara',
 *   // ... other fields
 * })
 *
 * // Sync student data
 * await sisClient.syncStudent({
 *   studentId: 'STU-2024-001',
 *   firstName: 'John',
 *   lastName: 'Kamara',
 *   program: 'Computer Science',
 *   enrollmentDate: '2022-09-15',
 *   status: 'active',
 * })
 *
 * // Check connection status
 * const status = await sisClient.getStatus()
 * ```
 *
 * Configuration:
 *
 * Set the following environment variables:
 * - SIS_API_URL: Base URL of the SIS API
 * - SIS_API_KEY: API key for authentication
 * - SIS_INSTITUTION_ID: Your institution's ID in the SIS
 */
