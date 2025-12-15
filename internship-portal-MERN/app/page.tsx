"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, MapPin, Users, Briefcase, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [counters, setCounters] = useState({ internships: 0, students: 0, states: 0 })

  useEffect(() => {
    setMounted(true)

    // Animated counters
    const interval = setInterval(() => {
      setCounters((prev) => ({
        internships: Math.min(prev.internships + 150, 5000),
        students: Math.min(prev.students + 120, 3500),
        states: Math.min(prev.states + 1, 28),
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">PM Internship</span>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
              How It Works
            </a>
            <a href="#why-choose" className="text-sm text-muted-foreground hover:text-foreground transition">
              Why Us
            </a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition">
              Contact
            </a>
          </nav>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-in-up">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary mb-6">
              Find the Right Internship for Your Future
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Smart Recommendations. Simple Process. Better Careers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 group">
                  Register Now <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  Already Have Account?
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mb-12">
              <div className="animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {counters.internships.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground mt-2">Internships Available</p>
              </div>
              <div className="animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="text-3xl md:text-4xl font-bold text-accent">{counters.students.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-2">Students Placed</p>
              </div>
              <div className="animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="text-3xl md:text-4xl font-bold text-secondary">{counters.states}</div>
                <p className="text-sm text-muted-foreground mt-2">States Covered</p>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
              <div className="mx-auto w-full max-w-3xl aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center group hover:border-primary/40 transition cursor-pointer shadow-2xl">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary/40 mx-auto mb-4 group-hover:scale-110 transition" />
                  <p className="text-muted-foreground">Indian Map Animation with Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Journey */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Your Journey to Success</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create Profile", desc: "Tell us about yourself", icon: Users },
              { step: "02", title: "Upload Resume", desc: "Share your achievements", icon: Briefcase },
              { step: "03", title: "Get Internships", desc: "AI-powered matches", icon: CheckCircle },
            ].map((item, idx) => (
              <div key={idx} className="group">
                <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary mb-3">STEP {item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-8">Search Live Internships</h2>
          <div className="relative flex gap-2 bg-card border border-border rounded-xl p-2">
            <input
              type="text"
              placeholder="Search by role, company, or location..."
              className="flex-1 px-4 py-3 bg-transparent outline-none"
            />
            <Button className="bg-primary hover:bg-primary/90">Search</Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose" className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "AI-Powered Matching",
                desc: "Advanced algorithms match your profile with the best internships",
              },
              {
                title: "Government Trusted",
                desc: "Official PM Internship Scheme initiative with verified opportunities",
              },
              { title: "Simple & Accessible", desc: "Designed for users with varying digital literacy levels" },
              { title: "Across India", desc: "Opportunities spanning 28+ states and union territories" },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Data Analyst Intern",
                company: "Tech Startup",
                quote: "Got my dream internship in just 2 weeks!",
              },
              {
                name: "Arjun Kumar",
                role: "Product Manager Intern",
                company: "Fortune 500",
                quote: "Amazing platform, excellent recommendations!",
              },
              {
                name: "Neha Patel",
                role: "Business Analyst",
                company: "Consulting Firm",
                quote: "The AI matching was spot-on for my profile!",
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-6">
                <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} @ {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold">PM Internship</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered internship recommendations for India</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Internships
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 PM Internship Portal. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
