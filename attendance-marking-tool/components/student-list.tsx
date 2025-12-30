"use client"

import { StudentCard } from "./student-card"

interface Student {
  id: string
  name: string
  status: "present" | "absent" | null
}

interface StudentListProps {
  students: Student[]
  onUpdateAttendance: (id: string, status: "present" | "absent" | null) => void
  onEditStudent: (id: string, newName: string) => void
  onRemoveStudent: (id: string) => void
}

export function StudentList({ students, onUpdateAttendance, onEditStudent, onRemoveStudent }: StudentListProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Student Attendance</h2>
        <p className="text-slate-400">Mark attendance for {students.length} students</p>
      </div>
      {students.map((student, index) => (
        <div key={student.id} style={{ animation: `slideIn 0.3s ease-out ${index * 50}ms backwards` }}>
          <StudentCard
            student={student}
            onUpdateAttendance={onUpdateAttendance}
            onEditStudent={onEditStudent}
            onRemoveStudent={onRemoveStudent}
          />
        </div>
      ))}
    </div>
  )
}
