'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  DollarSign,
  BookOpen,
  Calendar,
  PieChart,
  LineChart,
  ArrowUpRight,
  Filter,
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

// Mock data for reports
const reportStats = [
  { label: 'Total Students', value: '2,847', change: '+12.5%', trend: 'up', icon: GraduationCap, color: 'bg-blue-500' },
  { label: 'Total Revenue', value: '$524,800', change: '+8.3%', trend: 'up', icon: DollarSign, color: 'bg-green-500' },
  { label: 'Pass Rate', value: '78.5%', change: '+2.1%', trend: 'up', icon: TrendingUp, color: 'bg-purple-500' },
  { label: 'Staff Count', value: '89', change: '+5', trend: 'up', icon: Users, color: 'bg-amber-500' },
]

const enrollmentByDepartment = [
  { department: 'Computer Science', students: 456, percentage: 16 },
  { department: 'Business Admin', students: 623, percentage: 22 },
  { department: 'Engineering', students: 389, percentage: 14 },
  { department: 'Health Sciences', students: 512, percentage: 18 },
  { department: 'Arts & Humanities', students: 287, percentage: 10 },
  { department: 'Sciences', students: 380, percentage: 13 },
  { department: 'Others', students: 200, percentage: 7 },
]

const financialSummary = [
  { category: 'Tuition Fees', amount: 425000, percentage: 81 },
  { category: 'Registration Fees', amount: 45000, percentage: 9 },
  { category: 'Hostel Fees', amount: 32000, percentage: 6 },
  { category: 'Library Fees', amount: 12800, percentage: 2 },
  { category: 'Other Fees', amount: 10000, percentage: 2 },
]

const recentReports = [
  { name: 'Student Enrollment Report', type: 'Academic', generated: '2024-11-28', size: '2.4 MB' },
  { name: 'Financial Statement Q3', type: 'Finance', generated: '2024-11-25', size: '1.8 MB' },
  { name: 'Staff Performance Report', type: 'HR', generated: '2024-11-20', size: '3.2 MB' },
  { name: 'Examination Results Summary', type: 'Academic', generated: '2024-11-15', size: '4.1 MB' },
]

const availableReports = [
  { name: 'Student Enrollment', description: 'Detailed student enrollment statistics', icon: GraduationCap },
  { name: 'Financial Summary', description: 'Revenue and expense breakdown', icon: DollarSign },
  { name: 'Academic Performance', description: 'Course and exam results analysis', icon: BookOpen },
  { name: 'Staff Analytics', description: 'Staff distribution and performance', icon: Users },
  { name: 'Attendance Report', description: 'Student and staff attendance', icon: Calendar },
  { name: 'Custom Report', description: 'Build your own custom report', icon: FileText },
]

export default function ReportsPage() {
  const [periodFilter, setPeriodFilter] = useState('semester')
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Insights and analytics for your institution
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Enrollment by Department */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-500" />
                  Enrollment by Department
                </CardTitle>
                <CardDescription>Student distribution across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrollmentByDepartment.map((item, index) => (
                    <motion.div
                      key={item.department}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{item.department}</span>
                        <span className="text-sm text-gray-500">{item.students} ({item.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="h-full bg-blue-500"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Revenue Breakdown
                </CardTitle>
                <CardDescription>Income sources this semester</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialSummary.map((item, index) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm text-gray-500">${item.amount.toLocaleString()} ({item.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="h-full bg-green-500"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total Revenue</span>
                    <span className="text-xl font-bold text-green-600">$524,800</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Previously generated reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Report Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Generated</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Size</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentReports.map((report, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-gray-400" />
                              <span className="font-medium">{report.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{report.type}</Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-500">
                            {new Date(report.generated).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-gray-500">{report.size}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="academic" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Overall academic performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Chart visualization would appear here</p>
                    <p className="text-sm text-gray-400">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pass/Fail Trends</CardTitle>
                <CardDescription>Semester-over-semester comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Trend chart would appear here</p>
                    <p className="text-sm text-gray-400">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Average scores by course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { course: 'CSC 301 - Data Structures', avg: 72, enrolled: 45 },
                    { course: 'BUS 201 - Management', avg: 68, enrolled: 78 },
                    { course: 'MTH 101 - Calculus', avg: 58, enrolled: 120 },
                    { course: 'ENG 101 - Communication', avg: 75, enrolled: 200 },
                    { course: 'NUR 301 - Clinical Practice', avg: 82, enrolled: 30 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{item.course}</span>
                          <span className="text-sm">{item.avg}% avg ({item.enrolled} students)</span>
                        </div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              item.avg >= 70 ? 'bg-green-500' :
                              item.avg >= 50 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.avg}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Collection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-600 mb-2">87%</div>
                  <p className="text-gray-500">of expected revenue collected</p>
                  <div className="mt-4 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '87%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outstanding Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold text-red-600 mb-2">$78,400</div>
                  <p className="text-gray-500">pending collection</p>
                  <p className="text-sm text-gray-400 mt-2">342 students with balance</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                    <TrendingUp className="h-8 w-8" />
                    <span className="text-3xl font-bold">+15.3%</span>
                  </div>
                  <p className="text-gray-500">compared to last month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="generate" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableReports.map((report, index) => (
              <motion.div
                key={report.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <report.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{report.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{report.description}</p>
                        <Button variant="outline" size="sm" className="w-full">
                          Generate Report
                          <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
