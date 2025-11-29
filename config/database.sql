-- ============================================
-- COLLEGE MANAGEMENT SAAS - SUPABASE SCHEMA
-- ============================================
-- Run this in Supabase SQL Editor to set up the database
-- This includes tables, RLS policies, and functions

-- ============================================
-- ENABLE EXTENSIONS
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CUSTOM TYPES (ENUMS)
-- ============================================

CREATE TYPE institution_type AS ENUM ('UNIVERSITY', 'COLLEGE', 'POLYTECHNIC', 'VOCATIONAL', 'TRAINING_INSTITUTE');
CREATE TYPE subscription_plan AS ENUM ('FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE');
CREATE TYPE subscription_status AS ENUM ('ACTIVE', 'TRIAL', 'SUSPENDED', 'CANCELLED');
CREATE TYPE tenant_status AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED', 'INACTIVE');

CREATE TYPE user_role AS ENUM (
  'SUPER_ADMIN', 'REGISTRAR', 'ADMIN', 'LECTURER', 'ACCOUNTANT',
  'LIBRARIAN', 'IT_OFFICER', 'EXAMS_OFFICER', 'ADMISSIONS_OFFICER',
  'HOSTEL_MANAGER', 'UNDERGRADUATE', 'POSTGRADUATE', 'ALUMNI'
);

CREATE TYPE gender_type AS ENUM ('MALE', 'FEMALE', 'OTHER');
CREATE TYPE application_status AS ENUM (
  'DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'SHORTLISTED',
  'ADMITTED', 'OFFER_SENT', 'OFFER_ACCEPTED', 'ENROLLED',
  'REJECTED', 'WITHDRAWN'
);
CREATE TYPE student_status AS ENUM ('ACTIVE', 'GRADUATED', 'SUSPENDED', 'WITHDRAWN', 'DEFERRED', 'EXPELLED');
CREATE TYPE degree_type AS ENUM ('CERTIFICATE', 'DIPLOMA', 'ASSOCIATE', 'BACHELOR', 'POSTGRADUATE_DIPLOMA', 'MASTER', 'DOCTORATE');
CREATE TYPE course_type AS ENUM ('CORE', 'ELECTIVE', 'GENERAL');
CREATE TYPE exam_type AS ENUM ('CONTINUOUS_ASSESSMENT', 'MID_SEMESTER', 'FINAL', 'PRACTICAL', 'PROJECT');
CREATE TYPE fee_type AS ENUM ('TUITION', 'REGISTRATION', 'EXAMINATION', 'LIBRARY', 'LABORATORY', 'HOSTEL', 'MEDICAL', 'SPORTS', 'OTHER');
CREATE TYPE payment_method AS ENUM ('CASH', 'BANK_TRANSFER', 'CARD', 'MOBILE_MONEY', 'ONLINE');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PARTIAL', 'PAID', 'OVERDUE', 'CANCELLED');
CREATE TYPE certificate_status AS ENUM ('DRAFT', 'ISSUED', 'REVOKED');
CREATE TYPE certificate_type AS ENUM ('DEGREE', 'DIPLOMA', 'TRANSCRIPT', 'ATTESTATION', 'PROVISIONAL');
CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED');
CREATE TYPE loan_status AS ENUM ('BORROWED', 'RETURNED', 'OVERDUE', 'LOST');
CREATE TYPE allocation_status AS ENUM ('ACTIVE', 'CHECKED_OUT', 'CANCELLED');

-- ============================================
-- TENANTS (Institutions)
-- ============================================

CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  domain VARCHAR(255),
  type institution_type NOT NULL DEFAULT 'COLLEGE',
  logo_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#1a56db',
  secondary_color VARCHAR(7) DEFAULT '#7c3aed',
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100) NOT NULL DEFAULT 'Sierra Leone',
  phone VARCHAR(20),
  email VARCHAR(255),
  website VARCHAR(255),
  subscription_plan subscription_plan DEFAULT 'FREE',
  subscription_status subscription_status DEFAULT 'TRIAL',
  status tenant_status DEFAULT 'PENDING',
  max_students INTEGER DEFAULT 50,
  max_staff INTEGER DEFAULT 10,
  storage_limit_gb INTEGER DEFAULT 1,
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TENANT SETTINGS
-- ============================================

CREATE TABLE tenant_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  academic_year_start_month INTEGER DEFAULT 9,
  grading_scale JSONB NOT NULL DEFAULT '{"name": "Standard GPA", "grades": []}',
  currency VARCHAR(3) DEFAULT 'USD',
  timezone VARCHAR(50) DEFAULT 'UTC',
  date_format VARCHAR(20) DEFAULT 'DD/MM/YYYY',
  semester_system VARCHAR(20) DEFAULT 'SEMESTER',
  allow_online_applications BOOLEAN DEFAULT true,
  allow_online_payments BOOLEAN DEFAULT true,
  require_admission_approval BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id)
);

-- ============================================
-- USERS
-- ============================================

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'UNDERGRADUATE',
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- USER PROFILES
-- ============================================

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE,
  gender gender_type,
  nationality VARCHAR(100),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  emergency_contact_name VARCHAR(200),
  emergency_contact_phone VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================
-- FACULTIES
-- ============================================

CREATE TABLE faculties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(20) NOT NULL,
  dean_id UUID REFERENCES users(id),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, code)
);

CREATE INDEX idx_faculties_tenant ON faculties(tenant_id);

-- ============================================
-- DEPARTMENTS
-- ============================================

CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  faculty_id UUID NOT NULL REFERENCES faculties(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(20) NOT NULL,
  head_id UUID REFERENCES users(id),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, code)
);

CREATE INDEX idx_departments_tenant ON departments(tenant_id);
CREATE INDEX idx_departments_faculty ON departments(faculty_id);

-- ============================================
-- PROGRAMS
-- ============================================

CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(20) NOT NULL,
  degree_type degree_type NOT NULL,
  duration_years INTEGER NOT NULL DEFAULT 4,
  total_credits INTEGER NOT NULL DEFAULT 120,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, code)
);

CREATE INDEX idx_programs_tenant ON programs(tenant_id);
CREATE INDEX idx_programs_department ON programs(department_id);

-- ============================================
-- COURSES
-- ============================================

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  code VARCHAR(20) NOT NULL,
  name VARCHAR(255) NOT NULL,
  credits INTEGER NOT NULL DEFAULT 3,
  description TEXT,
  course_type course_type DEFAULT 'CORE',
  level INTEGER DEFAULT 100,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, code)
);

CREATE INDEX idx_courses_tenant ON courses(tenant_id);
CREATE INDEX idx_courses_department ON courses(department_id);

-- ============================================
-- ACADEMIC SESSIONS
-- ============================================

CREATE TABLE academic_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id, name)
);

CREATE INDEX idx_sessions_tenant ON academic_sessions(tenant_id);

-- ============================================
-- SEMESTERS
-- ============================================

CREATE TABLE semesters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN DEFAULT false,
  registration_open BOOLEAN DEFAULT false,
  registration_deadline DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_semesters_tenant ON semesters(tenant_id);
CREATE INDEX idx_semesters_session ON semesters(session_id);

-- ============================================
-- APPLICATIONS (Admissions)
-- ============================================

CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  session_id UUID REFERENCES academic_sessions(id),
  application_number VARCHAR(50) UNIQUE NOT NULL,
  applicant_email VARCHAR(255) NOT NULL,
  applicant_phone VARCHAR(20),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100),
  date_of_birth DATE NOT NULL,
  gender gender_type NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  program_id UUID REFERENCES programs(id),
  status application_status DEFAULT 'DRAFT',
  submitted_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id),
  review_notes TEXT,
  admission_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_applications_tenant ON applications(tenant_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_email ON applications(applicant_email);

-- ============================================
-- APPLICATION DOCUMENTS
-- ============================================

CREATE TABLE application_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  document_type VARCHAR(100) NOT NULL,
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_app_docs_application ON application_documents(application_id);

-- ============================================
-- STUDENTS
-- ============================================

CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_number VARCHAR(50) UNIQUE NOT NULL,
  program_id UUID NOT NULL REFERENCES programs(id),
  current_level INTEGER DEFAULT 100,
  admission_session_id UUID REFERENCES academic_sessions(id),
  admission_date DATE NOT NULL,
  expected_graduation DATE,
  status student_status DEFAULT 'ACTIVE',
  cgpa DECIMAL(3,2) DEFAULT 0.00,
  total_credits_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX idx_students_tenant ON students(tenant_id);
CREATE INDEX idx_students_program ON students(program_id);
CREATE INDEX idx_students_status ON students(status);

-- ============================================
-- STAFF
-- ============================================

CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  staff_number VARCHAR(50) UNIQUE NOT NULL,
  department_id UUID REFERENCES departments(id),
  designation VARCHAR(100) NOT NULL,
  employment_type VARCHAR(20) DEFAULT 'FULL_TIME',
  join_date DATE NOT NULL,
  end_date DATE,
  qualification TEXT,
  specialization TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX idx_staff_tenant ON staff(tenant_id);
CREATE INDEX idx_staff_department ON staff(department_id);

-- ============================================
-- COURSE REGISTRATIONS
-- ============================================

CREATE TABLE course_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id),
  semester_id UUID NOT NULL REFERENCES semesters(id),
  status VARCHAR(20) DEFAULT 'REGISTERED',
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  UNIQUE(student_id, course_id, semester_id)
);

CREATE INDEX idx_registrations_student ON course_registrations(student_id);
CREATE INDEX idx_registrations_course ON course_registrations(course_id);
CREATE INDEX idx_registrations_semester ON course_registrations(semester_id);

-- ============================================
-- COURSE ASSIGNMENTS (Lecturer to Course)
-- ============================================

CREATE TABLE course_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id),
  semester_id UUID NOT NULL REFERENCES semesters(id),
  is_primary BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(staff_id, course_id, semester_id)
);

CREATE INDEX idx_assignments_staff ON course_assignments(staff_id);
CREATE INDEX idx_assignments_course ON course_assignments(course_id);

-- ============================================
-- EXAMINATIONS
-- ============================================

CREATE TABLE examinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id),
  semester_id UUID NOT NULL REFERENCES semesters(id),
  exam_type exam_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  max_score DECIMAL(5,2) NOT NULL DEFAULT 100,
  weight_percentage DECIMAL(5,2) NOT NULL DEFAULT 30,
  exam_date DATE,
  venue VARCHAR(255),
  duration_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_exams_course ON examinations(course_id);
CREATE INDEX idx_exams_semester ON examinations(semester_id);

-- ============================================
-- RESULTS
-- ============================================

CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id),
  semester_id UUID NOT NULL REFERENCES semesters(id),
  examination_id UUID REFERENCES examinations(id),
  score DECIMAL(5,2) NOT NULL,
  grade VARCHAR(5),
  grade_point DECIMAL(3,2),
  remarks TEXT,
  entered_by UUID NOT NULL REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_results_student ON results(student_id);
CREATE INDEX idx_results_course ON results(course_id);
CREATE INDEX idx_results_semester ON results(semester_id);

-- ============================================
-- SEMESTER RESULTS (GPA Summary)
-- ============================================

CREATE TABLE semester_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  semester_id UUID NOT NULL REFERENCES semesters(id),
  total_credits INTEGER DEFAULT 0,
  total_grade_points DECIMAL(6,2) DEFAULT 0.00,
  gpa DECIMAL(3,2) DEFAULT 0.00,
  cgpa DECIMAL(3,2) DEFAULT 0.00,
  status VARCHAR(20) DEFAULT 'PENDING',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, semester_id)
);

CREATE INDEX idx_sem_results_student ON semester_results(student_id);
CREATE INDEX idx_sem_results_semester ON semester_results(semester_id);

-- ============================================
-- FEE STRUCTURES
-- ============================================

CREATE TABLE fee_structures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  program_id UUID REFERENCES programs(id),
  session_id UUID NOT NULL REFERENCES academic_sessions(id),
  fee_type fee_type NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  description TEXT,
  due_date DATE,
  is_mandatory BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_fees_tenant ON fee_structures(tenant_id);
CREATE INDEX idx_fees_session ON fee_structures(session_id);

-- ============================================
-- INVOICES
-- ============================================

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  session_id UUID NOT NULL REFERENCES academic_sessions(id),
  semester_id UUID REFERENCES semesters(id),
  total_amount DECIMAL(12,2) NOT NULL,
  paid_amount DECIMAL(12,2) DEFAULT 0.00,
  balance DECIMAL(12,2) NOT NULL,
  status payment_status DEFAULT 'PENDING',
  due_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invoices_student ON invoices(student_id);
CREATE INDEX idx_invoices_status ON invoices(status);

-- ============================================
-- INVOICE ITEMS
-- ============================================

CREATE TABLE invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  fee_type fee_type NOT NULL,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(12,2) NOT NULL
);

CREATE INDEX idx_items_invoice ON invoice_items(invoice_id);

-- ============================================
-- PAYMENTS
-- ============================================

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  invoice_id UUID NOT NULL REFERENCES invoices(id),
  student_id UUID NOT NULL REFERENCES students(id),
  amount DECIMAL(12,2) NOT NULL,
  payment_method payment_method NOT NULL,
  reference_number VARCHAR(100) UNIQUE NOT NULL,
  payment_date DATE NOT NULL,
  receipt_number VARCHAR(50) UNIQUE NOT NULL,
  processed_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_invoice ON payments(invoice_id);

-- ============================================
-- BOOKS (Library)
-- ============================================

CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  isbn VARCHAR(20),
  title VARCHAR(500) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publisher VARCHAR(255),
  publication_year INTEGER,
  category VARCHAR(100),
  total_copies INTEGER DEFAULT 1,
  available_copies INTEGER DEFAULT 1,
  shelf_location VARCHAR(50),
  cover_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_books_tenant ON books(tenant_id);
CREATE INDEX idx_books_isbn ON books(isbn);

-- ============================================
-- BOOK LOANS
-- ============================================

CREATE TABLE book_loans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  book_id UUID NOT NULL REFERENCES books(id),
  borrower_id UUID NOT NULL REFERENCES users(id),
  borrowed_date DATE NOT NULL,
  due_date DATE NOT NULL,
  returned_date DATE,
  status loan_status DEFAULT 'BORROWED',
  fine_amount DECIMAL(8,2) DEFAULT 0.00,
  fine_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_loans_book ON book_loans(book_id);
CREATE INDEX idx_loans_borrower ON book_loans(borrower_id);
CREATE INDEX idx_loans_status ON book_loans(status);

-- ============================================
-- HOSTEL BUILDINGS
-- ============================================

CREATE TABLE hostel_buildings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  gender_type VARCHAR(10) DEFAULT 'MIXED',
  total_rooms INTEGER DEFAULT 0,
  floors INTEGER DEFAULT 1,
  warden_id UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hostels_tenant ON hostel_buildings(tenant_id);

-- ============================================
-- HOSTEL ROOMS
-- ============================================

CREATE TABLE hostel_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  building_id UUID NOT NULL REFERENCES hostel_buildings(id) ON DELETE CASCADE,
  room_number VARCHAR(20) NOT NULL,
  floor INTEGER DEFAULT 1,
  capacity INTEGER DEFAULT 2,
  occupied INTEGER DEFAULT 0,
  room_type VARCHAR(20) DEFAULT 'DOUBLE',
  price_per_semester DECIMAL(10,2) NOT NULL,
  amenities JSONB,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(building_id, room_number)
);

CREATE INDEX idx_rooms_building ON hostel_rooms(building_id);

-- ============================================
-- HOSTEL ALLOCATIONS
-- ============================================

CREATE TABLE hostel_allocations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES hostel_rooms(id),
  student_id UUID NOT NULL REFERENCES students(id),
  session_id UUID NOT NULL REFERENCES academic_sessions(id),
  semester_id UUID REFERENCES semesters(id),
  allocated_date DATE NOT NULL,
  checkout_date DATE,
  status allocation_status DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_allocations_room ON hostel_allocations(room_id);
CREATE INDEX idx_allocations_student ON hostel_allocations(student_id);

-- ============================================
-- TIMETABLE
-- ============================================

CREATE TABLE timetables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id),
  semester_id UUID NOT NULL REFERENCES semesters(id),
  lecturer_id UUID NOT NULL REFERENCES staff(id),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  venue VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_timetable_course ON timetables(course_id);
CREATE INDEX idx_timetable_semester ON timetables(semester_id);
CREATE INDEX idx_timetable_lecturer ON timetables(lecturer_id);

-- ============================================
-- ATTENDANCE
-- ============================================

CREATE TABLE attendances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id),
  student_id UUID NOT NULL REFERENCES students(id),
  timetable_id UUID REFERENCES timetables(id),
  date DATE NOT NULL,
  status attendance_status DEFAULT 'PRESENT',
  marked_by UUID NOT NULL REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, course_id, date)
);

CREATE INDEX idx_attendance_student ON attendances(student_id);
CREATE INDEX idx_attendance_course ON attendances(course_id);
CREATE INDEX idx_attendance_date ON attendances(date);

-- ============================================
-- CERTIFICATES
-- ============================================

CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id),
  certificate_number VARCHAR(50) UNIQUE NOT NULL,
  verification_code VARCHAR(20) UNIQUE NOT NULL,
  certificate_type certificate_type NOT NULL,
  program_id UUID NOT NULL REFERENCES programs(id),
  class_of_degree VARCHAR(100),
  cgpa DECIMAL(3,2),
  date_awarded DATE NOT NULL,
  date_issued DATE DEFAULT CURRENT_DATE,
  status certificate_status DEFAULT 'DRAFT',
  -- Blockchain fields
  data_hash VARCHAR(100),
  transaction_hash VARCHAR(100) UNIQUE,
  block_number INTEGER,
  is_on_chain BOOLEAN DEFAULT false,
  -- Revocation
  revoked_at TIMESTAMPTZ,
  revoked_reason TEXT,
  revoked_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_certificates_student ON certificates(student_id);
CREATE INDEX idx_certificates_status ON certificates(status);
CREATE INDEX idx_certificates_verification ON certificates(verification_code);

-- ============================================
-- ANNOUNCEMENTS
-- ============================================

CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  target_roles user_role[],
  target_departments UUID[],
  target_programs UUID[],
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_announcements_tenant ON announcements(tenant_id);
CREATE INDEX idx_announcements_published ON announcements(is_published);

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'INFO',
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE hostel_buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hostel_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE hostel_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's tenant_id
CREATE OR REPLACE FUNCTION get_user_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role = 'SUPER_ADMIN'
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Tenant isolation policy for most tables
CREATE POLICY tenant_isolation ON users
  FOR ALL USING (
    tenant_id = get_user_tenant_id()
    OR is_super_admin()
    OR id = auth.uid()
  );

CREATE POLICY tenant_isolation ON students
  FOR ALL USING (
    tenant_id = get_user_tenant_id()
    OR is_super_admin()
  );

CREATE POLICY tenant_isolation ON staff
  FOR ALL USING (
    tenant_id = get_user_tenant_id()
    OR is_super_admin()
  );

CREATE POLICY tenant_isolation ON courses
  FOR ALL USING (
    tenant_id = get_user_tenant_id()
    OR is_super_admin()
  );

CREATE POLICY tenant_isolation ON results
  FOR ALL USING (
    tenant_id = get_user_tenant_id()
    OR is_super_admin()
  );

CREATE POLICY tenant_isolation ON certificates
  FOR ALL USING (
    tenant_id = get_user_tenant_id()
    OR is_super_admin()
  );

-- Public read access for certificate verification
CREATE POLICY public_certificate_verify ON certificates
  FOR SELECT USING (
    status = 'ISSUED'
    AND is_on_chain = true
  );

-- Super admin full access to tenants
CREATE POLICY superadmin_tenants ON tenants
  FOR ALL USING (is_super_admin());

-- Tenant can read their own tenant info
CREATE POLICY tenant_read_own ON tenants
  FOR SELECT USING (id = get_user_tenant_id());

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update_at trigger to relevant tables
CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to generate student number
CREATE OR REPLACE FUNCTION generate_student_number(tenant_slug VARCHAR, year INTEGER)
RETURNS VARCHAR AS $$
DECLARE
  sequence_num INTEGER;
  student_num VARCHAR;
BEGIN
  -- Get the next sequence number for this tenant and year
  SELECT COUNT(*) + 1 INTO sequence_num
  FROM students s
  JOIN tenants t ON s.tenant_id = t.id
  WHERE t.slug = tenant_slug
  AND EXTRACT(YEAR FROM s.created_at) = year;

  -- Format: SLUG/YEAR/SEQUENCE (e.g., FBC/24/00001)
  student_num := UPPER(LEFT(tenant_slug, 3)) || '/' ||
                 RIGHT(year::VARCHAR, 2) || '/' ||
                 LPAD(sequence_num::VARCHAR, 5, '0');

  RETURN student_num;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate GPA
CREATE OR REPLACE FUNCTION calculate_gpa(p_student_id UUID, p_semester_id UUID)
RETURNS DECIMAL AS $$
DECLARE
  total_points DECIMAL := 0;
  total_credits INTEGER := 0;
  result_record RECORD;
BEGIN
  FOR result_record IN
    SELECT r.grade_point, c.credits
    FROM results r
    JOIN courses c ON r.course_id = c.id
    WHERE r.student_id = p_student_id
    AND r.semester_id = p_semester_id
    AND r.approved_at IS NOT NULL
  LOOP
    total_points := total_points + (result_record.grade_point * result_record.credits);
    total_credits := total_credits + result_record.credits;
  END LOOP;

  IF total_credits = 0 THEN
    RETURN 0;
  END IF;

  RETURN ROUND(total_points / total_credits, 2);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- INITIAL SEED DATA
-- ============================================

-- This would be run after the schema is created
-- Insert default super admin (you'll need to create auth user first)

-- IMPORTANT: After creating schema, you need to:
-- 1. Create a user in Supabase Auth
-- 2. Insert corresponding record in users table with role = 'SUPER_ADMIN'
-- 3. Set tenant_id to NULL for super admin
