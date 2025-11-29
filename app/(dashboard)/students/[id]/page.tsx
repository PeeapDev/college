'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  BookOpen,
  DollarSign,
  FileText,
  Award,
  Clock,
  User,
  Building,
  CreditCard,
  MoreHorizontal,
  Download,
  Printer,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock student data
const studentData = {
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
  cgpa: '3.45',
  guardian_name: 'Mohamed Kamara',
  guardian_phone: '+232 76 000000',
  guardian_relationship: 'Father',
  avatar: null,
}

const academicRecords = [
  { semester: 'First Semester 2023/2024', courses: 6, credits: 18, gpa: '3.50' },
  { semester: 'Second Semester 2022/2023', courses: 6, credits: 18, gpa: '3.40' },
  { semester: 'First Semester 2022/2023', courses: 5, credits: 15, gpa: '3.45' },
]

const enrolledCourses = [
  { code: 'CSC 301', title: 'Data Structures', credits: 3, lecturer: 'Dr. Sarah Johnson', status: 'ongoing' },
  { code: 'CSC 303', title: 'Database Systems', credits: 3, lecturer: 'Prof. James Cole', status: 'ongoing' },
  { code: 'CSC 305', title: 'Software Engineering', credits: 3, lecturer: 'Dr. Mary Brown', status: 'ongoing' },
  { code: 'MTH 301', title: 'Numerical Methods', credits: 3, lecturer: 'Dr. Peter Smith', status: 'ongoing' },
  { code: 'CSC 307', title: 'Computer Networks', credits: 3, lecturer: 'Dr. Sarah Johnson', status: 'ongoing' },
  { code: 'GEN 301', title: 'Entrepreneurship', credits: 3, lecturer: 'Mr. David Lee', status: 'ongoing' },
]

const payments = [
  { id: '1', description: 'Tuition Fee - First Semester', amount: 2500, status: 'paid', date: '2024-09-15' },
  { id: '2', description: 'Registration Fee', amount: 100, status: 'paid', date: '2024-09-10' },
  { id: '3', description: 'Library Fee', amount: 50, status: 'paid', date: '2024-09-10' },
  { id: '4', description: 'Tuition Fee - Second Semester', amount: 2500, status: 'pending', date: null },
]

export default function StudentProfilePage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      active: { variant: 'default', label: 'Active' },
      suspended: { variant: 'destructive', label: 'Suspended' },
      graduated: { variant: 'secondary', label: 'Graduated' },
      ongoing: { variant: 'outline', label: 'Ongoing' },
      paid: { variant: 'default', label: 'Paid' },
      pending: { variant: 'destructive', label: 'Pending' },
    }
    const config = variants[status] || { variant: 'outline', label: status }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/students">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Profile</h1>
            <p className="text-gray-500 dark:text-gray-400">
              View and manage student information
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href={`/students/${params.id}/edit`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={studentData.avatar || undefined} />
                  <AvatarFallback className="text-2xl">
                    {studentData.first_name[0]}{studentData.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">
                  {studentData.first_name} {studentData.middle_name} {studentData.last_name}
                </h2>
                <p className="text-sm text-gray-500 font-mono">{studentData.student_id}</p>
                <div className="mt-2">{getStatusBadge(studentData.status)}</div>

                <div className="mt-6 w-full space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{studentData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{studentData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{studentData.city}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t dark:border-gray-700 w-full">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">{studentData.cgpa}</p>
                      <p className="text-xs text-gray-500">CGPA</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{studentData.level}</p>
                      <p className="text-xs text-gray-500">Level</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Academic Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{studentData.program}</p>
                  <p className="text-xs text-gray-500">{studentData.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{studentData.faculty}</p>
                  <p className="text-xs text-gray-500">Faculty</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">{studentData.entry_year} - {studentData.expected_graduation}</p>
                  <p className="text-xs text-gray-500">Academic Period</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              {/* Personal Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{studentData.first_name} {studentData.middle_name} {studentData.last_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p className="font-medium">{studentData.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="font-medium">{new Date(studentData.date_of_birth).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Nationality</p>
                        <p className="font-medium">{studentData.nationality}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{studentData.address}, {studentData.city}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Guardian Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Guardian / Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{studentData.guardian_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{studentData.guardian_phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Relationship</p>
                        <p className="font-medium">{studentData.guardian_relationship}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Academic Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Academic History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {academicRecords.map((record, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                          <div>
                            <p className="font-medium">{record.semester}</p>
                            <p className="text-sm text-gray-500">
                              {record.courses} courses • {record.credits} credits
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">{record.gpa}</p>
                            <p className="text-xs text-gray-500">GPA</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="courses" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enrolled Courses</CardTitle>
                  <CardDescription>Current semester course registration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.map((course, index) => (
                      <motion.div
                        key={course.code}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-700"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{course.code}: {course.title}</p>
                            <p className="text-sm text-gray-500">{course.lecturer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{course.credits} Credits</p>
                          {getStatusBadge(course.status)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Results</CardTitle>
                  <CardDescription>View semester-by-semester performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Results will be displayed here</p>
                    <Button variant="outline" className="mt-4">
                      View Full Transcript
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="finance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Track tuition and fee payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payments.map((payment, index) => (
                      <motion.div
                        key={payment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-700"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            payment.status === 'paid' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                          }`}>
                            <DollarSign className={`h-5 w-5 ${
                              payment.status === 'paid' ? 'text-green-600' : 'text-red-600'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium">{payment.description}</p>
                            <p className="text-sm text-gray-500">
                              {payment.date ? new Date(payment.date).toLocaleDateString() : 'Not paid'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${payment.amount.toLocaleString()}</p>
                          {getStatusBadge(payment.status)}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total Outstanding</p>
                        <p className="text-2xl font-bold text-red-600">$2,500</p>
                      </div>
                      <Button>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Make Payment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
