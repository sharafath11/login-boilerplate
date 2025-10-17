"use client"
import React from "react"
import LoginCard from "./components/LoginCard"

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-float"></div>
      <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-green-200 to-cyan-200 rounded-full blur-3xl opacity-30 animate-float-delayed"></div>

      <div className="relative w-full max-w-md">
     
        <LoginCard />

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Secure login with enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
