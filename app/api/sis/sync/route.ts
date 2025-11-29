import { NextRequest, NextResponse } from 'next/server'
import { sisClient, CertificateData } from '@/lib/sis/client'

/**
 * POST /api/sis/sync - Sync data with SIS
 *
 * Supports syncing:
 * - Students
 * - Certificates
 * - Graduations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (!type || !data) {
      return NextResponse.json(
        { success: false, error: 'Type and data are required' },
        { status: 400 }
      )
    }

    let result

    switch (type) {
      case 'student':
        result = await sisClient.syncStudent({
          studentId: data.student_id,
          firstName: data.first_name,
          lastName: data.last_name,
          program: data.program,
          enrollmentDate: data.enrollment_date,
          status: data.status,
        })
        break

      case 'certificate':
        const certificateData: CertificateData = {
          certificateNo: data.certificate_no,
          studentName: data.student_name,
          studentId: data.student_id,
          program: data.program,
          graduationYear: data.graduation_year,
          classOfDegree: data.class_of_degree,
          cgpa: data.cgpa,
          issueDate: data.issue_date || new Date().toISOString(),
          institutionName: process.env.INSTITUTION_NAME || 'Demo University',
          institutionCode: process.env.INSTITUTION_CODE || 'DU',
        }
        result = await sisClient.storeCertificate(certificateData)
        break

      case 'graduation':
        result = await sisClient.reportGraduation({
          studentId: data.student_id,
          program: data.program,
          classOfDegree: data.class_of_degree,
          cgpa: data.cgpa,
          graduationDate: data.graduation_date,
        })
        break

      default:
        return NextResponse.json(
          { success: false, error: `Unknown sync type: ${type}` },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: `${type} synced successfully`,
    })
  } catch (error) {
    console.error('SIS sync error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to sync with SIS',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/sis/sync/status - Get SIS connection status
 */
export async function GET() {
  try {
    const status = await sisClient.getStatus()

    return NextResponse.json({
      success: true,
      data: status,
    })
  } catch (error) {
    return NextResponse.json({
      success: true,
      data: {
        connected: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      },
    })
  }
}
