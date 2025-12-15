"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, Upload, Sparkles, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const completionPercentage = 65

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Priya!</h1>
        <p className="text-muted-foreground">Continue your journey to find the perfect internship</p>
      </div>

      {/* Progress Card */}
      <Card className="p-6 mb-8 border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Profile Completion</h2>
          <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2 mb-4" />
        <p className="text-sm text-muted-foreground">Complete your profile to unlock better recommendations</p>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 border border-border hover:border-primary/50 transition cursor-pointer group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-bold mb-2">Upload Resume</h3>
          <p className="text-sm text-muted-foreground mb-4">Let AI analyze your skills and experience</p>
          <Link href="/dashboard/analysis">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Upload Now
            </Button>
          </Link>
        </Card>

        <Card className="p-6 border border-border hover:border-accent/50 transition cursor-pointer group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-accent" />
          </div>
          <h3 className="font-bold mb-2">View Recommendations</h3>
          <p className="text-sm text-muted-foreground mb-4">Check AI-powered internship matches for you</p>
          <Link href="/dashboard/predictions">
            <Button size="sm" className="bg-accent hover:bg-accent/90">
              View Now
            </Button>
          </Link>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 border border-border">
        <h2 className="font-bold text-lg mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: "Profile created", time: "2 hours ago" },
            { action: "Viewed 5 internships", time: "1 day ago" },
            { action: "Saved 2 positions", time: "3 days ago" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm">{item.action}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Clock className="w-3 h-3" />
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
