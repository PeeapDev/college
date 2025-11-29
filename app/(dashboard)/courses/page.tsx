'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Calendar,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

// Mock data for courses
const courses = [
  {
    id: '1',
    code: 'CSC 301',
    title: 'Data Structures and Algorithms',
    department: 'Computer Science',
    credits: 3,
    level: '300',
    semester: 'First',
    lecturer: 'Dr. Sarah Johnson',
    enrolled: 45,
    capacity: 50,
    status: 'active',
  },
  {
    id: '2',
    code: 'CSC 303',
    title: 'Database Management Systems',
    department: 'Computer Science',
    credits: 3,
    level: '300',
    semester: 'First',
    lecturer: 'Prof. James Cole',
    enrolled: 42,
    capacity: 50,
    status: 'active',
  },
  {
    id: '3',
    code: 'BUS 201',
    title: 'Principles of Management',
    department: 'Business Administration',
    credits: 3,
    level: '200',
    semester: 'First',
    lecturer: 'Dr. Mary Williams',
    enrolled: 78,
    capacity: 80,
    status: 'active',
  },
  {
    id: '4',
    code: 'MTH 101',
    title: 'Calculus I',
    department: 'Mathematics',
    credits: 4,
    level: '100',
    semester: 'First',
    lecturer: 'Dr. Peter Brown',
    enrolled: 120,
    capacity: 120,
    status: 'full',
  },
  {
    id: '5',
    code: 'ENG 101',
    title: 'Communication Skills',
    department: 'General Studies',
    credits: 2,
    level: '100',
    semester: 'First',
    lecturer: 'Mr. David Lee',
    enrolled: 200,
    capacity: 250,
    status: 'active',
  },
  {
    id: '6',
    code: 'NUR 401',
    title: 'Advanced Clinical Practice',
    department: 'Nursing',
    credits: 6,
    level: '400',
    semester: 'First',
    lecturer: 'Dr. Alice Davis',
    enrolled: 25,
    capacity: 30,
    status: 'active',
  },
]

const stats = [
  { label: 'Total Courses', value: '156', icon: BookOpen, color: 'bg-blue-500' },
  { label: 'Active This Semester', value: '124', icon: Calendar, color: 'bg-green-500' },
  { label: 'Total Enrollments', value: '8,542', icon: Users, color: 'bg-purple-500' },
  { label: 'Avg. Class Size', value: '48', icon: GraduationCap, color: 'bg-amber-500' },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.lecturer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter === 'all' || course.department === departmentFilter
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter

    return matchesSearch && matchesDepartment && matchesLevel
  })

  const getStatusBadge = (status: string, enrolled: number, capacity: number) => {
    if (status === 'full' || enrolled >= capacity) {
      return <Badge variant="destructive">Full</Badge>
    }
    if (enrolled >= capacity * 0.9) {
      return <Badge variant="secondary">Almost Full</Badge>
    }
    return <Badge variant="default">Open</Badge>
  }

  const getCapacityColor = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100
    if (percentage >= 100) return 'bg-red-500'
    if (percentage >= 80) return 'bg-amber-500'
    return 'bg-green-500'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Courses</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage courses, enrollments, and class schedules
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/courses/add">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
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

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search by course code, title, or lecturer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Business Administration">Business Admin</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="General Studies">General Studies</SelectItem>
                  <SelectItem value="Nursing">Nursing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="100">100 Level</SelectItem>
                  <SelectItem value="200">200 Level</SelectItem>
                  <SelectItem value="300">300 Level</SelectItem>
                  <SelectItem value="400">400 Level</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{course.code}</CardTitle>
                    <CardDescription className="mt-1">{course.title}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/courses/${course.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/courses/${course.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Course
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" />
                        View Enrollments
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <GraduationCap className="h-4 w-4" />
                  <span>{course.department}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {course.credits} Credits
                    </span>
                    <Badge variant="outline">{course.level} Level</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {course.lecturer.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{course.lecturer}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Enrollment</span>
                    <span className="font-medium">{course.enrolled}/{course.capacity}</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getCapacityColor(course.enrolled, course.capacity)} transition-all`}
                      style={{ width: `${Math.min((course.enrolled / course.capacity) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t dark:border-gray-700">
                  {getStatusBadge(course.status, course.enrolled, course.capacity)}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/courses/${course.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredCourses.length} of {courses.length} courses
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
