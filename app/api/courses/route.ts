import { NextRequest, NextResponse } from 'next/server'

// Mock courses data
const courses = [
  {
    id: '1',
    code: 'CSC 301',
    title: 'Data Structures and Algorithms',
    description: 'Introduction to fundamental data structures and algorithmic techniques.',
    department_id: '1',
    department_name: 'Computer Science',
    credits: 3,
    level: '300',
    semester: 'First',
    lecturer_id: '1',
    lecturer_name: 'Dr. Sarah Johnson',
    capacity: 50,
    enrolled: 45,
    status: 'active',
  },
  {
    id: '2',
    code: 'CSC 303',
    title: 'Database Management Systems',
    description: 'Design and implementation of database systems.',
    department_id: '1',
    department_name: 'Computer Science',
    credits: 3,
    level: '300',
    semester: 'First',
    lecturer_id: '2',
    lecturer_name: 'Prof. James Cole',
    capacity: 50,
    enrolled: 42,
    status: 'active',
  },
  {
    id: '3',
    code: 'BUS 201',
    title: 'Principles of Management',
    description: 'Fundamentals of business management and organizational behavior.',
    department_id: '2',
    department_name: 'Business Administration',
    credits: 3,
    level: '200',
    semester: 'First',
    lecturer_id: '3',
    lecturer_name: 'Dr. Mary Williams',
    capacity: 80,
    enrolled: 78,
    status: 'active',
  },
]

// GET /api/courses - List all courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get('department')
    const level = searchParams.get('level')
    const semester = searchParams.get('semester')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredCourses = [...courses]

    // Apply filters
    if (department && department !== 'all') {
      filteredCourses = filteredCourses.filter(c => c.department_id === department)
    }
    if (level && level !== 'all') {
      filteredCourses = filteredCourses.filter(c => c.level === level)
    }
    if (semester && semester !== 'all') {
      filteredCourses = filteredCourses.filter(c => c.semester === semester)
    }
    if (search) {
      const searchLower = search.toLowerCase()
      filteredCourses = filteredCourses.filter(c =>
        c.code.toLowerCase().includes(searchLower) ||
        c.title.toLowerCase().includes(searchLower) ||
        c.lecturer_name.toLowerCase().includes(searchLower)
      )
    }

    // Pagination
    const total = filteredCourses.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const paginatedCourses = filteredCourses.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: paginatedCourses,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

// POST /api/courses - Create a new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['code', 'title', 'department_id', 'credits', 'level']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const newCourse = {
      id: String(courses.length + 1),
      ...body,
      enrolled: 0,
      status: 'active',
      created_at: new Date().toISOString(),
    }

    courses.push(newCourse)

    return NextResponse.json({
      success: true,
      data: newCourse,
      message: 'Course created successfully',
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    )
  }
}
