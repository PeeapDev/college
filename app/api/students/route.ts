import { NextRequest, NextResponse } from 'next/server'

// Mock data - In production, this would come from Supabase
const students = [
  {
    id: '1',
    student_id: 'STU-2024-001',
    first_name: 'John',
    last_name: 'Kamara',
    email: 'john.kamara@email.com',
    phone: '+232 76 123456',
    program: 'Computer Science',
    department: 'Science & Technology',
    level: '300',
    status: 'active',
    enrollment_date: '2022-09-15',
    cgpa: 3.45,
  },
  {
    id: '2',
    student_id: 'STU-2024-002',
    first_name: 'Mary',
    last_name: 'Conteh',
    email: 'mary.conteh@email.com',
    phone: '+232 77 234567',
    program: 'Business Administration',
    department: 'Business',
    level: '200',
    status: 'active',
    enrollment_date: '2023-09-10',
    cgpa: 3.78,
  },
]

// GET /api/students - List all students
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const program = searchParams.get('program')
    const level = searchParams.get('level')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredStudents = [...students]

    // Apply filters
    if (status && status !== 'all') {
      filteredStudents = filteredStudents.filter(s => s.status === status)
    }
    if (program && program !== 'all') {
      filteredStudents = filteredStudents.filter(s => s.program === program)
    }
    if (level && level !== 'all') {
      filteredStudents = filteredStudents.filter(s => s.level === level)
    }
    if (search) {
      const searchLower = search.toLowerCase()
      filteredStudents = filteredStudents.filter(s =>
        s.first_name.toLowerCase().includes(searchLower) ||
        s.last_name.toLowerCase().includes(searchLower) ||
        s.student_id.toLowerCase().includes(searchLower) ||
        s.email.toLowerCase().includes(searchLower)
      )
    }

    // Pagination
    const total = filteredStudents.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const paginatedStudents = filteredStudents.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: paginatedStudents,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

// POST /api/students - Create a new student
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['first_name', 'last_name', 'email', 'program_id']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Generate student ID
    const studentId = `STU-${new Date().getFullYear()}-${String(students.length + 1).padStart(3, '0')}`

    const newStudent = {
      id: String(students.length + 1),
      student_id: studentId,
      ...body,
      status: 'active',
      enrollment_date: new Date().toISOString().split('T')[0],
      cgpa: 0,
    }

    // In production, this would be saved to Supabase
    students.push(newStudent)

    return NextResponse.json({
      success: true,
      data: newStudent,
      message: 'Student created successfully',
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create student' },
      { status: 500 }
    )
  }
}
