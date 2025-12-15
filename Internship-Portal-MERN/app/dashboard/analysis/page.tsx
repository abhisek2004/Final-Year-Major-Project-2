"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Sparkles, Check, AlertCircle } from "lucide-react"

export default function AnalysisPage() {
  const [file, setFile] = useState<File | null>(null)
  const [extractedSkills, setExtractedSkills] = useState<string[]>([])
  const [formData, setFormData] = useState({
    education: "",
    sector: "",
    location: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      // Mock skill extraction
      setExtractedSkills(["Product Management", "Data Analysis", "Python", "SQL", "Project Management", "Leadership"])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      // Mock skill extraction
      setExtractedSkills(["Product Management", "Data Analysis", "Python", "SQL", "Project Management", "Leadership"])
    }
  }

  const handleGenerateRecommendations = () => {
    if (file && formData.education && formData.sector && formData.location) {
      setSubmitted(true)
      // Redirect to predictions page after 2 seconds
      setTimeout(() => {
        window.location.href = "/dashboard/predictions"
      }, 2000)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resume Analysis</h1>
        <p className="text-muted-foreground">Upload your resume and we'll match you with the best internships</p>
      </div>

      {/* Resume Upload Section */}
      <Card className="p-8 border-2 border-dashed border-primary/30 mb-8 hover:border-primary/60 transition">
        {!file ? (
          <div onDragOver={(e) => e.preventDefault()} onDrop={handleFileDrop} className="text-center cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Drag and drop your resume</h3>
            <p className="text-muted-foreground mb-4">or click to browse (PDF format only)</p>
            <label>
              <input type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />
              <Button asChild className="bg-primary hover:bg-primary/90">
                <span>Choose File</span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="font-bold text-lg mb-2">Resume Uploaded</h3>
            <p className="text-muted-foreground mb-4">{file.name}</p>
            <Button
              variant="outline"
              onClick={() => {
                setFile(null)
                setExtractedSkills([])
              }}
              className="bg-transparent"
            >
              Change File
            </Button>
          </div>
        )}
      </Card>

      {/* Extracted Skills */}
      {extractedSkills.length > 0 && (
        <Card className="p-6 mb-8 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            <h2 className="font-bold text-lg">Extracted Skills</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">AI identified these skills from your resume</p>
          <div className="flex flex-wrap gap-2">
            {extractedSkills.map((skill) => (
              <span key={skill} className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Form Section */}
      <Card className="p-8 border border-border">
        <h2 className="font-bold text-xl mb-6">Tell us more about yourself</h2>

        <div className="space-y-6">
          {/* Education Level */}
          <div>
            <label className="block text-sm font-medium mb-2">Education Level</label>
            <select
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select your education level</option>
              <option value="12th">12th Pass</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
            </select>
          </div>

          {/* Sector Interest */}
          <div>
            <label className="block text-sm font-medium mb-2">Sector Interest</label>
            <select
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select your sector interest</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="consulting">Consulting</option>
              <option value="marketing">Marketing</option>
              <option value="hr">Human Resources</option>
              <option value="operations">Operations</option>
              <option value="sales">Sales</option>
            </select>
          </div>

          {/* Preferred Location */}
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Location</label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select your preferred location</option>
              <option value="bangalore">Bangalore</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="pune">Pune</option>
              <option value="delhi-ncr">Delhi NCR</option>
              <option value="remote">Remote</option>
            </select>
          </div>
        </div>

        {/* Submit Section */}
        {!file || !formData.education || !formData.sector || !formData.location ? (
          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Please complete all fields and upload your resume to generate recommendations
            </p>
          </div>
        ) : (
          <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex gap-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 dark:text-green-200">
              All information complete! Ready to generate your personalized recommendations.
            </p>
          </div>
        )}

        <Button
          onClick={handleGenerateRecommendations}
          disabled={!file || !formData.education || !formData.sector || !formData.location || submitted}
          className={`w-full mt-6 py-3 text-lg font-bold ${submitted ? "bg-green-500" : "bg-primary"} hover:opacity-90`}
        >
          {submitted ? "Generating..." : "Generate Recommendations"}
          {submitted && <Check className="ml-2 w-5 h-5" />}
        </Button>
      </Card>
    </div>
  )
}
