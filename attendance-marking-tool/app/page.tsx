"use client"

import { useState, useEffect } from "react"
import { DateTimeHeader } from "@/components/date-time-header"
import { StudentList } from "@/components/student-list"
import { StudentMenu } from "@/components/student-menu"
import { PDFDownloadButton } from "@/components/pdf-download-button"

export default function Home() {
  const [students, setStudents] = useState<
    Array<{
      id: string
      name: string
      status: "present" | "absent" | null
    }>
  >([
    { id: "1", name: "Alice Johnson", status: null },
    { id: "2", name: "Bob Smith", status: null },
    { id: "3", name: "Charlie Brown", status: null },
    { id: "4", name: "Diana Prince", status: null },
    { id: "5", name: "Evan Davis", status: null },
  ])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const updateAttendance = (id: string, status: "present" | "absent" | null) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, status } : s)))
  }

  const addStudent = (name: string) => {
    if (name.trim()) {
      setStudents([...students, { id: Date.now().toString(), name, status: null }])
    }
  }

  const editStudent = (id: string, newName: string) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, name: newName } : s)))
  }

  const removeStudent = (id: string) => {
    setStudents(students.filter((s) => s.id !== id))
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header with Date & Time */}
        <DateTimeHeader />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
          {/* Student Menu Sidebar */}
          <StudentMenu onAddStudent={addStudent} />

          {/* Student List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <StudentList
                students={students}
                onUpdateAttendance={updateAttendance}
                onEditStudent={editStudent}
                onRemoveStudent={removeStudent}
              />

              {/* PDF Download Button */}
              <PDFDownloadButton students={students} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
