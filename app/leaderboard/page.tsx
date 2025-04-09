"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Home, Trophy, Medal, User, Search } from "lucide-react"

// Sample leaderboard data
const sampleLeaderboard = [
  { id: 1, name: "Alice", rollNumber: "CS2001", score: 950, level: 3 },
  { id: 2, name: "Bob", rollNumber: "CS2002", score: 920, level: 3 },
  { id: 3, name: "Charlie", rollNumber: "CS2003", score: 880, level: 3 },
  { id: 4, name: "David", rollNumber: "CS2004", score: 850, level: 3 },
  { id: 5, name: "Eve", rollNumber: "CS2005", score: 820, level: 3 },
  { id: 6, name: "Frank", rollNumber: "CS2006", score: 780, level: 2 },
  { id: 7, name: "Grace", rollNumber: "CS2007", score: 750, level: 2 },
  { id: 8, name: "Heidi", rollNumber: "CS2008", score: 720, level: 2 },
  { id: 9, name: "Ivan", rollNumber: "CS2009", score: 680, level: 2 },
  { id: 10, name: "Judy", rollNumber: "CS2010", score: 650, level: 2 },
  { id: 11, name: "Kevin", rollNumber: "CS2011", score: 620, level: 1 },
  { id: 12, name: "Linda", rollNumber: "CS2012", score: 580, level: 1 },
]

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState(sampleLeaderboard)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLevel, setFilterLevel] = useState<number | null>(null)

  // Filter leaderboard based on search and level filter
  const filteredLeaderboard = leaderboard.filter((entry) => {
    const matchesSearch =
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLevel = filterLevel === null || entry.level === filterLevel

    return matchesSearch && matchesLevel
  })

  // Fetch leaderboard data
  useEffect(() => {
    // In a real app, this would be an API call
    // API Route: GET /api/leaderboard
    // Query Parameters: { search?: string, level?: number }
    // Response: { entries: Array<{ id: number, name: string, rollNumber: string, score: number, level: number }> }
    // For now, we'll just use the sample data
  }, [])

  return (
    <main className="min-h-screen bg-os-darker flex flex-col">
      {/* Header */}
      <header className="bg-os-dark border-b border-os-light p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-os-blue">OS</span> Simulator Leaderboard
          </h1>
          <nav className="flex space-x-4">
            <Link href="/" className="text-white hover:text-os-blue transition-colors flex items-center">
              <Home className="mr-1" size={16} />
              Home
            </Link>
            <Link href="/simulation" className="text-white hover:text-os-blue transition-colors flex items-center">
              <Trophy className="mr-1" size={16} />
              Simulation
            </Link>
          </nav>
        </div>
      </header>

      {/* Leaderboard Content */}
      <div className="flex-1 container mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-os-dark rounded-lg border border-os-light p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Trophy className="mr-2 text-os-yellow" />
              Leaderboard
            </h2>

            {/* Search and Filter */}
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by name or roll number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-os-darker border border-os-light rounded-md py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-os-blue"
                />
              </div>

              <select
                value={filterLevel || ""}
                onChange={(e) => setFilterLevel(e.target.value ? Number.parseInt(e.target.value) : null)}
                className="bg-os-darker border border-os-light rounded-md py-2 px-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-os-blue"
              >
                <option value="">All Levels</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
              </select>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-os-light">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Rank</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Roll Number</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Level</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Score</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaderboard.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">
                      No results found
                    </td>
                  </tr>
                ) : (
                  filteredLeaderboard.map((entry, index) => (
                    <tr key={entry.id} className="border-b border-os-light hover:bg-os-lighter transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {index < 3 ? (
                            <Medal
                              className={`mr-2 h-5 w-5 ${
                                index === 0 ? "text-yellow-500" : index === 1 ? "text-gray-400" : "text-amber-700"
                              }`}
                            />
                          ) : (
                            <span className="text-gray-500 w-7 text-center">{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-os-blue" />
                          <span className="text-white">{entry.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{entry.rollNumber}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            entry.level === 1
                              ? "bg-os-green/20 text-os-green"
                              : entry.level === 2
                                ? "bg-os-blue/20 text-os-blue"
                                : "bg-os-purple/20 text-os-purple"
                          }`}
                        >
                          Level {entry.level}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-os-yellow">{entry.score}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-os-dark border-t border-os-light p-4 text-center text-gray-400">
        <p>© 2023 OS Resource Allocation Simulator | Educational Project</p>
      </footer>
    </main>
  )
}

