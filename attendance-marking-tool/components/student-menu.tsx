"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StudentMenuProps {
  onAddStudent: (name: string) => void
}

export function StudentMenu({ onAddStudent }: StudentMenuProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newStudentName, setNewStudentName] = useState("")

  const handleAddStudent = () => {
    if (newStudentName.trim()) {
      onAddStudent(newStudentName)
      setNewStudentName("")
      setShowAddForm(false)
    }
  }

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-8 space-y-4">
        {/* Menu Card */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-750 rounded-lg p-6 border border-slate-700 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
            Management
          </h3>

          <div className="space-y-3">
            {/* Add Student Button */}
            {!showAddForm ? (
              <Button
                onClick={() => setShowAddForm(true)}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-cyan-500/20"
              >
                <Plus size={20} />
                Add Student
              </Button>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Student name..."
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddStudent()}
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-slate-400"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddStudent}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-1 rounded transition-all duration-200"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddForm(false)
                      setNewStudentName("")
                    }}
                    className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1 rounded transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <p className="text-sm text-slate-400 leading-relaxed">
            <span className="text-cyan-400 font-semibold">Tip:</span> Click on student names to edit them, use
            checkboxes to mark attendance, or download as PDF.
          </p>
        </div>
      </div>
    </aside>
  )
}
