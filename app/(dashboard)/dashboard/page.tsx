'use client'

import { motion } from 'framer-motion'
import {
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Bell,
  ArrowUpRight,
  MoreHorizontal,
  Building2,
  MapPin,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSubdomain } from '@/lib/hooks/use-subdomain'
import { useTenant } from '@/lib/hooks/use-tenant'

const stats = [
  {
    title: 'Total Students',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: GraduationCap,
    color: 'bg-blue-500',
  },
  {
    title: 'Active Courses',
    value: '156',
    change: '+3.2%',
    trend: 'up',
    icon: BookOpen,
    color: 'bg-purple-500',
  },
  {
    title: 'Staff Members',
    value: '89',
    change: '+5.1%',
    trend: 'up',
    icon: Users,
    color: 'bg-green-500',
  },
  {
    title: 'Revenue (MTD)',
    value: '$124,500',
    change: '-2.3%',
    trend: 'down',
    icon: DollarSign,
    color: 'bg-amber-500',
  },
]

const recentActivities = [
  {
    id: 1,
    user: 'Dr. Sarah Johnson',
    action: 'uploaded results for',
    target: 'CSC 301 - Data Structures',
    time: '5 minutes ago',
    avatar: null,
  },
  {
    id: 2,
    user: 'John Kamara',
    action: 'registered for',
    target: 'Second Semester 2024',
    time: '12 minutes ago',
    avatar: null,
  },
  {
    id: 3,
    user: 'Finance Office',
    action: 'processed payment from',
    target: 'Mary Conteh',
    time: '1 hour ago',
    avatar: null,
  },
  {
    id: 4,
    user: 'Admin',
    action: 'approved admission for',
    target: '15 new students',
    time: '2 hours ago',
    avatar: null,
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: 'Registration Deadline',
    date: 'Dec 15, 2024',
    type: 'deadline',
  },
  {
    id: 2,
    title: 'Mid-Semester Exams Begin',
    date: 'Dec 20, 2024',
    type: 'exam',
  },
  {
    id: 3,
    title: 'Faculty Meeting',
    date: 'Dec 10, 2024',
    type: 'meeting',
  },
]

export default function DashboardPage() {
  const subdomain = useSubdomain()
  const { tenant } = useTenant(subdomain || undefined)

  return (
    <div className="space-y-8">
      {/* Institution Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-6 text-white"
        style={{ 
          background: `linear-gradient(135deg, ${tenant?.primary_color || '#1a56db'} 0%, ${tenant?.secondary_color || '#7c3aed'} 100%)` 
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              {tenant?.logo_url ? (
                <img src={tenant.logo_url} alt={tenant.name} className="h-12 w-12 rounded" />
              ) : (
                <Building2 className="h-8 w-8 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{tenant?.name || 'Institution'}</h1>
              <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                <MapPin className="h-4 w-4" />
                <span>{tenant?.city || tenant?.country || 'Sierra Leone'}</span>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {tenant?.type || 'UNIVERSITY'}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {tenant?.subscription_plan || 'PROFESSIONAL'}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 border-0 text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Academic Calendar
            </Button>
            <Button variant="secondary" className="bg-white hover:bg-white/90 text-gray-900">
              <Bell className="h-4 w-4 mr-2" />
              Announcements
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back! Here&apos;s what&apos;s happening at {tenant?.name || 'your institution'}.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`h-12 w-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-6 w-6 text-white" />
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
                <div className="mt-4">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates across your institution</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.avatar || undefined} />
                      <AvatarFallback>
                        {activity.user.split(' ').map((n) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-gray-500"> {activity.action} </span>
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Activity
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Important dates to remember</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View Calendar
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <GraduationCap className="h-5 w-5" />
                <span className="text-xs">Add Student</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Users className="h-5 w-5" />
                <span className="text-xs">Add Staff</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <BookOpen className="h-5 w-5" />
                <span className="text-xs">New Course</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <DollarSign className="h-5 w-5" />
                <span className="text-xs">Record Payment</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
