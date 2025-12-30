"use client"

import { useState, useEffect } from "react"

export function DateTimeHeader() {
  const [dateTime, setDateTime] = useState({
    date: "",
    day: "",
    time: "",
  })

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

      const date = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
      const day = days[now.getDay()]
      const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })

      setDateTime({ date, day, time })
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center mb-12 animate-fade-in">
      <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-2">Today's Date</p>
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 font-sans">{dateTime.date}</h1>
      <div className="flex justify-center gap-6 text-lg">
        <div className="text-slate-300">
          <span className="text-cyan-400 font-semibold">{dateTime.day}</span>
        </div>
        <div className="text-slate-400">•</div>
        <div className="text-slate-300 font-mono">{dateTime.time}</div>
      </div>
    </div>
  )
}
