import { NextRequest, NextResponse } from 'next/server'

// Mock applications data
const applications = [
  {
    id: '1',
    application_id: 'APP-2024-0001',
    first_name: 'Aisha',
    last_name: 'Bangura',
    email: 'aisha.bangura@email.com',
    phone: '+232 76 111222',
    program_id: '1',
    program_name: 'Computer Science',
    admission_type: 'Regular',
    status: 'pending',
    documents_complete: true,
    submitted_at: '2024-11-20T10:30:00Z',
    reviewed_at: null,
    reviewed_by: null,
  },
  {
    id: '2',
    application_id: 'APP-2024-0002',
    first_name: 'Samuel',
    last_name: 'Koroma',
    email: 'samuel.koroma@email.com',
    phone: '+232 77 222333',
    program_id: '2',
    program_name: 'Business Administration',
    admission_type: 'Direct Entry',
    status: 'under_review',
    documents_complete: true,
    submitted_at: '2024-11-18T14:00:00Z',
    reviewed_at: null,
    reviewed_by: null,
  },
]

// GET /api/admissions - List all applications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const program = searchParams.get('program')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredApplications = [...applications]

    // Apply filters
    if (status && status !== 'all') {
      filteredApplications = filteredApplications.filter(a => a.status === status)
    }
    if (program && program !== 'all') {
      filteredApplications = filteredApplications.filter(a => a.program_id === program)
    }
    if (search) {
      const searchLower = search.toLowerCase()
      filteredApplications = filteredApplications.filter(a =>
        a.first_name.toLowerCase().includes(searchLower) ||
        a.last_name.toLowerCase().includes(searchLower) ||
        a.application_id.toLowerCase().includes(searchLower) ||
        a.email.toLowerCase().includes(searchLower)
      )
    }

    // Pagination
    const total = filteredApplications.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const paginatedApplications = filteredApplications.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: paginatedApplications,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

// POST /api/admissions - Create a new application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['first_name', 'last_name', 'email', 'phone', 'program_id']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Generate application ID
    const applicationId = `APP-${new Date().getFullYear()}-${String(applications.length + 1).padStart(4, '0')}`

    const newApplication = {
      id: String(applications.length + 1),
      application_id: applicationId,
      ...body,
      status: 'pending',
      documents_complete: false,
      submitted_at: new Date().toISOString(),
      reviewed_at: null,
      reviewed_by: null,
    }

    applications.push(newApplication)

    return NextResponse.json({
      success: true,
      data: newApplication,
      message: 'Application submitted successfully',
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
