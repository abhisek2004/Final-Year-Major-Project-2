"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SignIn } from "@clerk/nextjs"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Mock login
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <Link href="/" className="flex items-center gap-2 mb-8 text-primary hover:text-primary/80 transition">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Card */}
        <Card className="p-8 border border-border">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">PM Internship</h1>
          </div>

          <h2 className="text-xl font-bold mb-2">Welcome Back</h2>
          <p className="text-muted-foreground text-sm mb-6">Sign in to your account to continue</p>

          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none border-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "w-full bg-primary hover:bg-primary/90 text-primary-foreground border-0",
                formButtonPrimary: "w-full bg-primary hover:bg-primary/90 text-primary-foreground",
                formFieldInput: "border-input bg-background text-foreground",
                footerActionLink: "text-primary hover:text-primary/80",
              },
            }}
            redirectUrl="/dashboard"
            signUpUrl="/register"
          />

          {/* Removed custom form elements */}
        </Card>
      </div>
    </div>
  )
}
