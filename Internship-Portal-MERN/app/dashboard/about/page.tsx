"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle, Zap, Users, Globe, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">About PM Internship Portal</h1>
        <p className="text-lg text-muted-foreground">
          Empowering Indian students through AI-driven internship recommendations
        </p>
      </div>

      {/* Mission Section */}
      <Card className="p-8 mb-8 border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-foreground leading-relaxed">
          The PM Internship Portal is an official initiative dedicated to bridging the gap between talented students and
          quality internship opportunities across India. We leverage cutting-edge AI and machine learning to provide
          personalized, skill-matched recommendations that empower students to kickstart their careers with confidence.
        </p>
      </Card>

      {/* Key Features */}
      <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {[
          {
            icon: Zap,
            title: "AI-Powered Matching",
            desc: "Advanced algorithms analyze your profile to match the perfect internships",
          },
          {
            icon: Shield,
            title: "Government Trusted",
            desc: "Official PM Internship Scheme initiative with verified employers",
          },
          {
            icon: Users,
            title: "Accessible & Inclusive",
            desc: "Designed for users of all digital literacy levels",
          },
          {
            icon: Globe,
            title: "Pan-India Coverage",
            desc: "Internships spanning 28+ states and union territories",
          },
          {
            icon: CheckCircle,
            title: "Quality Verified",
            desc: "All internships and companies are thoroughly vetted",
          },
          {
            icon: Users,
            title: "Student Centric",
            desc: "Features designed with student feedback and needs in mind",
          },
        ].map((feature, idx) => (
          <Card key={idx} className="p-6 border border-border hover:border-primary/50 transition">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.desc}</p>
          </Card>
        ))}
      </div>

      {/* How It Works */}
      <h2 className="text-2xl font-bold mb-6">How Our System Works</h2>
      <Card className="p-8 border border-border mb-12">
        <div className="space-y-6">
          {[
            {
              step: "1",
              title: "Profile Creation",
              desc: "Build your comprehensive profile with education, skills, and interests",
            },
            {
              step: "2",
              title: "Resume Analysis",
              desc: "Our AI extracts key skills and competencies from your resume",
            },
            {
              step: "3",
              title: "Intelligent Matching",
              desc: "Advanced algorithms match your profile with relevant internships",
            },
            {
              step: "4",
              title: "Get Recommendations",
              desc: "Receive personalized internship recommendations ranked by match score",
            },
            {
              step: "5",
              title: "Quick Apply",
              desc: "Apply directly through our platform to your preferred internships",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                  {item.step}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Statistics */}
      <h2 className="text-2xl font-bold mb-6">Impact by Numbers</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { number: "5,000+", label: "Internships Available" },
          { number: "3,500+", label: "Students Placed" },
          { number: "28+", label: "States Covered" },
        ].map((stat, idx) => (
          <Card
            key={idx}
            className="p-8 border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 text-center"
          >
            <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
            <p className="text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
