'use client'

import { BookOpen, CalendarRange, ClipboardList, GraduationCap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSubdomain } from '@/lib/hooks/use-subdomain'
import { useTenant } from '@/lib/hooks/use-tenant'

const quickLinks = [
  { title: 'Programs', icon: GraduationCap, description: 'Manage degree programs and specializations' },
  { title: 'Courses', icon: BookOpen, description: 'Create and schedule courses' },
  { title: 'Timetable', icon: CalendarRange, description: 'Plan lectures and exams' },
  { title: 'Curriculum', icon: ClipboardList, description: 'Set curriculum requirements' },
]

export default function AcademicsPage() {
  const subdomain = useSubdomain()
  const { tenant } = useTenant(subdomain || undefined)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academics</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Configure academic structure for {tenant?.name || 'your institution'}.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">View Calendar</Button>
          <Button>New Course</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((item) => (
          <Card key={item.title} className="h-full">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            Full academics module (programs, courses, curricula, timetables, grading) is being wired to SIS.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Programs</Badge>
            <Badge variant="secondary">Courses</Badge>
            <Badge variant="secondary">Timetable</Badge>
            <Badge variant="secondary">Curriculum</Badge>
            <Badge variant="secondary">Assessment</Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            If you need this prioritized, tell me the first workflow (e.g., “create program → add courses → publish timetable”)
            and I’ll implement that next.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
