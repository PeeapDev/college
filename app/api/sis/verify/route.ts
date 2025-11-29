import { NextRequest, NextResponse } from 'next/server'
import { sisClient } from '@/lib/sis/client'

/**
 * POST /api/sis/verify - Verify a certificate via SIS blockchain
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { certificateNo } = body

    if (!certificateNo) {
      return NextResponse.json(
        { success: false, error: 'Certificate number is required' },
        { status: 400 }
      )
    }

    const result = await sisClient.verifyCertificate(certificateNo)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('SIS verification error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to verify certificate',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/sis/verify?certificate=CERT-2024-0001 - Verify via GET request
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const certificateNo = searchParams.get('certificate')

    if (!certificateNo) {
      return NextResponse.json(
        { success: false, error: 'Certificate number is required' },
        { status: 400 }
      )
    }

    const result = await sisClient.verifyCertificate(certificateNo)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('SIS verification error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to verify certificate',
      },
      { status: 500 }
    )
  }
}
