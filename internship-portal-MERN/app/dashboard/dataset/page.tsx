"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search, Info } from "lucide-react"

interface Internship {
  id: number
  title: string
  company: string
  location: string
  skills: string[]
  level: string
  sector: string
}

const mockData: Internship[] = [
  {
    id: 1,
    title: "Product Manager Intern",
    company: "TechCorp India",
    location: "Bangalore",
    skills: ["Product Strategy", "Analytics", "Communication"],
    level: "Intermediate",
    sector: "Technology",
  },
  {
    id: 2,
    title: "Business Analyst Intern",
    company: "Consulting Plus",
    location: "Delhi",
    skills: ["Data Analysis", "Excel", "Problem Solving"],
    level: "Beginner",
    sector: "Consulting",
  },
  {
    id: 3,
    title: "Operations Manager Intern",
    company: "Logistics Hub",
    location: "Mumbai",
    skills: ["Process Optimization", "Supply Chain", "Leadership"],
    level: "Intermediate",
    sector: "Logistics",
  },
  {
    id: 4,
    title: "Marketing Manager Intern",
    company: "Digital Marketing Co",
    location: "Hyderabad",
    skills: ["Digital Marketing", "SEO", "Analytics"],
    level: "Beginner",
    sector: "Marketing",
  },
  {
    id: 5,
    title: "Financial Analyst Intern",
    company: "Investment Bank",
    location: "Mumbai",
    skills: ["Financial Modeling", "Excel", "Analysis"],
    level: "Advanced",
    sector: "Finance",
  },
  {
    id: 6,
    title: "HR Manager Intern",
    company: "People Solutions",
    location: "Pune",
    skills: ["Recruitment", "HR Policies", "Communication"],
    level: "Beginner",
    sector: "HR",
  },
]

export default function DatasetPage() {
  const [filters, setFilters] = useState({
    skill: "",
    location: "",
    level: "",
  })
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = mockData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSkill =
      !filters.skill || item.skills.some((s) => s.toLowerCase().includes(filters.skill.toLowerCase()))

    const matchesLocation = !filters.location || item.location.toLowerCase().includes(filters.location.toLowerCase())

    const matchesLevel = !filters.level || item.level === filters.level

    return matchesSearch && matchesSkill && matchesLocation && matchesLevel
  })

  const uniqueLocations = [...new Set(mockData.map((item) => item.location))]
  const uniqueLevels = [...new Set(mockData.map((item) => item.level))]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Internship Dataset</h1>
        <p className="text-muted-foreground">Browse and filter all available internship opportunities</p>
      </div>

      {/* Info Box */}
      <Card className="p-4 mb-6 bg-primary/5 border border-primary/20 flex gap-3">
        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">
          This data is sourced from verified employers and updated weekly. Filters help you find internships matching
          your profile.
        </p>
      </Card>

      {/* Filters Section */}
      <Card className="p-6 mb-6 border border-border">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Skill Filter */}
          <div>
            <Input
              placeholder="Filter by skill..."
              value={filters.skill}
              onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
            />
          </div>

          {/* Location Filter */}
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="px-3 py-2 bg-background border border-input rounded-md text-foreground"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={filters.level}
            onChange={(e) => setFilters({ ...filters, level: e.target.value })}
            className="px-3 py-2 bg-background border border-input rounded-md text-foreground"
          >
            <option value="">All Levels</option>
            {uniqueLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="p-6 border border-border overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-lg">Results ({filteredData.length})</h2>
          <Button variant="outline" size="sm">
            Export Data
          </Button>
        </div>

        {filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold">Position</th>
                  <th className="text-left py-3 px-4 font-bold">Company</th>
                  <th className="text-left py-3 px-4 font-bold">Location</th>
                  <th className="text-left py-3 px-4 font-bold">Level</th>
                  <th className="text-left py-3 px-4 font-bold">Skills</th>
                  <th className="text-left py-3 px-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-3 px-4 font-medium">{item.title}</td>
                    <td className="py-3 px-4">{item.company}</td>
                    <td className="py-3 px-4">{item.location}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          item.level === "Beginner"
                            ? "bg-green-500/20 text-green-700 dark:text-green-400"
                            : item.level === "Intermediate"
                              ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                              : "bg-purple-500/20 text-purple-700 dark:text-purple-400"
                        }`}
                      >
                        {item.level}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 flex-wrap">
                        {item.skills.slice(0, 2).map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                            {skill}
                          </span>
                        ))}
                        {item.skills.length > 2 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                            +{item.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No internships match your filters</p>
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  skill: "",
                  location: "",
                  level: "",
                })
              }
            >
              Reset Filters
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
