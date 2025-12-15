"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Github } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  github?: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Project Lead",
    bio: "AI researcher with 10+ years in machine learning and recommendation systems",
    image: "PS",
    linkedin: "#",
    github: "#",
  },
  {
    id: 2,
    name: "Arjun Verma",
    role: "Lead Developer",
    bio: "Full-stack developer specializing in scalable web applications",
    image: "AV",
    linkedin: "#",
    github: "#",
  },
  {
    id: 3,
    name: "Neha Gupta",
    role: "Product Manager",
    bio: "Product strategist focused on user-centric design and accessibility",
    image: "NG",
    linkedin: "#",
  },
  {
    id: 4,
    name: "Rahul Singh",
    role: "Data Scientist",
    bio: "Expert in ML algorithms and data analytics for internship matching",
    image: "RS",
    github: "#",
  },
  {
    id: 5,
    name: "Anjali Patel",
    role: "UX/UI Designer",
    bio: "Designer passionate about creating accessible experiences for all users",
    image: "AP",
    linkedin: "#",
  },
  {
    id: 6,
    name: "Vikas Kumar",
    role: "Backend Engineer",
    bio: "Backend specialist ensuring robust and secure platform infrastructure",
    image: "VK",
    github: "#",
  },
]

export default function TeamPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Dedicated professionals working together to revolutionize internship opportunities across India
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {teamMembers.map((member) => (
          <Card key={member.id} className="p-6 border border-border hover:border-primary/50 transition group">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <span className="text-xl font-bold text-primary-foreground">{member.image}</span>
            </div>

            {/* Info */}
            <h3 className="font-bold text-lg mb-1">{member.name}</h3>
            <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
            <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>

            {/* Social Links */}
            <div className="flex gap-2">
              {member.linkedin && (
                <Button variant="outline" size="icon" asChild className="h-8 w-8 bg-transparent">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {member.github && (
                <Button variant="outline" size="icon" asChild className="h-8 w-8 bg-transparent">
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Join Us Section */}
      <Card className="p-12 border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 text-center">
        <h2 className="text-2xl font-bold mb-4">Want to Join Our Mission?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We're always looking for passionate individuals to help us transform internship opportunities in India.
        </p>
        <Button className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg">Explore Opportunities</Button>
      </Card>
    </div>
  )
}
