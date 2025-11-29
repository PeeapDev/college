'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  UserPlus,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  Users,
  UserCheck,
  UserX,
  Send,
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

// Mock data for applications
const applications = [
  {
    id: '1',
    application_id: 'APP-2024-0001',
    first_name: 'Aisha',
    last_name: 'Bangura',
    email: 'aisha.bangura@email.com',
    phone: '+232 76 111222',
    program: 'Computer Science',
    admission_type: 'Regular',
    status: 'pending',
    submitted_at: '2024-11-20',
    documents_complete: true,
  },
  {
    id: '2',
    application_id: 'APP-2024-0002',
    first_name: 'Samuel',
    last_name: 'Koroma',
    email: 'samuel.koroma@email.com',
    phone: '+232 77 222333',
    program: 'Business Administration',
    admission_type: 'Direct Entry',
    status: 'under_review',
    submitted_at: '2024-11-18',
    documents_complete: true,
  },
  {
    id: '3',
    application_id: 'APP-2024-0003',
    first_name: 'Mariama',
    last_name: 'Sesay',
    email: 'mariama.sesay@email.com',
    phone: '+232 78 333444',
    program: 'Nursing',
    admission_type: 'Regular',
    status: 'approved',
    submitted_at: '2024-11-15',
    documents_complete: true,
  },
  {
    id: '4',
    application_id: 'APP-2024-0004',
    first_name: 'Ibrahim',
    last_name: 'Turay',
    email: 'ibrahim.turay@email.com',
    phone: '+232 79 444555',
    program: 'Civil Engineering',
    admission_type: 'Transfer',
    status: 'rejected',
    submitted_at: '2024-11-12',
    documents_complete: false,
  },
  {
    id: '5',
    application_id: 'APP-2024-0005',
    first_name: 'Fatmata',
    last_name: 'Kamara',
    email: 'fatmata.kamara@email.com',
    phone: '+232 80 555666',
    program: 'Law',
    admission_type: 'Regular',
    status: 'offer_sent',
    submitted_at: '2024-11-10',
    documents_complete: true,
  },
  {
    id: '6',
    application_id: 'APP-2024-0006',
    first_name: 'Mohamed',
    last_name: 'Conteh',
    email: 'mohamed.conteh@email.com',
    phone: '+232 76 666777',
    program: 'Medicine',
    admission_type: 'Regular',
    status: 'accepted',
    submitted_at: '2024-11-08',
    documents_complete: true,
  },
]

const stats = [
  { label: 'Total Applications', value: '1,247', icon: Users, color: 'bg-blue-500' },
  { label: 'Pending Review', value: '342', icon: Clock, color: 'bg-amber-500' },
  { label: 'Approved', value: '687', icon: UserCheck, color: 'bg-green-500' },
  { label: 'Rejected', value: '218', icon: UserX, color: 'bg-red-500' },
]

export default function AdmissionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.application_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    const matchesTab = activeTab === 'all' || app.status === activeTab

    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string; className?: string }> = {
      pending: { variant: 'outline', label: 'Pending', className: 'border-amber-500 text-amber-600' },
      under_review: { variant: 'secondary', label: 'Under Review' },
      approved: { variant: 'default', label: 'Approved', className: 'bg-green-500' },
      rejected: { variant: 'destructive', label: 'Rejected' },
      offer_sent: { variant: 'default', label: 'Offer Sent', className: 'bg-blue-500' },
      accepted: { variant: 'default', label: 'Accepted', className: 'bg-purple-500' },
    }
    const config = variants[status] || { variant: 'outline', label: status }
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admissions</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage student applications and enrollment
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/admissions/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Application
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="under_review">Under Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="offer_sent">Offers Sent</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search by name, application ID, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="offer_sent">Offer Sent</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications Table */}
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>
                Showing {filteredApplications.length} applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Applicant</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Application ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Program</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Documents</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Submitted</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback>
                                {app.first_name[0]}{app.last_name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {app.first_name} {app.last_name}
                              </p>
                              <p className="text-sm text-gray-500">{app.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm">{app.application_id}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{app.program}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{app.admission_type}</span>
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(app.status)}</td>
                        <td className="py-3 px-4">
                          {app.documents_complete ? (
                            <Badge variant="outline" className="border-green-500 text-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Complete
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-red-500 text-red-600">
                              <XCircle className="h-3 w-3 mr-1" />
                              Incomplete
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-500">
                            {new Date(app.submitted_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admissions/${app.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Application
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                View Documents
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {app.status === 'pending' || app.status === 'under_review' ? (
                                <>
                                  <DropdownMenuItem className="text-green-600">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              ) : null}
                              {app.status === 'approved' && (
                                <DropdownMenuItem className="text-blue-600">
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Offer
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t dark:border-gray-700">
                <p className="text-sm text-gray-500">
                  Showing 1 to {filteredApplications.length} of {applications.length} entries
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
