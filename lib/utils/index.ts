import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return new Date(date).toLocaleDateString('en-US', options || defaultOptions)
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function generateStudentNumber(prefix: string = 'STU'): string {
  const year = new Date().getFullYear().toString().slice(-2)
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0')
  return `${prefix}${year}${random}`
}

export function generateVerificationCode(length: number = 12): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Removed confusing chars like 0, O, 1, I
  let code = ''
  for (let i = 0; i < length; i++) {
    if (i > 0 && i % 4 === 0) code += '-'
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export function generateCertificateNumber(
  tenantCode: string,
  year: number,
  sequence: number
): string {
  return `${tenantCode}-${year}-${sequence.toString().padStart(6, '0')}`
}

export function calculateGPA(results: { credits: number; gradePoint: number }[]): number {
  if (results.length === 0) return 0

  const totalPoints = results.reduce((sum, r) => sum + (r.credits * r.gradePoint), 0)
  const totalCredits = results.reduce((sum, r) => sum + r.credits, 0)

  if (totalCredits === 0) return 0
  return Math.round((totalPoints / totalCredits) * 100) / 100
}

export function getGradeFromScore(score: number, gradingScale: { letter: string; min_score: number; max_score: number }[]): string {
  const grade = gradingScale.find(g => score >= g.min_score && score <= g.max_score)
  return grade?.letter || 'F'
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function getAcademicYear(startMonth: number = 9): string {
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  if (currentMonth >= startMonth) {
    return `${currentYear}/${currentYear + 1}`
  }
  return `${currentYear - 1}/${currentYear}`
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-]{10,}$/
  return phoneRegex.test(phone)
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    // General
    ACTIVE: 'bg-green-100 text-green-800',
    INACTIVE: 'bg-gray-100 text-gray-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    SUSPENDED: 'bg-red-100 text-red-800',

    // Application
    DRAFT: 'bg-gray-100 text-gray-800',
    SUBMITTED: 'bg-blue-100 text-blue-800',
    UNDER_REVIEW: 'bg-purple-100 text-purple-800',
    SHORTLISTED: 'bg-indigo-100 text-indigo-800',
    ADMITTED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',

    // Payment
    PAID: 'bg-green-100 text-green-800',
    PARTIAL: 'bg-yellow-100 text-yellow-800',
    OVERDUE: 'bg-red-100 text-red-800',

    // Certificate
    ISSUED: 'bg-green-100 text-green-800',
    REVOKED: 'bg-red-100 text-red-800',
  }

  return colors[status] || 'bg-gray-100 text-gray-800'
}

export function getRoleBadgeColor(role: string): string {
  const colors: Record<string, string> = {
    SUPER_ADMIN: 'bg-red-100 text-red-800',
    REGISTRAR: 'bg-purple-100 text-purple-800',
    ADMIN: 'bg-blue-100 text-blue-800',
    LECTURER: 'bg-green-100 text-green-800',
    ACCOUNTANT: 'bg-yellow-100 text-yellow-800',
    LIBRARIAN: 'bg-indigo-100 text-indigo-800',
    UNDERGRADUATE: 'bg-cyan-100 text-cyan-800',
    POSTGRADUATE: 'bg-teal-100 text-teal-800',
    ALUMNI: 'bg-gray-100 text-gray-800',
  }

  return colors[role] || 'bg-gray-100 text-gray-800'
}
