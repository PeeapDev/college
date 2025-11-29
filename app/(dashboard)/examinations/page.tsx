'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ClipboardCheck,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  FileText,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data for exams
const examSchedule = [
  {
    id: '1',
    course_code: 'CSC 301',
    course_title: 'Data Structures and Algorithms',
    exam_type: 'Final',
    date: '2024-12-15',
    time: '09:00 AM',
    duration: '3 hours',
    venue: 'Hall A',
    students: 45,
    status: 'scheduled',
  },
  {
    id: '2',
    course_code: 'CSC 303',
    course_title: 'Database Management Systems',
    exam_type: 'Final',
    date: '2024-12-16',
    time: '02:00 PM',
    duration: '3 hours',
    venue: 'Hall B',
    students: 42,
    status: 'scheduled',
  },
  {
    id: '3',
    course_code: 'BUS 201',
    course_title: 'Principles of Management',
    exam_type: 'Mid-Semester',
    date: '2024-12-10',
    time: '09:00 AM',
    duration: '2 hours',
    venue: 'Hall C',
    students: 78,
    status: 'completed',
  },
  {
    id: '4',
    course_code: 'MTH 101',
    course_title: 'Calculus I',
    exam_type: 'Final',
    date: '2024-12-17',
    time: '09:00 AM',
    duration: '3 hours',
    venue: 'Main Hall',
    students: 120,
    status: 'scheduled',
  },
  {
    id: '5',
    course_code: 'ENG 101',
    course_title: 'Communication Skills',
    exam_type: 'Final',
    date: '2024-12-18',
    time: '02:00 PM',
    duration: '2 hours',
    venue: 'Hall A',
    students: 200,
    status: 'scheduled',
  },
]

const upcomingExams = examSchedule.filter(e => e.status === 'scheduled').slice(0, 3)

const stats = [
  { label: 'Total Exams', value: '156', icon: ClipboardCheck, color: 'bg-blue-500' },
  { label: 'Scheduled', value: '124', icon: Calendar, color: 'bg-purple-500' },
  { label: 'Completed', value: '28', icon: CheckCircle, color: 'bg-green-500' },
  { label: 'Pending Results', value: '4', icon: AlertCircle, color: 'bg-amber-500' },
]

export default function ExaminationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('schedule')

  const filteredExams = examSchedule.filter((exam) => {
    const matchesSearch =
      exam.course_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.course_title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === 'all' || exam.exam_type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesType
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string; className?: string }> = {
      scheduled: { variant: 'secondary', label: 'Scheduled' },
      in_progress: { variant: 'default', label: 'In Progress', className: 'bg-blue-500' },
      completed: { variant: 'default', label: 'Completed', className: 'bg-green-500' },
      cancelled: { variant: 'destructive', label: 'Cancelled' },
    }
    const config = variants[status] || { variant: 'outline', label: status }
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>
  }

  const getExamTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      'Final': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      'Mid-Semester': 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
      'Quiz': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Practical': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[type] || 'bg-gray-100 text-gray-700'}`}>
        {type}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Examinations</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage exam schedules, venues, and grading
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Schedule
          </Button>
          <Link href="/examinations/schedule">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Exam
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
              <TabsTrigger value="timetable">Timetable</TabsTrigger>
              <TabsTrigger value="results">Exam Results</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="mt-6">
              {/* Search and Filter */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="search"
                        placeholder="Search by course code or title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Exam Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="final">Final</SelectItem>
                        <SelectItem value="mid-semester">Mid-Semester</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="practical">Practical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Exam Schedule Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Examination Schedule</CardTitle>
                  <CardDescription>First Semester 2024/2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Course</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Date & Time</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Venue</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Students</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredExams.map((exam) => (
                          <tr
                            key={exam.id}
                            className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium">{exam.course_code}</p>
                                <p className="text-sm text-gray-500">{exam.course_title}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">{getExamTypeBadge(exam.exam_type)}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <div>
                                  <p>{new Date(exam.date).toLocaleDateString()}</p>
                                  <p className="text-gray-500">{exam.time} ({exam.duration})</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                {exam.venue}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4 text-gray-400" />
                                {exam.students}
                              </div>
                            </td>
                            <td className="py-3 px-4">{getStatusBadge(exam.status)}</td>
                            <td className="py-3 px-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Schedule
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Users className="h-4 w-4 mr-2" />
                                    View Students
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Generate Attendance
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t dark:border-gray-700">
                    <p className="text-sm text-gray-500">Showing {filteredExams.length} exams</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timetable" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Examination Timetable</CardTitle>
                  <CardDescription>Visual timetable view</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Timetable view coming soon</p>
                    <Button variant="outline" className="mt-4">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF Timetable
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exam Results Entry</CardTitle>
                  <CardDescription>Enter and manage examination results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Results entry coming soon</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link href="/results">
                        Go to Results Management
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                Upcoming Exams
              </CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingExams.map((exam, index) => (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{exam.course_code}</span>
                      {getExamTypeBadge(exam.exam_type)}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{exam.course_title}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(exam.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {exam.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Plus className="h-5 w-5" />
                <span className="text-xs">Schedule Exam</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-xs">View Calendar</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-xs">Attendance</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Download className="h-5 w-5" />
                <span className="text-xs">Export</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
