"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PDFDownloadButtonProps {
  students: Array<{
    id: string
    name: string
    status: "present" | "absent" | null
  }>
}

export function PDFDownloadButton({ students }: PDFDownloadButtonProps) {
  const generatePDF = () => {
    const now = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const date = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
    const day = days[now.getDay()]
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })

    // Create PDF content
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Attendance Report - ${date}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #0891b2;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            margin: 0;
            color: #1e293b;
            font-size: 28px;
          }
          .header p {
            margin: 8px 0 0 0;
            color: #64748b;
            font-size: 14px;
          }
          .info-section {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
          }
          .info-item {
            padding: 12px;
            background-color: #f8fafc;
            border-left: 4px solid #0891b2;
            border-radius: 4px;
          }
          .info-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }
          .info-value {
            font-size: 16px;
            font-weight: bold;
            color: #1e293b;
          }
          .attendance-title {
            font-size: 18px;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 15px;
            border-top: 2px solid #e2e8f0;
            padding-top: 15px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          thead {
            background-color: #0891b2;
            color: white;
          }
          th {
            padding: 12px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 14px;
            color: #334155;
          }
          tbody tr:nth-child(even) {
            background-color: #f8fafc;
          }
          .status-present {
            color: #059669;
            font-weight: 600;
            background-color: #d1fae5;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
          }
          .status-absent {
            color: #dc2626;
            font-weight: 600;
            background-color: #fee2e2;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
          }
          .status-unmarked {
            color: #6b7280;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
          }
          .summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-top: 20px;
          }
          .summary-item {
            padding: 12px;
            border-radius: 6px;
            text-align: center;
            font-weight: 600;
            font-size: 14px;
          }
          .summary-present {
            background-color: #d1fae5;
            color: #059669;
          }
          .summary-absent {
            background-color: #fee2e2;
            color: #dc2626;
          }
          .summary-unmarked {
            background-color: #f3f4f6;
            color: #6b7280;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #94a3b8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Attendance Report</h1>
            <p>Attendance Marking System</p>
          </div>

          <div class="info-section">
            <div class="info-item">
              <div class="info-label">Date</div>
              <div class="info-value">${date}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Day</div>
              <div class="info-value">${day}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Time</div>
              <div class="info-value">${time}</div>
            </div>
          </div>

          <div class="attendance-title">Student Attendance</div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${students
                .map(
                  (student, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${student.name}</td>
                  <td>
                    ${
                      student.status === "present"
                        ? '<span class="status-present">Present</span>'
                        : student.status === "absent"
                          ? '<span class="status-absent">Absent</span>'
                          : '<span class="status-unmarked">Unmarked</span>'
                    }
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>

          <div class="summary">
            <div class="summary-item summary-present">
              Present: ${students.filter((s) => s.status === "present").length}
            </div>
            <div class="summary-item summary-absent">
              Absent: ${students.filter((s) => s.status === "absent").length}
            </div>
            <div class="summary-item summary-unmarked">
              Unmarked: ${students.filter((s) => s.status === null).length}
            </div>
          </div>

          <div class="footer">
            Generated on ${new Date().toLocaleString()}
          </div>
        </div>
      </body>
      </html>
    `

    // Create blob and download
    const blob = new Blob([pdfContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Attendance_${date.replace(/\s+/g, "_")}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      onClick={generatePDF}
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
    >
      <Download size={20} />
      Download as PDF
    </Button>
  )
}
