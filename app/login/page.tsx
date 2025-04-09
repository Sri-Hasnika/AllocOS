"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Home, LogIn, User, Key, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would be an API call
    // API Route: POST /api/auth/login or /api/auth/register
    // Request Body: formData
    // Response: { success: boolean, token: string, user: object }

    console.log("Form submitted:", formData)

    // Redirect to simulation page
    router.push("/simulation")
  }

  return (
    <main className="min-h-screen bg-os-darker flex flex-col">
      {/* Header */}
      <header className="bg-os-dark border-b border-os-light p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-os-blue">OS</span> Simulator
          </h1>
          <nav className="flex space-x-4">
            <Link href="/" className="text-white hover:text-os-blue transition-colors flex items-center">
              <Home className="mr-1" size={16} />
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Login/Register Form */}
      <div className="flex-1 container mx-auto flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-os-dark rounded-lg border border-os-light p-6 shadow-lg w-full max-w-md"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">{isLogin ? "Login to Your Account" : "Create an Account"}</h2>
            <p className="text-gray-400 mt-2">
              {isLogin
                ? "Enter your credentials to access the simulator"
                : "Register to track your progress and compete on the leaderboard"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-os-darker border border-os-light rounded-md py-2 pl-10 pr-4 w-full text-white focus:outline-none focus:ring-1 focus:ring-os-blue"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-os-darker border border-os-light rounded-md py-2 pl-10 pr-4 w-full text-white focus:outline-none focus:ring-1 focus:ring-os-blue"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-400 mb-1">
                  Roll Number
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    required
                    className="bg-os-darker border border-os-light rounded-md py-2 pl-10 pr-4 w-full text-white focus:outline-none focus:ring-1 focus:ring-os-blue"
                    placeholder="CS2001"
                  />
                </div>
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-os-darker border border-os-light rounded-md py-2 pl-10 pr-4 w-full text-white focus:outline-none focus:ring-1 focus:ring-os-blue"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-os-blue hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              <LogIn className="mr-2" size={18} />
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-os-blue hover:underline text-sm">
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
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

