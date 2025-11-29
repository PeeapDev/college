'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FileText,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Upload,
  Calculator,
  BookOpen,
  Users,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import { Progress } from '@/components/ui/progress'

// Mock data for results
const courseResults = [
  {
    id: '1',
    code: 'CSC 301',
    title: 'Data Structures and Algorithms',
    lecturer: 'Dr. Sarah Johnson',
    students_enrolled: 45,
    results_submitted: 45,
    status: 'approved',
    submitted_at: '2024-11-25',
    approved_at: '2024-11-26',
  },
  {
    id: '2',
    code: 'CSC 303',
    title: 'Database Management Systems',
    lecturer: 'Prof. James Cole',
    students_enrolled: 42,
    results_submitted: 42,
    status: 'pending_approval',
    submitted_at: '2024-11-27',
    approved_at: null,
  },
  {
    id: '3',
    code: 'BUS 201',
    title: 'Principles of Management',
    lecturer: 'Dr. Mary Williams',
    students_enrolled: 78,
    results_submitted: 75,
    status: 'draft',
    submitted_at: null,
    approved_at: null,
  },
  {
    id: '4',
    code: 'MTH 101',
    title: 'Calculus I',
    lecturer: 'Dr. Peter Brown',
    students_enrolled: 120,
    results_submitted: 0,
    status: 'not_started',
    submitted_at: null,
    approved_at: null,
  },
  {
    id: '5',
    code: 'ENG 101',
    title: 'Communication Skills',
    lecturer: 'Mr. David Lee',
    students_enrolled: 200,
    results_submitted: 198,
    status: 'approved',
    submitted_at: '2024-11-20',
    approved_at: '2024-11-22',
  },
]

const gradeDistribution = [
  { grade: 'A', count: 45, percentage: 15 },
  { grade: 'B', count: 89, percentage: 30 },
  { grade: 'C', count: 102, percentage: 34 },
  { grade: 'D', count: 38, percentage: 13 },
  { grade: 'F', count: 24, percentage: 8 },
]

const stats = [
  { label: 'Total Courses', value: '124', icon: BookOpen, color: 'bg-blue-500' },
  { label: 'Results Submitted', value: '98', icon: FileText, color: 'bg-green-500' },
  { label: 'Pending Approval', value: '12', icon: Clock, color: 'bg-amber-500' },
  { label: 'Students Graded', value: '2,847', icon: Users, color: 'bg-purple-500' },
]

export default function ResultsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('courses')

  const filteredResults = courseResults.filter((result) => {
    const matchesSearch =
      result.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.lecturer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || result.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string; className?: string }> = {
      approved: { variant: 'default', label: 'Approved', className: 'bg-green-500' },
      pending_approval: { variant: 'secondary', label: 'Pending Approval' },
      draft: { variant: 'outline', label: 'Draft' },
      not_started: { variant: 'outline', label: 'Not Started', className: 'border-gray-300 text-gray-500' },
    }
    const config = variants[status] || { variant: 'outline', label: status }
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>
  }

  const getProgressColor = (submitted: number, total: number) => {
    const percentage = (submitted / total) * 100
    if (percentage === 100) return 'bg-green-500'
    if (percentage >= 50) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Results Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage course results, grades, and transcripts
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/results/entry">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Enter Results
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
              <TabsTrigger value="courses">Course Results</TabsTrigger>
              <TabsTrigger value="approval">Pending Approval</TabsTrigger>
              <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="mt-6">
              {/* Search and Filter */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="search"
                        placeholder="Search by course code or lecturer..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending_approval">Pending Approval</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="not_started">Not Started</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Results Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Results Status</CardTitle>
                  <CardDescription>Track result submission and approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredResults.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="p-4 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{result.code}</h3>
                              {getStatusBadge(result.status)}
                            </div>
                            <p className="text-sm text-gray-500">{result.title}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/results/${result.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Results
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/results/${result.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Results
                                </Link>
                              </DropdownMenuItem>
                              {result.status === 'pending_approval' && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-green-600">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {result.lecturer.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{result.lecturer}</span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Progress</span>
                            <span className="font-medium">
                              {result.results_submitted}/{result.students_enrolled} students
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getProgressColor(result.results_submitted, result.students_enrolled)} transition-all`}
                              style={{ width: `${(result.results_submitted / result.students_enrolled) * 100}%` }}
                            />
                          </div>
                        </div>

                        {result.submitted_at && (
                          <p className="text-xs text-gray-400 mt-2">
                            Submitted: {new Date(result.submitted_at).toLocaleDateString()}
                            {result.approved_at && ` • Approved: ${new Date(result.approved_at).toLocaleDateString()}`}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="approval" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approval</CardTitle>
                  <CardDescription>Results awaiting registrar approval</CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredResults.filter(r => r.status === 'pending_approval').length > 0 ? (
                    <div className="space-y-4">
                      {filteredResults.filter(r => r.status === 'pending_approval').map((result) => (
                        <div
                          key={result.id}
                          className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-700"
                        >
                          <div>
                            <h3 className="font-semibold">{result.code}: {result.title}</h3>
                            <p className="text-sm text-gray-500">{result.lecturer}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                      <p className="text-gray-500">No results pending approval</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcripts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transcript Requests</CardTitle>
                  <CardDescription>Manage transcript generation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Transcript management coming soon</p>
                    <Button variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Generate Transcript
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Grade Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Current semester overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gradeDistribution.map((item) => (
                  <div key={item.grade} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Grade {item.grade}</span>
                      <span className="text-gray-500">{item.count} students ({item.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          item.grade === 'A' ? 'bg-green-500' :
                          item.grade === 'B' ? 'bg-blue-500' :
                          item.grade === 'C' ? 'bg-amber-500' :
                          item.grade === 'D' ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
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
                <Upload className="h-5 w-5" />
                <span className="text-xs">Upload Results</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Calculator className="h-5 w-5" />
                <span className="text-xs">Calculate GPA</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-xs">Transcripts</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Download className="h-5 w-5" />
                <span className="text-xs">Export All</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
