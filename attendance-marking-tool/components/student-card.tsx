"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, Edit2, Trash2 } from "lucide-react"

interface StudentCardProps {
  student: {
    id: string
    name: string
    status: "present" | "absent" | null
  }
  onUpdateAttendance: (id: string, status: "present" | "absent" | null) => void
  onEditStudent: (id: string, newName: string) => void
  onRemoveStudent: (id: string) => void
}

export function StudentCard({ student, onUpdateAttendance, onEditStudent, onRemoveStudent }: StudentCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(student.name)

  const handleSaveEdit = () => {
    if (editedName.trim()) {
      onEditStudent(student.id, editedName)
      setIsEditing(false)
    }
  }

  return (
    <div className="group bg-gradient-to-r from-slate-800 to-slate-750 rounded-lg p-4 sm:p-6 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onBlur={handleSaveEdit}
              onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
              autoFocus
            />
          ) : (
            <h3 className="text-lg font-semibold text-white">{student.name}</h3>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Attendance Buttons */}
          <button
            onClick={() => onUpdateAttendance(student.id, student.status === "present" ? null : "present")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-all duration-200 ${
              student.status === "present"
                ? "bg-green-500/20 text-green-400 border border-green-500/50"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600 hover:border-green-500/30"
            }`}
            title="Mark Present"
          >
            <CheckCircle2 size={18} />
            <span className="hidden sm:inline text-sm font-medium">Present</span>
          </button>

          <button
            onClick={() => onUpdateAttendance(student.id, student.status === "absent" ? null : "absent")}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md transition-all duration-200 ${
              student.status === "absent"
                ? "bg-red-500/20 text-red-400 border border-red-500/50"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600 hover:border-red-500/30"
            }`}
            title="Mark Absent"
          >
            <XCircle size={18} />
            <span className="hidden sm:inline text-sm font-medium">Absent</span>
          </button>

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-md bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-cyan-400 transition-all duration-200 border border-slate-600"
            title="Edit Student"
          >
            <Edit2 size={18} />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onRemoveStudent(student.id)}
            className="p-2 rounded-md bg-slate-700 text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 border border-slate-600 hover:border-red-500/30"
            title="Remove Student"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
