"use client"
import { Button } from "@/components/ui/button"
import React from "react"

interface SocialLoginButtonProps {
  provider: "Google" | "GitHub"
  onClick: () => void
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, onClick }) => {
  const colors =
    provider === "Google"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-gray-800 hover:bg-gray-900"

  return (
    <Button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-white font-medium ${colors} transition-transform hover:scale-105`}
    >
      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-white/50 to-white/20"></div>
      LOG IN WITH {provider.toUpperCase()}
    </Button>
  )
}

export default SocialLoginButton
