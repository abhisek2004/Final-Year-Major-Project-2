"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, Share2, Download, MapPin, Briefcase, TrendingUp } from "lucide-react"

interface Internship {
  id: number
  title: string
  company: string
  location: string
  department: string
  matchPercentage: number
  skills: string[]
  description: string
  saved: boolean
}

const mockPredictions: Internship[] = [
  {
    id: 1,
    title: "Product Manager Intern",
    company: "TechCorp India",
    location: "Bangalore",
    department: "Product",
    matchPercentage: 95,
    skills: ["Product Strategy", "Analytics", "Communication", "Product Design"],
    description: "Lead product initiatives in a fast-growing tech startup",
    saved: false,
  },
  {
    id: 2,
    title: "Business Analyst Intern",
    company: "Consulting Plus",
    location: "Delhi",
    department: "Strategy",
    matchPercentage: 88,
    skills: ["Data Analysis", "Problem Solving", "Excel", "Communication"],
    description: "Analyze business processes and optimize operations",
    saved: false,
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "Analytics Hub",
    location: "Hyderabad",
    department: "Analytics",
    matchPercentage: 82,
    skills: ["Data Analysis", "SQL", "Python", "Visualization"],
    description: "Transform raw data into actionable business insights",
    saved: false,
  },
  {
    id: 4,
    title: "Operations Manager Intern",
    company: "Logistics Pro",
    location: "Mumbai",
    department: "Operations",
    matchPercentage: 79,
    skills: ["Process Optimization", "Supply Chain", "Leadership"],
    description: "Optimize operational efficiency and supply chain processes",
    saved: false,
  },
  {
    id: 5,
    title: "Marketing Manager Intern",
    company: "Digital Marketing Co",
    location: "Pune",
    department: "Marketing",
    matchPercentage: 76,
    skills: ["Digital Marketing", "Analytics", "Communication"],
    description: "Drive marketing campaigns and brand growth",
    saved: false,
  },
  {
    id: 6,
    title: "HR Manager Intern",
    company: "People Solutions",
    location: "Bangalore",
    department: "Human Resources",
    matchPercentage: 72,
    skills: ["Recruitment", "HR Policies", "Communication"],
    description: "Build strong teams and develop talent management strategies",
    saved: false,
  },
]

export default function PredictionsPage() {
  const [internships, setInternships] = useState(mockPredictions)
  const [sortBy, setSortBy] = useState<"match" | "recent">("match")

  const handleSave = (id: number) => {
    setInternships(internships.map((item) => (item.id === id ? { ...item, saved: !item.saved } : item)))
  }

  const sortedInternships = [...internships].sort((a, b) => {
    if (sortBy === "match") {
      return b.matchPercentage - a.matchPercentage
    }
    return a.id - b.id
  })

  const savedCount = internships.filter((item) => item.saved).length

  const handleDownloadPDF = () => {
    // Mock download functionality
    alert("PDF download initiated!")
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI-Powered Recommendations</h1>
        <p className="text-muted-foreground">
          {internships.length} internships matched to your profile. {savedCount} saved.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-start sm:items-center">
        <div className="flex gap-2">
          <Button
            onClick={() => setSortBy("match")}
            className={sortBy === "match" ? "bg-primary" : "bg-muted"}
            variant={sortBy === "match" ? "default" : "outline"}
          >
            Top Matches
          </Button>
          <Button
            onClick={() => setSortBy("recent")}
            className={sortBy === "recent" ? "bg-primary" : "bg-muted"}
            variant={sortBy === "recent" ? "default" : "outline"}
          >
            Recent
          </Button>
        </div>
        <Button onClick={handleDownloadPDF} variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Download as PDF
        </Button>
      </div>

      {/* Internship Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedInternships.map((internship) => (
          <Card
            key={internship.id}
            className="p-6 border border-border hover:border-primary/50 transition duration-300 flex flex-col group"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition">{internship.title}</h3>
                <p className="text-sm text-muted-foreground">{internship.company}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSave(internship.id)}
                className={`flex-shrink-0 ${internship.saved ? "text-primary" : "text-muted-foreground"}`}
              >
                <Bookmark className={`w-5 h-5 ${internship.saved ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Match Percentage */}
            <div className="mb-4 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Skills Match</span>
                <span className="text-xl font-bold text-primary">{internship.matchPercentage}%</span>
              </div>
              <div className="w-full bg-primary/20 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${internship.matchPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-2 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {internship.location}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                {internship.department}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground mb-4 flex-1">{internship.description}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {internship.skills.map((skill) => (
                <span key={skill} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                  {skill}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border">
              <Button className="bg-primary hover:bg-primary/90 text-sm">Quick Apply</Button>
              <Button variant="outline" size="sm" className="gap-1 bg-transparent text-sm">
                <Share2 className="w-3 h-3" />
                Share
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedInternships.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">No recommendations yet</p>
          <p className="text-muted-foreground mb-6">
            Complete your profile analysis to get personalized recommendations
          </p>
          <Button className="bg-primary hover:bg-primary/90">Go to Analysis</Button>
        </div>
      )}
    </div>
  )
}
