'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Send,
  Mail,
  Bell,
  Smartphone,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Megaphone,
  FileText,
  Image,
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

// Mock data for announcements
const announcements = [
  {
    id: '1',
    title: 'Registration Deadline Extended',
    message: 'The deadline for course registration has been extended to December 20, 2024.',
    author: 'Registrar Office',
    target: 'All Students',
    channel: ['email', 'sms', 'portal'],
    status: 'sent',
    sent_at: '2024-11-28 10:30 AM',
    views: 1245,
  },
  {
    id: '2',
    title: 'Examination Timetable Released',
    message: 'The first semester examination timetable is now available on the student portal.',
    author: 'Exams Office',
    target: 'All Students',
    channel: ['email', 'portal'],
    status: 'sent',
    sent_at: '2024-11-27 02:00 PM',
    views: 2156,
  },
  {
    id: '3',
    title: 'Library Extended Hours',
    message: 'The library will remain open until 10 PM during the examination period.',
    author: 'Library',
    target: 'All Students',
    channel: ['portal'],
    status: 'draft',
    sent_at: null,
    views: 0,
  },
  {
    id: '4',
    title: 'Fee Payment Reminder',
    message: 'This is a reminder to complete your tuition fee payment before the deadline.',
    author: 'Finance Office',
    target: 'Students with Outstanding Balance',
    channel: ['email', 'sms'],
    status: 'scheduled',
    sent_at: '2024-12-01 09:00 AM',
    views: 0,
  },
]

const messageTemplates = [
  { id: '1', name: 'Fee Reminder', category: 'Finance' },
  { id: '2', name: 'Exam Notification', category: 'Academic' },
  { id: '3', name: 'Result Release', category: 'Academic' },
  { id: '4', name: 'Event Invitation', category: 'General' },
]

const stats = [
  { label: 'Total Sent', value: '12,456', icon: Send, color: 'bg-blue-500' },
  { label: 'Email Opens', value: '8,234', icon: Mail, color: 'bg-green-500' },
  { label: 'SMS Delivered', value: '5,678', icon: Smartphone, color: 'bg-purple-500' },
  { label: 'Pending', value: '23', icon: Clock, color: 'bg-amber-500' },
]

export default function CommunicationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('announcements')

  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesSearch =
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.message.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || ann.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string; className?: string }> = {
      sent: { variant: 'default', label: 'Sent', className: 'bg-green-500' },
      draft: { variant: 'outline', label: 'Draft' },
      scheduled: { variant: 'secondary', label: 'Scheduled' },
      failed: { variant: 'destructive', label: 'Failed' },
    }
    const config = variants[status] || { variant: 'outline', label: status }
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>
  }

  const getChannelIcon = (channel: string) => {
    const icons: Record<string, React.ReactNode> = {
      email: <Mail className="h-4 w-4" />,
      sms: <Smartphone className="h-4 w-4" />,
      portal: <Bell className="h-4 w-4" />,
    }
    return icons[channel] || null
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Communications</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Send announcements, notifications, and messages
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/communications/compose">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
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
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {/* Search and Filter */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="search"
                        placeholder="Search announcements..."
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
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Announcements List */}
              <div className="space-y-4">
                {filteredAnnouncements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{announcement.title}</h3>
                              {getStatusBadge(announcement.status)}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                              {announcement.message}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {announcement.target}
                              </div>
                              <div className="flex items-center gap-2">
                                {announcement.channel.map((ch) => (
                                  <span key={ch} className="flex items-center gap-1 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">
                                    {getChannelIcon(ch)}
                                    <span className="capitalize text-xs">{ch}</span>
                                  </span>
                                ))}
                              </div>
                              {announcement.sent_at && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {announcement.sent_at}
                                </div>
                              )}
                              {announcement.views > 0 && (
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  {announcement.views.toLocaleString()} views
                                </div>
                              )}
                            </div>
                          </div>
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
                                Edit
                              </DropdownMenuItem>
                              {announcement.status === 'draft' && (
                                <DropdownMenuItem>
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Now
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Compose */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Compose</CardTitle>
              <CardDescription>Send a quick message</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Recipients</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="staff">All Staff</SelectItem>
                    <SelectItem value="100">100 Level Students</SelectItem>
                    <SelectItem value="200">200 Level Students</SelectItem>
                    <SelectItem value="300">300 Level Students</SelectItem>
                    <SelectItem value="400">400 Level Students</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  rows={3}
                  placeholder="Type your message..."
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Use pre-built templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {messageTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{template.name}</p>
                        <p className="text-xs text-gray-500">{template.category}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Use</Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </CardContent>
          </Card>

          {/* Channel Status */}
          <Card>
            <CardHeader>
              <CardTitle>Channel Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Email (SMTP)', status: 'active', icon: Mail },
                  { name: 'SMS Gateway', status: 'active', icon: Smartphone },
                  { name: 'Push Notifications', status: 'inactive', icon: Bell },
                  { name: 'WhatsApp', status: 'inactive', icon: MessageSquare },
                ].map((channel) => (
                  <div key={channel.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <channel.icon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{channel.name}</span>
                    </div>
                    <Badge variant={channel.status === 'active' ? 'default' : 'outline'} className={channel.status === 'active' ? 'bg-green-500' : ''}>
                      {channel.status === 'active' ? (
                        <><CheckCircle className="h-3 w-3 mr-1" /> Active</>
                      ) : (
                        <><AlertCircle className="h-3 w-3 mr-1" /> Inactive</>
                      )}
                    </Badge>
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
