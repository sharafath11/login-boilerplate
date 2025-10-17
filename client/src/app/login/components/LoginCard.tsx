"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SocialLoginButton from "./SocialLoginButton"
import LoginButton from "./LoginButton"
import { validateEmail } from "@/validation/emailValidation"
import { Button } from "@/components/ui/button"
import { authService } from "@/services/authService"
import { showErrorToast, showInfoToast, showSuccessToast } from "@/utils/toast"

const LoginCard: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      showInfoToast("Invalid email address")
      return
    }
    if (!password) {
      showInfoToast("Password is required")
      return
    }
   
    setIsLoading(true)
     const res = await authService.login(email, password);
     if (!res?.ok) return showErrorToast(res?.msg as string)
     showSuccessToast(res.msg)
     setIsLoading(false)
  }

  const handleGoogleLogin = () => console.log("Google login")
  const handleGithubLogin = () => console.log("GitHub login")

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
      <div className="text-center mb-6">
        <p className="text-gray-600 text-sm">
          Don't have an Account?{" "}
          <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            Sign up
          </button>
        </p>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
        Log in to your account
      </h2>
      <div className="space-y-3 mb-6">
        <SocialLoginButton provider="Google" onClick={handleGoogleLogin} />
        <SocialLoginButton provider="GitHub" onClick={handleGithubLogin} />
      </div>
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or continue with email</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

       

        <LoginButton isLoading={isLoading} />
      </form>
      <div className="mt-6 text-center">
        <Button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
          Browse collection
        </Button>
      </div>
    </div>
  )
}

export default LoginCard
