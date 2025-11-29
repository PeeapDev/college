'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  DollarSign,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  PieChart,
  ArrowUpRight,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data for payments
const recentPayments = [
  {
    id: '1',
    receipt_no: 'RCP-2024-0001',
    student_name: 'John Kamara',
    student_id: 'STU-2024-001',
    description: 'Tuition Fee - First Semester',
    amount: 2500,
    method: 'Bank Transfer',
    status: 'completed',
    date: '2024-11-28',
  },
  {
    id: '2',
    receipt_no: 'RCP-2024-0002',
    student_name: 'Mary Conteh',
    student_id: 'STU-2024-002',
    description: 'Registration Fee',
    amount: 100,
    method: 'Mobile Money',
    status: 'completed',
    date: '2024-11-28',
  },
  {
    id: '3',
    receipt_no: 'RCP-2024-0003',
    student_name: 'Ibrahim Sesay',
    student_id: 'STU-2024-003',
    description: 'Tuition Fee - First Semester',
    amount: 2500,
    method: 'Card',
    status: 'pending',
    date: '2024-11-27',
  },
  {
    id: '4',
    receipt_no: 'RCP-2024-0004',
    student_name: 'Fatmata Bangura',
    student_id: 'STU-2024-004',
    description: 'Library Fee',
    amount: 50,
    method: 'Cash',
    status: 'completed',
    date: '2024-11-27',
  },
  {
    id: '5',
    receipt_no: 'RCP-2024-0005',
    student_name: 'Mohamed Turay',
    student_id: 'STU-2024-005',
    description: 'Hostel Fee',
    amount: 800,
    method: 'Bank Transfer',
    status: 'failed',
    date: '2024-11-26',
  },
]

const outstandingBalances = [
  { student_name: 'Aisha Bangura', student_id: 'STU-2024-010', amount: 2500, due_date: '2024-12-15' },
  { student_name: 'Samuel Koroma', student_id: 'STU-2024-011', amount: 1800, due_date: '2024-12-10' },
  { student_name: 'Mariama Sesay', student_id: 'STU-2024-012', amount: 3200, due_date: '2024-12-05' },
  { student_name: 'David Cole', student_id: 'STU-2024-013', amount: 950, due_date: '2024-12-01' },
]

const stats = [
  { label: 'Total Revenue', value: '$524,800', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'bg-green-500' },
  { label: 'Pending Payments', value: '$45,200', change: '-8.2%', trend: 'down', icon: Clock, color: 'bg-amber-500' },
  { label: 'Outstanding Fees', value: '$128,400', change: '+3.1%', trend: 'up', icon: AlertCircle, color: 'bg-red-500' },
  { label: 'This Month', value: '$87,600', change: '+15.3%', trend: 'up', icon: TrendingUp, color: 'bg-blue-500' },
]

export default function FinancePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('payments')

  const filteredPayments = recentPayments.filter((payment) => {
    const matchesSearch =
      payment.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.receipt_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.student_id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string; icon: React.ReactNode }> = {
      completed: { variant: 'default', label: 'Completed', icon: <CheckCircle className="h-3 w-3 mr-1" /> },
      pending: { variant: 'secondary', label: 'Pending', icon: <Clock className="h-3 w-3 mr-1" /> },
      failed: { variant: 'destructive', label: 'Failed', icon: <AlertCircle className="h-3 w-3 mr-1" /> },
    }
    const config = variants[status] || { variant: 'outline', label: status, icon: null }
    return (
      <Badge variant={config.variant} className="flex items-center">
        {config.icon}
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Finance & Billing</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage payments, fees, and financial records
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Link href="/finance/record-payment">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Record Payment
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
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="payments">Recent Payments</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="fees">Fee Structure</TabsTrigger>
            </TabsList>

            <TabsContent value="payments" className="mt-6">
              {/* Search and Filter */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="search"
                        placeholder="Search payments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Payments Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Recent payment transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Receipt</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Student</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Description</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayments.map((payment) => (
                          <tr
                            key={payment.id}
                            className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-mono text-sm">{payment.receipt_no}</p>
                                <p className="text-xs text-gray-500">{payment.date}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">
                                    {payment.student_name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{payment.student_name}</p>
                                  <p className="text-xs text-gray-500">{payment.student_id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm">{payment.description}</p>
                              <p className="text-xs text-gray-500">{payment.method}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-bold">${payment.amount.toLocaleString()}</p>
                            </td>
                            <td className="py-3 px-4">{getStatusBadge(payment.status)}</td>
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
                                    <Receipt className="h-4 w-4 mr-2" />
                                    Print Receipt
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Download PDF
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
                    <p className="text-sm text-gray-500">Showing {filteredPayments.length} payments</p>
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

            <TabsContent value="invoices" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invoices</CardTitle>
                  <CardDescription>Manage student invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Invoice management coming soon</p>
                    <Button variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fees" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fee Structure</CardTitle>
                  <CardDescription>Configure fee types and amounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <PieChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Fee structure configuration coming soon</p>
                    <Button variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Fee Type
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Outstanding Balances */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Outstanding Balances
              </CardTitle>
              <CardDescription>Students with pending fees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {outstandingBalances.map((item, index) => (
                  <motion.div
                    key={item.student_id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.student_name}</p>
                      <p className="text-xs text-gray-500">Due: {item.due_date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">${item.amount.toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All
                <ArrowUpRight className="h-4 w-4 ml-2" />
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
                <CreditCard className="h-5 w-5" />
                <span className="text-xs">Record Payment</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-xs">Create Invoice</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Receipt className="h-5 w-5" />
                <span className="text-xs">Print Receipt</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <PieChart className="h-5 w-5" />
                <span className="text-xs">View Reports</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
