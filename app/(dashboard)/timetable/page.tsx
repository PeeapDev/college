'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Printer,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
]

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

// Mock timetable data
const timetableData: Record<string, Record<string, { course: string; lecturer: string; venue: string; type: string } | null>> = {
  'Monday': {
    '08:00': { course: 'CSC 301', lecturer: 'Dr. Sarah Johnson', venue: 'Hall A', type: 'lecture' },
    '10:00': { course: 'MTH 101', lecturer: 'Dr. Peter Brown', venue: 'Hall B', type: 'lecture' },
    '14:00': { course: 'CSC 303', lecturer: 'Prof. James Cole', venue: 'Lab 1', type: 'practical' },
  },
  'Tuesday': {
    '09:00': { course: 'ENG 101', lecturer: 'Mr. David Lee', venue: 'Hall C', type: 'lecture' },
    '11:00': { course: 'CSC 305', lecturer: 'Dr. Mary Brown', venue: 'Hall A', type: 'lecture' },
    '15:00': { course: 'GEN 301', lecturer: 'Mr. David Lee', venue: 'Seminar Room', type: 'seminar' },
  },
  'Wednesday': {
    '08:00': { course: 'CSC 301', lecturer: 'Dr. Sarah Johnson', venue: 'Lab 2', type: 'practical' },
    '10:00': { course: 'MTH 101', lecturer: 'Dr. Peter Brown', venue: 'Hall B', type: 'tutorial' },
    '14:00': { course: 'CSC 307', lecturer: 'Dr. Sarah Johnson', venue: 'Hall A', type: 'lecture' },
  },
  'Thursday': {
    '09:00': { course: 'CSC 303', lecturer: 'Prof. James Cole', venue: 'Hall A', type: 'lecture' },
    '11:00': { course: 'ENG 101', lecturer: 'Mr. David Lee', venue: 'Hall C', type: 'tutorial' },
    '15:00': { course: 'CSC 305', lecturer: 'Dr. Mary Brown', venue: 'Lab 1', type: 'practical' },
  },
  'Friday': {
    '08:00': { course: 'GEN 301', lecturer: 'Mr. David Lee', venue: 'Hall B', type: 'lecture' },
    '10:00': { course: 'CSC 307', lecturer: 'Dr. Sarah Johnson', venue: 'Lab 2', type: 'practical' },
  },
}

const upcomingClasses = [
  { time: '10:00 AM', course: 'MTH 101', venue: 'Hall B', lecturer: 'Dr. Peter Brown' },
  { time: '02:00 PM', course: 'CSC 303', venue: 'Lab 1', lecturer: 'Prof. James Cole' },
  { time: '04:00 PM', course: 'GEN 301', venue: 'Seminar Room', lecturer: 'Mr. David Lee' },
]

export default function TimetablePage() {
  const [viewType, setViewType] = useState('week')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      lecture: 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700',
      practical: 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700',
      tutorial: 'bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700',
      seminar: 'bg-amber-100 dark:bg-amber-900 border-amber-300 dark:border-amber-700',
    }
    return colors[type] || 'bg-gray-100 dark:bg-gray-800'
  }

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      lecture: 'bg-blue-500',
      practical: 'bg-green-500',
      tutorial: 'bg-purple-500',
      seminar: 'bg-amber-500',
    }
    return (
      <Badge className={colors[type] || 'bg-gray-500'} variant="default">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Timetable</h1>
          <p className="text-gray-500 dark:text-gray-400">
            View and manage class schedules
          </p>
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
          <Link href="/timetable/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="csc">Computer Science</SelectItem>
                  <SelectItem value="bus">Business Admin</SelectItem>
                  <SelectItem value="eng">Engineering</SelectItem>
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
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium px-4">Week of Nov 25 - 29, 2024</span>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Timetable */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>First Semester 2024/2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 w-20">Time</th>
                      {days.map((day) => (
                        <th key={day} className="border dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 min-w-[150px]">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((time) => (
                      <tr key={time}>
                        <td className="border dark:border-gray-700 p-2 text-center font-medium text-sm bg-gray-50 dark:bg-gray-800">
                          {time}
                        </td>
                        {days.map((day) => {
                          const classInfo = timetableData[day]?.[time]
                          return (
                            <td key={`${day}-${time}`} className="border dark:border-gray-700 p-1 h-20 align-top">
                              {classInfo && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className={`p-2 rounded-lg border ${getTypeColor(classInfo.type)} h-full`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-sm">{classInfo.course}</span>
                                    {getTypeBadge(classInfo.type)}
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-300">{classInfo.lecturer}</p>
                                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                    <MapPin className="h-3 w-3" />
                                    {classInfo.venue}
                                  </div>
                                </motion.div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-500" />
                  <span className="text-sm">Lecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500" />
                  <span className="text-sm">Practical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-purple-500" />
                  <span className="text-sm">Tutorial</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-amber-500" />
                  <span className="text-sm">Seminar</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Classes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Today&apos;s Classes
              </CardTitle>
              <CardDescription>Wednesday, Nov 27</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((cls, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">{cls.course}</span>
                      <Badge variant="outline">{cls.time}</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        {cls.lecturer}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {cls.venue}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                <span className="text-xs">Add Class</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-xs">View Month</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <BookOpen className="h-5 w-5" />
                <span className="text-xs">Courses</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Download className="h-5 w-5" />
                <span className="text-xs">Export PDF</span>
              </Button>
            </CardContent>
          </Card>

          {/* Room Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Room Availability</CardTitle>
              <CardDescription>Currently available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['Hall D', 'Lab 3', 'Seminar Room 2', 'Conference Room'].map((room) => (
                  <div
                    key={room}
                    className="flex items-center justify-between p-2 rounded-lg bg-green-50 dark:bg-green-900/20"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm">{room}</span>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-500">Free</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
