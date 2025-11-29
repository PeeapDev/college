'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Award,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  QrCode,
  Shield,
  FileText,
  Send,
  Printer,
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

// Mock data for certificates
const certificates = [
  {
    id: '1',
    certificate_no: 'CERT-2024-0001',
    student_name: 'John Michael Kamara',
    student_id: 'STU-2021-001',
    program: 'Bachelor of Science in Computer Science',
    class_of_degree: 'Second Class Upper',
    graduation_year: '2024',
    type: 'degree',
    status: 'issued',
    issued_date: '2024-11-20',
    blockchain_hash: '0x8f3b2c1d...',
    verified: true,
  },
  {
    id: '2',
    certificate_no: 'CERT-2024-0002',
    student_name: 'Mary Aminata Conteh',
    student_id: 'STU-2021-002',
    program: 'Bachelor of Arts in Business Administration',
    class_of_degree: 'First Class',
    graduation_year: '2024',
    type: 'degree',
    status: 'pending_approval',
    issued_date: null,
    blockchain_hash: null,
    verified: false,
  },
  {
    id: '3',
    certificate_no: 'CERT-2024-0003',
    student_name: 'Ibrahim Sesay',
    student_id: 'STU-2021-003',
    program: 'Bachelor of Nursing Science',
    class_of_degree: 'Second Class Lower',
    graduation_year: '2024',
    type: 'degree',
    status: 'processing',
    issued_date: null,
    blockchain_hash: null,
    verified: false,
  },
  {
    id: '4',
    certificate_no: 'TRANS-2024-0015',
    student_name: 'Fatmata Bangura',
    student_id: 'STU-2022-004',
    program: 'Bachelor of Economics',
    class_of_degree: null,
    graduation_year: null,
    type: 'transcript',
    status: 'issued',
    issued_date: '2024-11-15',
    blockchain_hash: '0x7e2a1b3c...',
    verified: true,
  },
  {
    id: '5',
    certificate_no: 'CERT-2024-0004',
    student_name: 'Mohamed Turay',
    student_id: 'STU-2021-005',
    program: 'Bachelor of Engineering (Civil)',
    class_of_degree: 'Third Class',
    graduation_year: '2024',
    type: 'degree',
    status: 'issued',
    issued_date: '2024-11-18',
    blockchain_hash: '0x9d4c2e5f...',
    verified: true,
  },
]

const graduationList = [
  { name: 'John Kamara', program: 'Computer Science', cgpa: '3.45', class: 'Second Class Upper' },
  { name: 'Mary Conteh', program: 'Business Administration', cgpa: '3.78', class: 'First Class' },
  { name: 'Ibrahim Sesay', program: 'Nursing', cgpa: '2.85', class: 'Second Class Lower' },
  { name: 'Mohamed Turay', program: 'Civil Engineering', cgpa: '2.15', class: 'Third Class' },
]

const stats = [
  { label: 'Total Certificates', value: '2,156', icon: Award, color: 'bg-purple-500' },
  { label: 'Issued This Year', value: '324', icon: CheckCircle, color: 'bg-green-500' },
  { label: 'Pending', value: '18', icon: Clock, color: 'bg-amber-500' },
  { label: 'Verified on Chain', value: '2,089', icon: Shield, color: 'bg-blue-500' },
]

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('certificates')

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificate_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.student_id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter
    const matchesType = typeFilter === 'all' || cert.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string; className?: string }> = {
      issued: { variant: 'default', label: 'Issued', className: 'bg-green-500' },
      pending_approval: { variant: 'secondary', label: 'Pending Approval' },
      processing: { variant: 'outline', label: 'Processing', className: 'border-amber-500 text-amber-600' },
      revoked: { variant: 'destructive', label: 'Revoked' },
    }
    const config = variants[status] || { variant: 'outline', label: status }
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>
  }

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      degree: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      transcript: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      diploma: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      attestation: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${colors[type] || 'bg-gray-100 text-gray-700'}`}>
        {type}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certificates & Graduation</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage certificates, transcripts, and graduation records
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/certificates/issue">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Issue Certificate
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
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="graduation">Graduation List</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
            </TabsList>

            <TabsContent value="certificates" className="mt-6">
              {/* Search and Filter */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="search"
                        placeholder="Search by name, certificate number..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="degree">Degree</SelectItem>
                          <SelectItem value="transcript">Transcript</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="issued">Issued</SelectItem>
                          <SelectItem value="pending_approval">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certificates Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Certificate Records</CardTitle>
                  <CardDescription>All issued and pending certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Certificate</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Student</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Verified</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCertificates.map((cert) => (
                          <tr
                            key={cert.id}
                            className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-mono text-sm">{cert.certificate_no}</p>
                                <p className="text-xs text-gray-500">
                                  {cert.issued_date ? new Date(cert.issued_date).toLocaleDateString() : 'Not issued'}
                                </p>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">
                                    {cert.student_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">{cert.student_name}</p>
                                  <p className="text-xs text-gray-500">{cert.program}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{getTypeBadge(cert.type)}</td>
                            <td className="py-3 px-4">{getStatusBadge(cert.status)}</td>
                            <td className="py-3 px-4">
                              {cert.verified ? (
                                <Badge variant="outline" className="border-green-500 text-green-600">
                                  <Shield className="h-3 w-3 mr-1" />
                                  On Chain
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="border-gray-300 text-gray-500">
                                  Pending
                                </Badge>
                              )}
                            </td>
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
                                    View Certificate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <QrCode className="h-4 w-4 mr-2" />
                                    Generate QR Code
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Printer className="h-4 w-4 mr-2" />
                                    Print
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {cert.status === 'pending_approval' && (
                                    <DropdownMenuItem className="text-green-600">
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve & Issue
                                    </DropdownMenuItem>
                                  )}
                                  {cert.status === 'issued' && !cert.verified && (
                                    <DropdownMenuItem className="text-blue-600">
                                      <Shield className="h-4 w-4 mr-2" />
                                      Publish to Blockchain
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

                  <div className="flex items-center justify-between mt-4 pt-4 border-t dark:border-gray-700">
                    <p className="text-sm text-gray-500">Showing {filteredCertificates.length} certificates</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                      <Button variant="outline" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="graduation" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Graduation List 2024</CardTitle>
                  <CardDescription>Students eligible for graduation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {graduationList.map((student, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-700"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.program}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{student.cgpa}</p>
                          <p className="text-sm text-gray-500">{student.class}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">
                    <Award className="h-4 w-4 mr-2" />
                    Generate All Certificates
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="verification" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Certificate Verification</CardTitle>
                  <CardDescription>Verify certificate authenticity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Certificate Number or Hash</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter certificate number or blockchain hash..."
                          className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button>
                          <Search className="h-4 w-4 mr-2" />
                          Verify
                        </Button>
                      </div>
                    </div>
                    <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
                      <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500">Enter a certificate number to verify its authenticity</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Blockchain Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Blockchain Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">Network Status</span>
                  <Badge className="bg-green-500">Connected</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Records on chain</span>
                    <span className="font-medium">2,089</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pending sync</span>
                    <span className="font-medium">67</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last sync</span>
                    <span className="font-medium">2 mins ago</span>
                  </div>
                </div>
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
                <Award className="h-5 w-5" />
                <span className="text-xs">Issue Certificate</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-xs">Transcript</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <QrCode className="h-5 w-5" />
                <span className="text-xs">Generate QR</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Send className="h-5 w-5" />
                <span className="text-xs">Sync to SIS</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
