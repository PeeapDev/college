'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Briefcase,
  UserCheck,
  UserX,
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

// Mock data for staff
const staffMembers = [
  {
    id: '1',
    staff_id: 'STF-001',
    first_name: 'Dr. Sarah',
    last_name: 'Johnson',
    email: 'sarah.johnson@college.edu',
    phone: '+232 76 100001',
    department: 'Computer Science',
    position: 'Senior Lecturer',
    role: 'lecturer',
    status: 'active',
    joined_date: '2018-09-01',
    avatar: null,
  },
  {
    id: '2',
    staff_id: 'STF-002',
    first_name: 'Prof. James',
    last_name: 'Cole',
    email: 'james.cole@college.edu',
    phone: '+232 77 100002',
    department: 'Business Administration',
    position: 'Professor',
    role: 'lecturer',
    status: 'active',
    joined_date: '2015-01-15',
    avatar: null,
  },
  {
    id: '3',
    staff_id: 'STF-003',
    first_name: 'Mary',
    last_name: 'Williams',
    email: 'mary.williams@college.edu',
    phone: '+232 78 100003',
    department: 'Registry',
    position: 'Registrar',
    role: 'admin',
    status: 'active',
    joined_date: '2010-06-20',
    avatar: null,
  },
  {
    id: '4',
    staff_id: 'STF-004',
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@college.edu',
    phone: '+232 79 100004',
    department: 'Finance',
    position: 'Chief Accountant',
    role: 'accountant',
    status: 'active',
    joined_date: '2019-03-10',
    avatar: null,
  },
  {
    id: '5',
    staff_id: 'STF-005',
    first_name: 'Dr. Peter',
    last_name: 'Brown',
    email: 'peter.brown@college.edu',
    phone: '+232 80 100005',
    department: 'Engineering',
    position: 'Lecturer',
    role: 'lecturer',
    status: 'on_leave',
    joined_date: '2020-09-01',
    avatar: null,
  },
  {
    id: '6',
    staff_id: 'STF-006',
    first_name: 'Alice',
    last_name: 'Davis',
    email: 'alice.davis@college.edu',
    phone: '+232 76 100006',
    department: 'Library',
    position: 'Chief Librarian',
    role: 'librarian',
    status: 'active',
    joined_date: '2016-08-15',
    avatar: null,
  },
]

const stats = [
  { label: 'Total Staff', value: '89', icon: Users, color: 'bg-blue-500' },
  { label: 'Lecturers', value: '54', icon: GraduationCap, color: 'bg-purple-500' },
  { label: 'Admin Staff', value: '28', icon: Briefcase, color: 'bg-green-500' },
  { label: 'On Leave', value: '7', icon: UserX, color: 'bg-amber-500' },
]

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.staff_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || staff.status === statusFilter
    const matchesRole = roleFilter === 'all' || staff.role === roleFilter
    const matchesTab = activeTab === 'all' || staff.role === activeTab

    return matchesSearch && matchesStatus && matchesRole && matchesTab
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      active: { variant: 'default', label: 'Active' },
      on_leave: { variant: 'secondary', label: 'On Leave' },
      suspended: { variant: 'destructive', label: 'Suspended' },
      resigned: { variant: 'outline', label: 'Resigned' },
    }
    const config = variants[status] || { variant: 'outline', label: status }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      lecturer: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      admin: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      accountant: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      librarian: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[role] || 'bg-gray-100 text-gray-700'}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage lecturers, administrative staff, and personnel
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/staff/add">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Staff
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
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="lecturer">Lecturers</TabsTrigger>
          <TabsTrigger value="admin">Admin Staff</TabsTrigger>
          <TabsTrigger value="accountant">Finance</TabsTrigger>
          <TabsTrigger value="librarian">Library</TabsTrigger>
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
                    placeholder="Search by name, staff ID, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on_leave">On Leave</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Table */}
          <Card>
            <CardHeader>
              <CardTitle>Staff Directory</CardTitle>
              <CardDescription>
                Showing {filteredStaff.length} staff members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Staff Member</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Department</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Position</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Contact</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStaff.map((staff) => (
                      <tr
                        key={staff.id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={staff.avatar || undefined} />
                              <AvatarFallback>
                                {staff.first_name.split(' ').pop()?.[0]}{staff.last_name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {staff.first_name} {staff.last_name}
                              </p>
                              <p className="text-sm text-gray-500">{staff.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-sm">{staff.staff_id}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{staff.department}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{staff.position}</span>
                        </td>
                        <td className="py-3 px-4">{getRoleBadge(staff.role)}</td>
                        <td className="py-3 px-4">{getStatusBadge(staff.status)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
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
                                <Link href={`/staff/${staff.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/staff/${staff.id}/edit`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Deactivate
                              </DropdownMenuItem>
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
                  Showing 1 to {filteredStaff.length} of {staffMembers.length} entries
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                    1
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
