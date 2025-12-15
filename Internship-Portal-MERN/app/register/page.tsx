"use client"

import { SignUp } from "@clerk/nextjs"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <Link href="/" className="flex items-center gap-2 mb-8 text-primary hover:text-primary/80 transition">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Card with Clerk SignUp */}
        <Card className="p-8 border border-border overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">PM Internship</h1>
          </div>

          <SignUp
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
            signInUrl="/login"
          />
        </Card>
      </div>
    </div>
  )
}
