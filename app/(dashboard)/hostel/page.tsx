'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Building,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Users,
  Bed,
  DollarSign,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  Key,
  UserCheck,
  UserX,
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

// Mock data for hostels
const hostels = [
  {
    id: '1',
    name: 'Block A - Male Hostel',
    type: 'male',
    total_rooms: 50,
    occupied_rooms: 45,
    total_beds: 200,
    occupied_beds: 178,
    price_per_semester: 400,
    amenities: ['WiFi', 'Water', 'Security', 'Laundry'],
  },
  {
    id: '2',
    name: 'Block B - Female Hostel',
    type: 'female',
    total_rooms: 60,
    occupied_rooms: 58,
    total_beds: 240,
    occupied_beds: 230,
    price_per_semester: 450,
    amenities: ['WiFi', 'Water', 'Security', 'Laundry', 'Kitchen'],
  },
  {
    id: '3',
    name: 'Block C - Postgraduate',
    type: 'mixed',
    total_rooms: 30,
    occupied_rooms: 20,
    total_beds: 30,
    occupied_beds: 20,
    price_per_semester: 600,
    amenities: ['WiFi', 'Water', 'Security', 'Private Bathroom', 'AC'],
  },
]

const roomAllocations = [
  {
    id: '1',
    student_name: 'John Kamara',
    student_id: 'STU-2024-001',
    hostel: 'Block A - Male Hostel',
    room_number: 'A-101',
    bed_number: 'Bed 2',
    check_in: '2024-09-01',
    check_out: '2025-06-30',
    payment_status: 'paid',
  },
  {
    id: '2',
    student_name: 'Mary Conteh',
    student_id: 'STU-2024-002',
    hostel: 'Block B - Female Hostel',
    room_number: 'B-205',
    bed_number: 'Bed 1',
    check_in: '2024-09-01',
    check_out: '2025-06-30',
    payment_status: 'partial',
  },
  {
    id: '3',
    student_name: 'Ibrahim Sesay',
    student_id: 'STU-2024-003',
    hostel: 'Block C - Postgraduate',
    room_number: 'C-015',
    bed_number: 'Single',
    check_in: '2024-09-15',
    check_out: '2025-06-30',
    payment_status: 'pending',
  },
]

const stats = [
  { label: 'Total Rooms', value: '140', icon: Home, color: 'bg-blue-500' },
  { label: 'Occupied', value: '123', icon: UserCheck, color: 'bg-green-500' },
  { label: 'Available', value: '17', icon: Bed, color: 'bg-purple-500' },
  { label: 'Revenue', value: '$85,600', icon: DollarSign, color: 'bg-amber-500' },
]

export default function HostelPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [hostelFilter, setHostelFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  const filteredAllocations = roomAllocations.filter((allocation) => {
    const matchesSearch =
      allocation.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      allocation.room_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      allocation.student_id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesHostel = hostelFilter === 'all' || allocation.hostel.includes(hostelFilter)

    return matchesSearch && matchesHostel
  })

  const getPaymentBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string; className?: string }> = {
      paid: { variant: 'default', label: 'Paid', className: 'bg-green-500' },
      partial: { variant: 'secondary', label: 'Partial' },
      pending: { variant: 'destructive', label: 'Pending' },
    }
    const config = variants[status] || { variant: 'outline', label: status }
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>
  }

  const getOccupancyColor = (occupied: number, total: number) => {
    const percentage = (occupied / total) * 100
    if (percentage >= 95) return 'bg-red-500'
    if (percentage >= 80) return 'bg-amber-500'
    return 'bg-green-500'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hostel Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage accommodation, room allocations, and hostel facilities
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/hostel/allocate">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Allocate Room
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
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Hostel Overview</TabsTrigger>
          <TabsTrigger value="allocations">Room Allocations</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostels.map((hostel, index) => (
              <motion.div
                key={hostel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{hostel.name}</CardTitle>
                        <CardDescription className="mt-1">
                          ${hostel.price_per_semester}/semester
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="capitalize">{hostel.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Room Occupancy */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Home className="h-4 w-4" />
                          Rooms
                        </span>
                        <span className="font-medium">{hostel.occupied_rooms}/{hostel.total_rooms}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getOccupancyColor(hostel.occupied_rooms, hostel.total_rooms)} transition-all`}
                          style={{ width: `${(hostel.occupied_rooms / hostel.total_rooms) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Bed Occupancy */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          Beds
                        </span>
                        <span className="font-medium">{hostel.occupied_beds}/{hostel.total_beds}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getOccupancyColor(hostel.occupied_beds, hostel.total_beds)} transition-all`}
                          style={{ width: `${(hostel.occupied_beds / hostel.total_beds) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1">
                      {hostel.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" className="flex-1" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Rooms
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="allocations" className="mt-6">
          {/* Search and Filter */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search by student name or room number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Select value={hostelFilter} onValueChange={setHostelFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by hostel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Hostels</SelectItem>
                    <SelectItem value="Block A">Block A</SelectItem>
                    <SelectItem value="Block B">Block B</SelectItem>
                    <SelectItem value="Block C">Block C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Allocations Table */}
          <Card>
            <CardHeader>
              <CardTitle>Current Allocations</CardTitle>
              <CardDescription>Active room assignments for this semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Student</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Hostel</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Room</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Duration</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Payment</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAllocations.map((allocation) => (
                      <tr
                        key={allocation.id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {allocation.student_name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{allocation.student_name}</p>
                              <p className="text-xs text-gray-500">{allocation.student_id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{allocation.hostel}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-sm">{allocation.room_number}</p>
                            <p className="text-xs text-gray-500">{allocation.bed_number}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <p>{new Date(allocation.check_in).toLocaleDateString()}</p>
                            <p className="text-gray-500">to {new Date(allocation.check_out).toLocaleDateString()}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">{getPaymentBadge(allocation.payment_status)}</td>
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
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Allocation
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Key className="h-4 w-4 mr-2" />
                                Change Room
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <UserX className="h-4 w-4 mr-2" />
                                Check Out
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
              <CardDescription>Track and manage hostel maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No pending maintenance requests</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
