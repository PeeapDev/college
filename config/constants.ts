// ============================================
// APPLICATION CONSTANTS
// ============================================

export const APP_NAME = 'EduCloud'
export const APP_DESCRIPTION = 'Multi-tenant College Management SaaS Platform'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// ============================================
// SUBSCRIPTION PLANS
// ============================================

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    max_students: 50,
    max_staff: 10,
    storage_gb: 1,
    features: [
      'Basic student management',
      'Course registration',
      'Basic reporting',
      'Email support',
    ],
  },
  STARTER: {
    name: 'Starter',
    price: 99,
    max_students: 500,
    max_staff: 50,
    storage_gb: 10,
    features: [
      'Everything in Free',
      'Admissions management',
      'Finance & billing',
      'Library module',
      'Priority support',
    ],
  },
  PROFESSIONAL: {
    name: 'Professional',
    price: 299,
    max_students: 2000,
    max_staff: 200,
    storage_gb: 50,
    features: [
      'Everything in Starter',
      'Hostel management',
      'Certificate issuance',
      'Blockchain verification',
      'API access',
      'Custom branding',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: -1, // Custom pricing
    max_students: -1, // Unlimited
    max_staff: -1,
    storage_gb: -1,
    features: [
      'Everything in Professional',
      'Unlimited students & staff',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'On-premise option',
    ],
  },
}

// ============================================
// DEFAULT GRADING SCALES
// ============================================

export const GRADING_SCALES = {
  STANDARD_GPA: {
    name: 'Standard GPA (4.0)',
    grades: [
      { letter: 'A', min_score: 70, max_score: 100, grade_point: 4.0, description: 'Excellent' },
      { letter: 'B', min_score: 60, max_score: 69, grade_point: 3.0, description: 'Very Good' },
      { letter: 'C', min_score: 50, max_score: 59, grade_point: 2.0, description: 'Good' },
      { letter: 'D', min_score: 45, max_score: 49, grade_point: 1.0, description: 'Pass' },
      { letter: 'E', min_score: 40, max_score: 44, grade_point: 0.5, description: 'Weak Pass' },
      { letter: 'F', min_score: 0, max_score: 39, grade_point: 0.0, description: 'Fail' },
    ],
  },
  UK_CLASSIFICATION: {
    name: 'UK Classification',
    grades: [
      { letter: '1st', min_score: 70, max_score: 100, grade_point: 4.0, description: 'First Class Honours' },
      { letter: '2:1', min_score: 60, max_score: 69, grade_point: 3.5, description: 'Upper Second' },
      { letter: '2:2', min_score: 50, max_score: 59, grade_point: 3.0, description: 'Lower Second' },
      { letter: '3rd', min_score: 40, max_score: 49, grade_point: 2.0, description: 'Third Class' },
      { letter: 'Pass', min_score: 35, max_score: 39, grade_point: 1.0, description: 'Pass' },
      { letter: 'Fail', min_score: 0, max_score: 34, grade_point: 0.0, description: 'Fail' },
    ],
  },
  LETTER_GRADE: {
    name: 'Letter Grade (A-F)',
    grades: [
      { letter: 'A+', min_score: 90, max_score: 100, grade_point: 4.0, description: 'Outstanding' },
      { letter: 'A', min_score: 80, max_score: 89, grade_point: 4.0, description: 'Excellent' },
      { letter: 'B+', min_score: 75, max_score: 79, grade_point: 3.5, description: 'Very Good' },
      { letter: 'B', min_score: 70, max_score: 74, grade_point: 3.0, description: 'Good' },
      { letter: 'C+', min_score: 65, max_score: 69, grade_point: 2.5, description: 'Above Average' },
      { letter: 'C', min_score: 60, max_score: 64, grade_point: 2.0, description: 'Average' },
      { letter: 'D', min_score: 50, max_score: 59, grade_point: 1.0, description: 'Below Average' },
      { letter: 'F', min_score: 0, max_score: 49, grade_point: 0.0, description: 'Fail' },
    ],
  },
}

// ============================================
// CLASS OF DEGREE
// ============================================

export const CLASS_OF_DEGREE = {
  FIRST_CLASS: { min_cgpa: 3.5, label: 'First Class Honours' },
  SECOND_UPPER: { min_cgpa: 3.0, label: 'Second Class Upper' },
  SECOND_LOWER: { min_cgpa: 2.5, label: 'Second Class Lower' },
  THIRD_CLASS: { min_cgpa: 2.0, label: 'Third Class' },
  PASS: { min_cgpa: 1.5, label: 'Pass' },
}

// ============================================
// USER ROLES & PERMISSIONS
// ============================================

export const USER_ROLES = {
  SUPER_ADMIN: {
    label: 'Super Administrator',
    description: 'Platform-wide administrator with full access',
    level: 'platform',
  },
  REGISTRAR: {
    label: 'Registrar',
    description: 'Institution super admin with full institution access',
    level: 'institution',
  },
  ADMIN: {
    label: 'Administrator',
    description: 'Administrative staff with management access',
    level: 'institution',
  },
  LECTURER: {
    label: 'Lecturer',
    description: 'Teaching staff with academic access',
    level: 'institution',
  },
  ACCOUNTANT: {
    label: 'Accountant',
    description: 'Finance staff with billing access',
    level: 'institution',
  },
  LIBRARIAN: {
    label: 'Librarian',
    description: 'Library staff with library access',
    level: 'institution',
  },
  IT_OFFICER: {
    label: 'IT Officer',
    description: 'IT support staff',
    level: 'institution',
  },
  EXAMS_OFFICER: {
    label: 'Exams Officer',
    description: 'Examinations management staff',
    level: 'institution',
  },
  ADMISSIONS_OFFICER: {
    label: 'Admissions Officer',
    description: 'Admissions processing staff',
    level: 'institution',
  },
  HOSTEL_MANAGER: {
    label: 'Hostel Manager',
    description: 'Accommodation management staff',
    level: 'institution',
  },
  UNDERGRADUATE: {
    label: 'Undergraduate',
    description: 'Undergraduate student',
    level: 'student',
  },
  POSTGRADUATE: {
    label: 'Postgraduate',
    description: 'Postgraduate student',
    level: 'student',
  },
  ALUMNI: {
    label: 'Alumni',
    description: 'Graduated student',
    level: 'student',
  },
}

export const ROLE_PERMISSIONS = {
  SUPER_ADMIN: ['*'], // All permissions
  REGISTRAR: [
    'tenants:manage',
    'users:manage',
    'students:manage',
    'staff:manage',
    'academics:manage',
    'finance:manage',
    'library:manage',
    'hostel:manage',
    'certificates:manage',
    'reports:view',
    'settings:manage',
  ],
  ADMIN: [
    'users:view',
    'students:manage',
    'staff:view',
    'academics:view',
    'reports:view',
  ],
  LECTURER: [
    'courses:view',
    'courses:manage_own',
    'students:view',
    'results:manage_own',
    'attendance:manage_own',
  ],
  ACCOUNTANT: [
    'finance:manage',
    'students:view',
    'reports:finance',
  ],
  LIBRARIAN: [
    'library:manage',
    'students:view',
  ],
  EXAMS_OFFICER: [
    'examinations:manage',
    'results:manage',
    'students:view',
  ],
  ADMISSIONS_OFFICER: [
    'admissions:manage',
    'students:create',
  ],
  UNDERGRADUATE: [
    'profile:view',
    'courses:register',
    'results:view_own',
    'payments:view_own',
    'library:borrow',
  ],
  POSTGRADUATE: [
    'profile:view',
    'courses:register',
    'results:view_own',
    'payments:view_own',
    'library:borrow',
  ],
  ALUMNI: [
    'profile:view',
    'transcripts:request',
    'certificates:view_own',
  ],
}

// ============================================
// NAVIGATION MENUS
// ============================================

export const DASHBOARD_MENU = {
  admin: [
    { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Admissions', href: '/admissions', icon: 'UserPlus' },
    { label: 'Students', href: '/students', icon: 'GraduationCap' },
    { label: 'Staff', href: '/staff', icon: 'Users' },
    { label: 'Academics', href: '/academics', icon: 'BookOpen' },
    { label: 'Courses', href: '/courses', icon: 'Library' },
    { label: 'Timetable', href: '/timetable', icon: 'Calendar' },
    { label: 'Examinations', href: '/examinations', icon: 'ClipboardCheck' },
    { label: 'Results', href: '/results', icon: 'FileText' },
    { label: 'Finance', href: '/finance', icon: 'DollarSign' },
    { label: 'Library', href: '/library', icon: 'BookMarked' },
    { label: 'Hostel', href: '/hostel', icon: 'Building' },
    { label: 'Certificates', href: '/certificates', icon: 'Award' },
    { label: 'Communications', href: '/communications', icon: 'MessageSquare' },
    { label: 'Reports', href: '/reports', icon: 'BarChart3' },
    { label: 'Settings', href: '/settings', icon: 'Settings' },
  ],
  student: [
    { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'My Courses', href: '/my-courses', icon: 'BookOpen' },
    { label: 'Timetable', href: '/timetable', icon: 'Calendar' },
    { label: 'Results', href: '/my-results', icon: 'FileText' },
    { label: 'Payments', href: '/my-payments', icon: 'CreditCard' },
    { label: 'Library', href: '/library', icon: 'BookMarked' },
    { label: 'Hostel', href: '/hostel', icon: 'Building' },
    { label: 'Certificates', href: '/my-certificates', icon: 'Award' },
    { label: 'Profile', href: '/profile', icon: 'User' },
  ],
  superadmin: [
    { label: 'Dashboard', href: '/superadmin', icon: 'LayoutDashboard' },
    { label: 'Tenants', href: '/superadmin/tenants', icon: 'Building2' },
    { label: 'Subscriptions', href: '/superadmin/subscriptions', icon: 'CreditCard' },
    { label: 'Analytics', href: '/superadmin/analytics', icon: 'BarChart3' },
    { label: 'Settings', href: '/superadmin/settings', icon: 'Settings' },
  ],
}

// ============================================
// FEE TYPES
// ============================================

export const FEE_TYPES = [
  { value: 'TUITION', label: 'Tuition Fee' },
  { value: 'REGISTRATION', label: 'Registration Fee' },
  { value: 'EXAMINATION', label: 'Examination Fee' },
  { value: 'LIBRARY', label: 'Library Fee' },
  { value: 'LABORATORY', label: 'Laboratory Fee' },
  { value: 'HOSTEL', label: 'Hostel Fee' },
  { value: 'MEDICAL', label: 'Medical Fee' },
  { value: 'SPORTS', label: 'Sports Fee' },
  { value: 'OTHER', label: 'Other Fee' },
]

// ============================================
// PAYMENT METHODS
// ============================================

export const PAYMENT_METHODS = [
  { value: 'CASH', label: 'Cash' },
  { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
  { value: 'CARD', label: 'Card Payment' },
  { value: 'MOBILE_MONEY', label: 'Mobile Money' },
  { value: 'ONLINE', label: 'Online Payment' },
]

// ============================================
// CERTIFICATE TYPES
// ============================================

export const CERTIFICATE_TYPES = [
  { value: 'DEGREE', label: 'Degree Certificate' },
  { value: 'DIPLOMA', label: 'Diploma Certificate' },
  { value: 'TRANSCRIPT', label: 'Academic Transcript' },
  { value: 'ATTESTATION', label: 'Letter of Attestation' },
  { value: 'PROVISIONAL', label: 'Provisional Certificate' },
]

// ============================================
// COUNTRIES (For nationality selection)
// ============================================

export const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Angola', 'Argentina', 'Australia',
  'Bangladesh', 'Belgium', 'Benin', 'Botswana', 'Brazil', 'Burkina Faso',
  'Cameroon', 'Canada', 'Chad', 'China', 'Colombia', 'Congo', 'Côte d\'Ivoire',
  'Egypt', 'Ethiopia', 'France', 'Gambia', 'Germany', 'Ghana', 'Guinea',
  'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Italy', 'Japan',
  'Kenya', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Malaysia', 'Mali',
  'Mexico', 'Morocco', 'Mozambique', 'Namibia', 'Netherlands', 'Niger', 'Nigeria',
  'Pakistan', 'Philippines', 'Poland', 'Portugal', 'Rwanda', 'Saudi Arabia',
  'Senegal', 'Sierra Leone', 'South Africa', 'South Korea', 'Spain', 'Sudan',
  'Sweden', 'Switzerland', 'Tanzania', 'Thailand', 'Togo', 'Tunisia', 'Turkey',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States',
  'Vietnam', 'Zambia', 'Zimbabwe',
]
