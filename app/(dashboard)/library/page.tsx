'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BookMarked,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  BookOpen,
  Users,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  QrCode,
  RotateCcw,
  Calendar,
  BookCopy,
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

// Mock data for books
const books = [
  {
    id: '1',
    isbn: '978-0-13-468599-1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    category: 'Computer Science',
    copies_total: 10,
    copies_available: 3,
    location: 'Section A, Shelf 12',
    status: 'available',
  },
  {
    id: '2',
    isbn: '978-0-321-12521-7',
    title: 'Domain-Driven Design',
    author: 'Eric Evans',
    category: 'Software Engineering',
    copies_total: 5,
    copies_available: 0,
    location: 'Section A, Shelf 15',
    status: 'unavailable',
  },
  {
    id: '3',
    isbn: '978-0-07-352332-3',
    title: 'Principles of Economics',
    author: 'N. Gregory Mankiw',
    category: 'Economics',
    copies_total: 15,
    copies_available: 8,
    location: 'Section B, Shelf 5',
    status: 'available',
  },
  {
    id: '4',
    isbn: '978-1-4051-8178-4',
    title: 'Fundamentals of Nursing',
    author: 'Patricia A. Potter',
    category: 'Health Sciences',
    copies_total: 20,
    copies_available: 12,
    location: 'Section C, Shelf 3',
    status: 'available',
  },
  {
    id: '5',
    isbn: '978-0-13-468599-2',
    title: 'Civil Engineering Materials',
    author: 'Neil Jackson',
    category: 'Engineering',
    copies_total: 8,
    copies_available: 2,
    location: 'Section D, Shelf 8',
    status: 'low_stock',
  },
]

const borrowedBooks = [
  {
    id: '1',
    book_title: 'Introduction to Algorithms',
    student_name: 'John Kamara',
    student_id: 'STU-2024-001',
    borrowed_date: '2024-11-15',
    due_date: '2024-12-15',
    status: 'active',
  },
  {
    id: '2',
    book_title: 'Domain-Driven Design',
    student_name: 'Mary Conteh',
    student_id: 'STU-2024-002',
    borrowed_date: '2024-11-10',
    due_date: '2024-12-10',
    status: 'overdue',
  },
  {
    id: '3',
    book_title: 'Principles of Economics',
    student_name: 'Ibrahim Sesay',
    student_id: 'STU-2024-003',
    borrowed_date: '2024-11-20',
    due_date: '2024-12-20',
    status: 'active',
  },
]

const stats = [
  { label: 'Total Books', value: '12,456', icon: BookOpen, color: 'bg-blue-500' },
  { label: 'Currently Borrowed', value: '1,234', icon: BookCopy, color: 'bg-purple-500' },
  { label: 'Active Members', value: '2,847', icon: Users, color: 'bg-green-500' },
  { label: 'Overdue Returns', value: '45', icon: AlertCircle, color: 'bg-red-500' },
]

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('catalog')

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery)

    const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string; className?: string }> = {
      available: { variant: 'default', label: 'Available', className: 'bg-green-500' },
      unavailable: { variant: 'destructive', label: 'Unavailable' },
      low_stock: { variant: 'secondary', label: 'Low Stock' },
      active: { variant: 'default', label: 'Active', className: 'bg-blue-500' },
      overdue: { variant: 'destructive', label: 'Overdue' },
      returned: { variant: 'outline', label: 'Returned' },
    }
    const config = variants[status] || { variant: 'outline', label: status }
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Library Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage books, borrowing, and library resources
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Link href="/library/add-book">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Book
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
          <TabsTrigger value="catalog">Book Catalog</TabsTrigger>
          <TabsTrigger value="borrowed">Borrowed Books</TabsTrigger>
          <TabsTrigger value="overdue">Overdue Returns</TabsTrigger>
          <TabsTrigger value="digital">Digital Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="mt-6">
          {/* Search and Filter */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search by title, author, or ISBN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                      <SelectItem value="Economics">Economics</SelectItem>
                      <SelectItem value="Health Sciences">Health Sciences</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Books Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base line-clamp-2">{book.title}</CardTitle>
                        <CardDescription className="mt-1">{book.author}</CardDescription>
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
                            Edit Book
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <QrCode className="h-4 w-4 mr-2" />
                            Generate QR
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <BookCopy className="h-4 w-4 mr-2" />
                            Issue Book
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{book.category}</Badge>
                      {getStatusBadge(book.status)}
                    </div>

                    <div className="text-sm text-gray-500 space-y-1">
                      <p className="font-mono text-xs">{book.isbn}</p>
                      <p>{book.location}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Availability</span>
                        <span className="font-medium">{book.copies_available}/{book.copies_total} copies</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            book.copies_available === 0 ? 'bg-red-500' :
                            book.copies_available <= 2 ? 'bg-amber-500' : 'bg-green-500'
                          } transition-all`}
                          style={{ width: `${(book.copies_available / book.copies_total) * 100}%` }}
                        />
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" disabled={book.copies_available === 0}>
                      <BookCopy className="h-4 w-4 mr-2" />
                      {book.copies_available === 0 ? 'Not Available' : 'Issue Book'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="borrowed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Currently Borrowed Books</CardTitle>
              <CardDescription>Track all active book loans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Book</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Student</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Borrowed</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Due Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowedBooks.map((loan) => (
                      <tr
                        key={loan.id}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="py-3 px-4">
                          <p className="font-medium">{loan.book_title}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {loan.student_name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{loan.student_name}</p>
                              <p className="text-xs text-gray-500">{loan.student_id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{new Date(loan.borrowed_date).toLocaleDateString()}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm">{new Date(loan.due_date).toLocaleDateString()}</span>
                        </td>
                        <td className="py-3 px-4">{getStatusBadge(loan.status)}</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Return
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Overdue Returns
              </CardTitle>
              <CardDescription>Books that need immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {borrowedBooks.filter(b => b.status === 'overdue').map((loan) => (
                  <div
                    key={loan.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
                        <BookMarked className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">{loan.book_title}</p>
                        <p className="text-sm text-gray-500">{loan.student_name} • Due: {new Date(loan.due_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Send Reminder</Button>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600">
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Process Return
                      </Button>
                    </div>
                  </div>
                ))}
                {borrowedBooks.filter(b => b.status === 'overdue').length === 0 && (
                  <div className="text-center py-8">
                    <BookMarked className="h-12 w-12 mx-auto text-green-500 mb-4" />
                    <p className="text-gray-500">No overdue books at the moment</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="digital" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Digital Resources</CardTitle>
              <CardDescription>E-books and online materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Digital library coming soon</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload E-Book
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
