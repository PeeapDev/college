import { NextRequest, NextResponse } from 'next/server'

// Mock student data
const students: Record<string, any> = {
  '1': {
    id: '1',
    student_id: 'STU-2024-001',
    first_name: 'John',
    middle_name: 'Michael',
    last_name: 'Kamara',
    email: 'john.kamara@email.com',
    phone: '+232 76 123456',
    gender: 'Male',
    date_of_birth: '2000-05-15',
    nationality: 'Sierra Leone',
    address: '45 Siaka Stevens Street',
    city: 'Freetown',
    program: 'Computer Science',
    department: 'Science & Technology',
    faculty: 'Faculty of Engineering',
    level: '300',
    status: 'active',
    admission_type: 'Regular',
    entry_year: '2022',
    expected_graduation: '2026',
    cgpa: 3.45,
    guardian_name: 'Mohamed Kamara',
    guardian_phone: '+232 76 000000',
    guardian_relationship: 'Father',
    enrollment_date: '2022-09-15',
  },
}

// GET /api/students/[id] - Get a single student
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const student = students[id]

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: student,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch student' },
      { status: 500 }
    )
  }
}

// PUT /api/students/[id] - Update a student
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    if (!students[id]) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    // Update student data
    students[id] = {
      ...students[id],
      ...body,
      updated_at: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: students[id],
      message: 'Student updated successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update student' },
      { status: 500 }
    )
  }
}

// DELETE /api/students/[id] - Delete a student
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!students[id]) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    // Soft delete - change status to 'withdrawn'
    students[id].status = 'withdrawn'
    students[id].deleted_at = new Date().toISOString()

    return NextResponse.json({
      success: true,
      message: 'Student deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete student' },
      { status: 500 }
    )
  }
}
