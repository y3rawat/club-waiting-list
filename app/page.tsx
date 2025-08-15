"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Users,
  Crown,
  Sparkles,
  ArrowRight,
  ChevronDown,
  PartyPopper,
  Trophy,
  Star,
  Gift,
  Shield,
  Zap,
  Globe,
} from "lucide-react"

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    city: "",
    familyBusiness: "",
    personalInterests: "",
    networkingGoals: "",
    referralSource: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const faqs = [
    {
      question: "What are the membership criteria?",
      answer:
        "We accept young leaders (ages 16-31) from established business families. Applicants must demonstrate family business involvement, leadership potential, and alignment with our community values.",
    },
    {
      question: "How long does the application process take?",
      answer:
        "Initial review takes 48 hours. Shortlisted candidates receive a personal call within a week, followed by final approval within 2 weeks of application.",
    },
    {
      question: "What happens after I'm accepted?",
      answer:
        "You'll receive a personal welcome call, digital membership card, and immediate access to our private community. Your first event invitation comes within 30 days.",
    },
    {
      question: "Are there membership fees?",
      answer:
        "Founding members enjoy complimentary membership for the first year. Premium events may have separate costs, but basic networking and community access is included.",
    },
    {
      question: "How exclusive is this community?",
      answer:
        "We're limiting membership to just 150 founding members across India. Each member is personally verified and must meet our strict criteria for family business background.",
    },
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Application Received</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Thank you for your interest. Our team will review your application and contact you within 48 hours if
              you're shortlisted for membership.
            </p>
            <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Priority Review Status
            </Badge>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.1),transparent_50%)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 px-6 py-3 text-sm font-medium">
              <Crown className="w-4 h-4 mr-2" />
              Invitation Only • Limited to 150 Members
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              Where the Next Generation of{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Wealth Meets Opportunity
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed font-light">
              An exclusive community for young leaders from high-net-worth families. Connect, grow, and celebrate with
              India's most promising next-generation entrepreneurs.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-muted-foreground mb-12">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm sm:text-base">Ages 16-31</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm sm:text-base">Verified Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm sm:text-base">Luxury Events</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-1">150</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Member Limit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-1">₹50Cr+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Avg Family Business</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-1">12</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-1">48hr</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Review Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">Founding Member Benefits</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exclusive privileges reserved for our charter members
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 hover:bg-card/70 transition-all duration-500 group">
            <CardContent className="p-6 sm:p-8">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">Founding Member Status</h3>
              <p className="text-muted-foreground leading-relaxed">
                Permanent badge, priority access to all events, and first choice in premium features.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border-border/50 hover:bg-card/70 transition-all duration-500 group">
            <CardContent className="p-6 sm:p-8">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">Elite Network Access</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI-powered matchmaking with verified members from business families across India.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border-border/50 hover:bg-card/70 transition-all duration-500 group sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6 sm:p-8">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">Luxury Experiences</h3>
              <p className="text-muted-foreground leading-relaxed">
                Exclusive parties, business dinners, and luxury brand previews at premium venues.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">Your Member Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From application to elite status in 6 seamless steps
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: 1,
              title: "Application & Screening",
              desc: "Submit application → 48hr review → Shortlist notification",
              color: "from-primary/20 to-primary/10",
              border: "border-primary/30",
            },
            {
              step: 2,
              title: "Personal Welcome",
              desc: "Welcome call → Digital membership card → Private group access",
              color: "from-accent/20 to-accent/10",
              border: "border-accent/30",
            },
            {
              step: 3,
              title: "First 30 Days",
              desc: "AI member matching → Online networking → First meetup → Luxury invites",
              color: "from-blue-500/20 to-blue-500/10",
              border: "border-blue-500/30",
            },
            {
              step: 4,
              title: "Social Proof & Status",
              desc: "Profile spotlight → Event photos shared → Milestone announcements",
              color: "from-emerald-500/20 to-emerald-500/10",
              border: "border-emerald-500/30",
            },
            {
              step: 5,
              title: "Loyalty & Retention",
              desc: "Priority event access → Anniversary celebrations → Partner perks",
              color: "from-purple-500/20 to-purple-500/10",
              border: "border-purple-500/30",
            },
            {
              step: 6,
              title: "Elite Status",
              desc: "VIP treatment → Exclusive opportunities → Legacy member benefits",
              color: "from-rose-500/20 to-rose-500/10",
              border: "border-rose-500/30",
            },
          ].map((item) => (
            <Card
              key={item.step}
              className={`bg-gradient-to-br ${item.color} backdrop-blur-xl ${item.border} hover:scale-105 transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">Exclusive Member Previews</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get a glimpse of the luxury experiences awaiting you
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: PartyPopper,
              title: "Mumbai Launch Party",
              desc: "Exclusive rooftop venue with 50 founding members",
              badge: "March 2025",
              color: "text-primary",
            },
            {
              icon: Trophy,
              title: "Business Pitch Night",
              desc: "Present your ventures to fellow members and investors",
              badge: "April 2025",
              color: "text-emerald-400",
            },
            {
              icon: Star,
              title: "Luxury Brand Preview",
              desc: "Private access to new collections before public launch",
              badge: "Ongoing",
              color: "text-purple-400",
            },
            {
              icon: Gift,
              title: "Member Rewards",
              desc: "Exclusive discounts and perks from partner brands",
              badge: "Live",
              color: "text-rose-400",
            },
          ].map((event, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-xl border-border/50 hover:bg-card/70 transition-all duration-500 group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <event.icon className={`w-12 h-12 ${event.color}`} />
                </div>
                <h3 className="text-lg font-serif font-semibold text-foreground mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{event.desc}</p>
                <Badge className="bg-primary/20 text-primary border-primary/30">{event.badge}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about membership</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-xl border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-card/30 transition-colors"
                >
                  <h3 className="text-lg font-serif font-semibold text-foreground pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Apply for Membership</h2>
              <p className="text-muted-foreground leading-relaxed">
                Application doesn't guarantee entry. Only verified young leaders from business families are accepted.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50 h-12"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Age *</label>
                  <Input
                    name="age"
                    type="number"
                    min="16"
                    max="31"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50 h-12"
                    placeholder="16-31"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50 h-12"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50 h-12"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50 h-12"
                  placeholder="Mumbai, Delhi, Bangalore, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Family Business Details *</label>
                <Textarea
                  name="familyBusiness"
                  value={formData.familyBusiness}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50 min-h-[120px] resize-none"
                  placeholder="Describe your family's business, industry, and your role/involvement"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Personal Interests & Hobbies</label>
                <Textarea
                  name="personalInterests"
                  value={formData.personalInterests}
                  onChange={handleInputChange}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50 min-h-[100px] resize-none"
                  placeholder="Sports, travel, arts, technology, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Networking Goals</label>
                <Textarea
                  name="networkingGoals"
                  value={formData.networkingGoals}
                  onChange={handleInputChange}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50 min-h-[100px] resize-none"
                  placeholder="What do you hope to achieve through this network?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">How did you hear about us?</label>
                <Input
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleInputChange}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/50 h-12"
                  placeholder="Referral, social media, etc."
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 text-lg h-14 transition-all duration-300 hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Submitting Application...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Submit Application
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
              By applying, you agree to our verification process. Only qualified candidates will be contacted within 48
              hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
