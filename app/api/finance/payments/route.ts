import { NextRequest, NextResponse } from 'next/server'

// Mock payments data
const payments = [
  {
    id: '1',
    receipt_no: 'RCP-2024-0001',
    student_id: '1',
    student_name: 'John Kamara',
    student_number: 'STU-2024-001',
    fee_type: 'TUITION',
    description: 'Tuition Fee - First Semester 2024/2025',
    amount: 2500,
    payment_method: 'bank_transfer',
    reference: 'TRF-123456',
    status: 'completed',
    paid_at: '2024-11-28T10:30:00Z',
    processed_by: 'John Smith',
  },
  {
    id: '2',
    receipt_no: 'RCP-2024-0002',
    student_id: '2',
    student_name: 'Mary Conteh',
    student_number: 'STU-2024-002',
    fee_type: 'REGISTRATION',
    description: 'Registration Fee',
    amount: 100,
    payment_method: 'mobile_money',
    reference: 'MM-789012',
    status: 'completed',
    paid_at: '2024-11-28T11:45:00Z',
    processed_by: 'John Smith',
  },
  {
    id: '3',
    receipt_no: 'RCP-2024-0003',
    student_id: '3',
    student_name: 'Ibrahim Sesay',
    student_number: 'STU-2024-003',
    fee_type: 'TUITION',
    description: 'Tuition Fee - First Semester 2024/2025',
    amount: 2500,
    payment_method: 'card',
    reference: 'CARD-345678',
    status: 'pending',
    paid_at: null,
    processed_by: null,
  },
]

// GET /api/finance/payments - List all payments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const feeType = searchParams.get('fee_type')
    const studentId = searchParams.get('student_id')
    const search = searchParams.get('search')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    let filteredPayments = [...payments]

    // Apply filters
    if (status && status !== 'all') {
      filteredPayments = filteredPayments.filter(p => p.status === status)
    }
    if (feeType && feeType !== 'all') {
      filteredPayments = filteredPayments.filter(p => p.fee_type === feeType)
    }
    if (studentId) {
      filteredPayments = filteredPayments.filter(p => p.student_id === studentId)
    }
    if (search) {
      const searchLower = search.toLowerCase()
      filteredPayments = filteredPayments.filter(p =>
        p.receipt_no.toLowerCase().includes(searchLower) ||
        p.student_name.toLowerCase().includes(searchLower) ||
        p.student_number.toLowerCase().includes(searchLower)
      )
    }
    if (startDate) {
      filteredPayments = filteredPayments.filter(p =>
        p.paid_at && new Date(p.paid_at) >= new Date(startDate)
      )
    }
    if (endDate) {
      filteredPayments = filteredPayments.filter(p =>
        p.paid_at && new Date(p.paid_at) <= new Date(endDate)
      )
    }

    // Calculate totals
    const totalAmount = filteredPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0)

    // Pagination
    const total = filteredPayments.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const paginatedPayments = filteredPayments.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: paginatedPayments,
      summary: {
        totalAmount,
        totalPayments: total,
        completedPayments: filteredPayments.filter(p => p.status === 'completed').length,
        pendingPayments: filteredPayments.filter(p => p.status === 'pending').length,
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
      { success: false, error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

// POST /api/finance/payments - Record a new payment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['student_id', 'fee_type', 'amount', 'payment_method']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Generate receipt number
    const receiptNo = `RCP-${new Date().getFullYear()}-${String(payments.length + 1).padStart(4, '0')}`

    const newPayment = {
      id: String(payments.length + 1),
      receipt_no: receiptNo,
      ...body,
      status: 'completed',
      paid_at: new Date().toISOString(),
    }

    payments.push(newPayment)

    return NextResponse.json({
      success: true,
      data: newPayment,
      message: 'Payment recorded successfully',
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to record payment' },
      { status: 500 }
    )
  }
}
