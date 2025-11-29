// ============================================
// COLLEGE MANAGEMENT SAAS - TYPE DEFINITIONS
// ============================================

// ============================================
// TENANT / INSTITUTION TYPES
// ============================================

export type InstitutionType =
  | 'UNIVERSITY'
  | 'COLLEGE'
  | 'POLYTECHNIC'
  | 'VOCATIONAL'
  | 'TRAINING_INSTITUTE'

export type SubscriptionPlan = 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
export type SubscriptionStatus = 'ACTIVE' | 'TRIAL' | 'SUSPENDED' | 'CANCELLED'
export type TenantStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'INACTIVE'

export interface Tenant {
  id: string
  name: string
  slug: string // subdomain
  domain?: string // custom domain
  type: InstitutionType
  logo_url?: string
  primary_color?: string
  secondary_color?: string
  address?: string
  city?: string
  country: string
  phone?: string
  email?: string
  website?: string
  subscription_plan: SubscriptionPlan
  subscription_status: SubscriptionStatus
  status: TenantStatus
  max_students: number
  max_staff: number
  storage_limit_gb: number
  created_at: string
  updated_at: string
}

export interface TenantSettings {
  id: string
  tenant_id: string
  academic_year_start_month: number // 1-12
  grading_scale: GradingScale
  currency: string
  timezone: string
  date_format: string
  semester_system: 'SEMESTER' | 'TRIMESTER' | 'QUARTER'
  allow_online_applications: boolean
  allow_online_payments: boolean
  require_admission_approval: boolean
  created_at: string
  updated_at: string
}

export interface GradingScale {
  name: string
  grades: GradeDefinition[]
}

export interface GradeDefinition {
  letter: string
  min_score: number
  max_score: number
  grade_point: number
  description: string
}

// ============================================
// USER & ROLE TYPES
// ============================================

export type UserRole =
  // Platform Roles
  | 'SUPER_ADMIN'       // Platform-wide admin
  // Institution Roles
  | 'REGISTRAR'         // Institution super admin
  | 'ADMIN'             // Admin staff
  | 'LECTURER'          // Teaching staff
  | 'ACCOUNTANT'        // Finance staff
  | 'LIBRARIAN'         // Library staff
  | 'IT_OFFICER'        // IT support
  | 'EXAMS_OFFICER'     // Examinations
  | 'ADMISSIONS_OFFICER'// Admissions
  | 'HOSTEL_MANAGER'    // Accommodation
  // Student Roles
  | 'UNDERGRADUATE'
  | 'POSTGRADUATE'
  | 'ALUMNI'

export interface User {
  id: string
  tenant_id?: string // null for super_admin
  email: string
  phone?: string
  first_name: string
  last_name: string
  avatar_url?: string
  role: UserRole
  is_active: boolean
  email_verified: boolean
  last_login?: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  date_of_birth?: string
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  nationality?: string
  address?: string
  city?: string
  state?: string
  country?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  created_at: string
  updated_at: string
}

// ============================================
// ACADEMIC STRUCTURE TYPES
// ============================================

export interface Faculty {
  id: string
  tenant_id: string
  name: string
  code: string
  dean_id?: string
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Department {
  id: string
  tenant_id: string
  faculty_id: string
  name: string
  code: string
  head_id?: string
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Program {
  id: string
  tenant_id: string
  department_id: string
  name: string
  code: string
  degree_type: DegreeType
  duration_years: number
  total_credits: number
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type DegreeType =
  | 'CERTIFICATE'
  | 'DIPLOMA'
  | 'ASSOCIATE'
  | 'BACHELOR'
  | 'POSTGRADUATE_DIPLOMA'
  | 'MASTER'
  | 'DOCTORATE'

export interface Course {
  id: string
  tenant_id: string
  department_id: string
  code: string
  name: string
  credits: number
  description?: string
  course_type: 'CORE' | 'ELECTIVE' | 'GENERAL'
  level: number // 100, 200, 300, 400, etc.
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AcademicSession {
  id: string
  tenant_id: string
  name: string // e.g., "2024/2025"
  start_date: string
  end_date: string
  is_current: boolean
  created_at: string
  updated_at: string
}

export interface Semester {
  id: string
  tenant_id: string
  session_id: string
  name: string // e.g., "First Semester"
  start_date: string
  end_date: string
  is_current: boolean
  registration_open: boolean
  registration_deadline?: string
  created_at: string
  updated_at: string
}

// ============================================
// ADMISSION TYPES
// ============================================

export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'ADMITTED'
  | 'OFFER_SENT'
  | 'OFFER_ACCEPTED'
  | 'ENROLLED'
  | 'REJECTED'
  | 'WITHDRAWN'

export interface Application {
  id: string
  tenant_id: string
  session_id: string
  applicant_email: string
  applicant_phone: string
  first_name: string
  last_name: string
  middle_name?: string
  date_of_birth: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  nationality: string
  program_id: string
  status: ApplicationStatus
  application_number: string
  submitted_at?: string
  reviewed_by?: string
  review_notes?: string
  admission_date?: string
  created_at: string
  updated_at: string
}

export interface ApplicationDocument {
  id: string
  application_id: string
  document_type: string
  file_url: string
  file_name: string
  uploaded_at: string
}

// ============================================
// STUDENT TYPES
// ============================================

export type StudentStatus =
  | 'ACTIVE'
  | 'GRADUATED'
  | 'SUSPENDED'
  | 'WITHDRAWN'
  | 'DEFERRED'
  | 'EXPELLED'

export interface Student {
  id: string
  tenant_id: string
  user_id: string
  student_number: string
  program_id: string
  current_level: number // 100, 200, 300, etc.
  admission_session_id: string
  admission_date: string
  expected_graduation?: string
  status: StudentStatus
  cgpa?: number
  total_credits_earned: number
  created_at: string
  updated_at: string
}

export interface CourseRegistration {
  id: string
  tenant_id: string
  student_id: string
  course_id: string
  semester_id: string
  status: 'REGISTERED' | 'APPROVED' | 'DROPPED' | 'COMPLETED'
  registered_at: string
  approved_by?: string
  approved_at?: string
}

// ============================================
// EXAMINATION & RESULTS TYPES
// ============================================

export type ExamType =
  | 'CONTINUOUS_ASSESSMENT'
  | 'MID_SEMESTER'
  | 'FINAL'
  | 'PRACTICAL'
  | 'PROJECT'

export interface Examination {
  id: string
  tenant_id: string
  course_id: string
  semester_id: string
  exam_type: ExamType
  title: string
  max_score: number
  weight_percentage: number // e.g., 30 for 30%
  exam_date?: string
  venue?: string
  duration_minutes?: number
  created_at: string
  updated_at: string
}

export interface Result {
  id: string
  tenant_id: string
  student_id: string
  course_id: string
  semester_id: string
  examination_id?: string
  score: number
  grade?: string
  grade_point?: number
  remarks?: string
  entered_by: string
  approved_by?: string
  approved_at?: string
  created_at: string
  updated_at: string
}

export interface SemesterResult {
  id: string
  tenant_id: string
  student_id: string
  semester_id: string
  total_credits: number
  total_grade_points: number
  gpa: number
  cgpa: number
  status: 'PENDING' | 'PUBLISHED' | 'WITHHELD'
  published_at?: string
  created_at: string
  updated_at: string
}

// ============================================
// FINANCE TYPES
// ============================================

export type FeeType =
  | 'TUITION'
  | 'REGISTRATION'
  | 'EXAMINATION'
  | 'LIBRARY'
  | 'LABORATORY'
  | 'HOSTEL'
  | 'MEDICAL'
  | 'SPORTS'
  | 'OTHER'

export interface FeeStructure {
  id: string
  tenant_id: string
  program_id?: string // null = applies to all
  session_id: string
  fee_type: FeeType
  amount: number
  description?: string
  due_date?: string
  is_mandatory: boolean
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  tenant_id: string
  student_id: string
  invoice_number: string
  session_id: string
  semester_id?: string
  total_amount: number
  paid_amount: number
  balance: number
  status: 'PENDING' | 'PARTIAL' | 'PAID' | 'OVERDUE' | 'CANCELLED'
  due_date: string
  created_at: string
  updated_at: string
}

export interface InvoiceItem {
  id: string
  invoice_id: string
  fee_type: FeeType
  description: string
  amount: number
}

export interface Payment {
  id: string
  tenant_id: string
  invoice_id: string
  student_id: string
  amount: number
  payment_method: 'CASH' | 'BANK_TRANSFER' | 'CARD' | 'MOBILE_MONEY' | 'ONLINE'
  reference_number: string
  payment_date: string
  receipt_number: string
  processed_by?: string
  notes?: string
  created_at: string
}

// ============================================
// LIBRARY TYPES
// ============================================

export interface Book {
  id: string
  tenant_id: string
  isbn?: string
  title: string
  author: string
  publisher?: string
  publication_year?: number
  category: string
  total_copies: number
  available_copies: number
  shelf_location?: string
  cover_image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BookLoan {
  id: string
  tenant_id: string
  book_id: string
  borrower_id: string // user_id
  borrowed_date: string
  due_date: string
  returned_date?: string
  status: 'BORROWED' | 'RETURNED' | 'OVERDUE' | 'LOST'
  fine_amount?: number
  fine_paid: boolean
  created_at: string
}

// ============================================
// HOSTEL TYPES
// ============================================

export interface HostelBuilding {
  id: string
  tenant_id: string
  name: string
  gender_type: 'MALE' | 'FEMALE' | 'MIXED'
  total_rooms: number
  floors: number
  warden_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface HostelRoom {
  id: string
  tenant_id: string
  building_id: string
  room_number: string
  floor: number
  capacity: number
  occupied: number
  room_type: 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'DORMITORY'
  price_per_semester: number
  amenities?: string[]
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface HostelAllocation {
  id: string
  tenant_id: string
  room_id: string
  student_id: string
  session_id: string
  semester_id?: string
  allocated_date: string
  checkout_date?: string
  status: 'ACTIVE' | 'CHECKED_OUT' | 'CANCELLED'
  created_at: string
}

// ============================================
// STAFF TYPES
// ============================================

export interface Staff {
  id: string
  tenant_id: string
  user_id: string
  staff_number: string
  department_id?: string
  designation: string
  employment_type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'VISITING'
  join_date: string
  end_date?: string
  qualification?: string
  specialization?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CourseAssignment {
  id: string
  tenant_id: string
  staff_id: string
  course_id: string
  semester_id: string
  is_primary: boolean
  created_at: string
}

// ============================================
// TIMETABLE TYPES
// ============================================

export interface Timetable {
  id: string
  tenant_id: string
  course_id: string
  semester_id: string
  lecturer_id: string
  day_of_week: 0 | 1 | 2 | 3 | 4 | 5 | 6 // 0 = Sunday
  start_time: string // HH:mm
  end_time: string
  venue?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// ============================================
// ATTENDANCE TYPES
// ============================================

export interface Attendance {
  id: string
  tenant_id: string
  course_id: string
  student_id: string
  timetable_id?: string
  date: string
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'
  marked_by: string
  notes?: string
  created_at: string
}

// ============================================
// CERTIFICATE TYPES
// ============================================

export type CertificateStatus = 'DRAFT' | 'ISSUED' | 'REVOKED'

export interface Certificate {
  id: string
  tenant_id: string
  student_id: string
  certificate_number: string
  verification_code: string // For public verification
  certificate_type: 'DEGREE' | 'DIPLOMA' | 'TRANSCRIPT' | 'ATTESTATION' | 'PROVISIONAL'
  program_id: string
  class_of_degree?: string // e.g., "First Class Honours"
  cgpa?: number
  date_awarded: string
  date_issued: string
  status: CertificateStatus
  // Blockchain fields
  data_hash?: string
  transaction_hash?: string
  block_number?: number
  is_on_chain: boolean
  // Revocation
  revoked_at?: string
  revoked_reason?: string
  revoked_by?: string
  created_at: string
  updated_at: string
}

// ============================================
// COMMUNICATION TYPES
// ============================================

export interface Announcement {
  id: string
  tenant_id: string
  title: string
  content: string
  target_roles: UserRole[]
  target_departments?: string[]
  target_programs?: string[]
  is_published: boolean
  published_at?: string
  expires_at?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  tenant_id: string
  user_id: string
  title: string
  message: string
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR'
  is_read: boolean
  action_url?: string
  created_at: string
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}
