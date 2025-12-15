"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, Check } from "lucide-react"

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (feedback.rating > 0 && feedback.comment.trim()) {
      setSubmitted(true)
      setTimeout(() => {
        setFeedback({ rating: 0, comment: "" })
        setSubmitted(false)
      }, 3000)
    }
  }

  const ratings = [
    { value: 1, emoji: "😞", label: "Poor" },
    { value: 2, emoji: "😕", label: "Fair" },
    { value: 3, emoji: "😐", label: "Good" },
    { value: 4, emoji: "😊", label: "Very Good" },
    { value: 5, emoji: "🎉", label: "Excellent" },
  ]

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Feedback Matters</h1>
        <p className="text-muted-foreground">Help us improve the PM Internship Portal with your valuable feedback</p>
      </div>

      {/* Feedback Form */}
      <Card className="p-8 border border-border mb-8">
        {!submitted ? (
          <>
            {/* Rating Section */}
            <div className="mb-8">
              <h2 className="font-bold text-lg mb-6">How would you rate your experience?</h2>
              <div className="flex justify-between gap-4">
                {ratings.map((rating) => (
                  <button
                    key={rating.value}
                    onClick={() => setFeedback({ ...feedback, rating: rating.value })}
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200 ${
                      feedback.rating === rating.value
                        ? "bg-primary/20 border-2 border-primary scale-110"
                        : "hover:bg-muted border-2 border-transparent"
                    }`}
                  >
                    <span className="text-3xl">{rating.emoji}</span>
                    <span className="text-xs font-medium text-muted-foreground">{rating.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Additional Comments (Optional)</label>
              <textarea
                value={feedback.comment}
                onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                placeholder="Tell us what you think... Any suggestions for improvement?"
                className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={5}
              />
            </div>

            {/* Contact Info */}
            <div className="mb-8 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Email:</strong> support@pminternship.gov.in
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Helpdesk:</strong> +91-1800-PM-INTERN
              </p>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={feedback.rating === 0}
              className="w-full bg-primary hover:bg-primary/90 py-3 text-lg font-bold gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Feedback
            </Button>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="font-bold text-lg mb-2">Thank you for your feedback!</h3>
            <p className="text-muted-foreground">We appreciate your valuable input. It helps us serve you better.</p>
          </div>
        )}
      </Card>

      {/* Social Support */}
      <h2 className="font-bold text-lg mb-4">Connect With Us</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { platform: "LinkedIn", desc: "Follow our updates and success stories", icon: "in" },
          { platform: "Twitter", desc: "Get latest news and announcements", icon: "tw" },
          { platform: "Instagram", desc: "Join our community and events", icon: "ig" },
          { platform: "Email", desc: "Subscribe to our newsletter", icon: "em" },
        ].map((social, idx) => (
          <Card key={idx} className="p-4 border border-border hover:border-primary/50 transition cursor-pointer">
            <p className="font-medium">{social.platform}</p>
            <p className="text-sm text-muted-foreground mt-1">{social.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
