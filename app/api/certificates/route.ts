import { NextRequest, NextResponse } from 'next/server'

// Mock certificates data
const certificates = [
  {
    id: '1',
    certificate_no: 'CERT-2024-0001',
    student_id: '1',
    student_name: 'John Michael Kamara',
    student_number: 'STU-2021-001',
    program: 'Bachelor of Science in Computer Science',
    department: 'Computer Science',
    class_of_degree: 'Second Class Upper',
    cgpa: 3.45,
    graduation_year: '2024',
    type: 'degree',
    status: 'issued',
    issued_at: '2024-11-20T10:00:00Z',
    issued_by: 'Registrar Office',
    blockchain_hash: '0x8f3b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
    blockchain_tx: '0xabc123def456...',
    qr_code: 'https://verify.college.edu/CERT-2024-0001',
    verified: true,
  },
  {
    id: '2',
    certificate_no: 'CERT-2024-0002',
    student_id: '2',
    student_name: 'Mary Aminata Conteh',
    student_number: 'STU-2021-002',
    program: 'Bachelor of Arts in Business Administration',
    department: 'Business Administration',
    class_of_degree: 'First Class',
    cgpa: 3.78,
    graduation_year: '2024',
    type: 'degree',
    status: 'pending_approval',
    issued_at: null,
    issued_by: null,
    blockchain_hash: null,
    blockchain_tx: null,
    qr_code: null,
    verified: false,
  },
]

// GET /api/certificates - List all certificates
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const year = searchParams.get('year')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredCertificates = [...certificates]

    // Apply filters
    if (status && status !== 'all') {
      filteredCertificates = filteredCertificates.filter(c => c.status === status)
    }
    if (type && type !== 'all') {
      filteredCertificates = filteredCertificates.filter(c => c.type === type)
    }
    if (year && year !== 'all') {
      filteredCertificates = filteredCertificates.filter(c => c.graduation_year === year)
    }
    if (search) {
      const searchLower = search.toLowerCase()
      filteredCertificates = filteredCertificates.filter(c =>
        c.certificate_no.toLowerCase().includes(searchLower) ||
        c.student_name.toLowerCase().includes(searchLower) ||
        c.student_number.toLowerCase().includes(searchLower)
      )
    }

    // Pagination
    const total = filteredCertificates.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const paginatedCertificates = filteredCertificates.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: paginatedCertificates,
      summary: {
        total,
        issued: filteredCertificates.filter(c => c.status === 'issued').length,
        pending: filteredCertificates.filter(c => c.status === 'pending_approval').length,
        verified: filteredCertificates.filter(c => c.verified).length,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch certificates' },
      { status: 500 }
    )
  }
}

// POST /api/certificates - Issue a new certificate
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['student_id', 'program', 'type', 'graduation_year']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Generate certificate number
    const certType = body.type === 'transcript' ? 'TRANS' : 'CERT'
    const certificateNo = `${certType}-${new Date().getFullYear()}-${String(certificates.length + 1).padStart(4, '0')}`

    const newCertificate = {
      id: String(certificates.length + 1),
      certificate_no: certificateNo,
      ...body,
      status: 'pending_approval',
      issued_at: null,
      issued_by: null,
      blockchain_hash: null,
      blockchain_tx: null,
      qr_code: null,
      verified: false,
      created_at: new Date().toISOString(),
    }

    certificates.push(newCertificate)

    return NextResponse.json({
      success: true,
      data: newCertificate,
      message: 'Certificate created and pending approval',
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create certificate' },
      { status: 500 }
    )
  }
}
