"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/core/ui/button"
import { Input } from "@/core/ui/input"
import { Label } from "@/core/ui/label"
import { Checkbox } from "@/core/ui/checkbox"
import Link from "next/link"
import { ArrowRight, ArrowLeft, ShoppingBag, Check, Gift, Truck, Shield, Sparkles, Star } from "lucide-react"
import Image from "next/image"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 2) {
      setStep(2)
    } else {
      console.log("[Register] Register attempt:", formData)
    }
  }

  const benefits = [
    {
      icon: Gift,
      title: "Welcome Gift",
      description: "Get 15% off your first order",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On all orders, no minimum",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data is always protected",
      color: "from-[#c879ff]/30 to-[#d689ff]/20",
    },
    {
      icon: Sparkles,
      title: "Early Access",
      description: "Be first to shop new collections",
      color: "from-[#e498ff]/30 to-[#f2a8ff]/20",
    },
  ]

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 lg:p-12 bg-gradient-to-br from-[#f8f6ff] to-[#f3efff] relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#A564D3]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#b66ee8]/10 rounded-full blur-3xl" />

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#a564d3] to-[#b66ee8] rounded-xl shadow-lg relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#a564d3] to-[#b66ee8] rounded-xl blur-xl opacity-50" />
              <ShoppingBag className="h-6 w-6 text-white relative z-10" />
            </div>
            <span className="text-2xl text-[#a564d3] font-semibold">Handy</span>
          </div>

          {/* Enhanced Progress Indicator */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-bold">
              <span className={step >= 1 ? "text-[#a564d3]" : "text-muted-foreground"}>
                {step === 1 ? "→ Personal Info" : "✓ Personal Info"}
              </span>
              <span className={step >= 2 ? "text-[#a564d3]" : "text-muted-foreground"}>
                {step === 2 ? "→ Account Details" : "Account Details"}
              </span>
            </div>
            <div className="flex gap-2">
              <div
                className={`h-2.5 flex-1 rounded-full transition-all shadow-sm ${step >= 1 ? "bg-gradient-to-r from-[#a564d3] to-[#b66ee8]" : "bg-gradient-to-r from-[#f2a8ff]/30 to-[#ffc4ff]/30"}`}
              />
              <div
                className={`h-2.5 flex-1 rounded-full transition-all shadow-sm ${step >= 2 ? "bg-gradient-to-r from-[#a564d3] to-[#b66ee8]" : "bg-gradient-to-r from-[#f2a8ff]/30 to-[#ffc4ff]/30"}`}
              />
            </div>
          </div>

          {/* Enhanced Header */}
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-[#c879ff]/20 backdrop-blur-sm rounded-full border border-[#a564d3]/20">
              <span className="text-sm font-semibold text-[#a564d3]">Start Your Journey</span>
            </div>
            <h2 className="text-5xl lg:text-6xl text-foreground leading-tight text-balance font-bold">
              {step === 1 ? "Join our community" : "Almost there!"}
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              {step === 1
                ? "Create your account and unlock exclusive member benefits"
                : "Complete your account setup to start shopping"}
            </p>
          </div>

          {/* Enhanced Social Signup */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full h-14 border-2 hover:border-[#a564d3] hover:bg-[#a564d3]/5 transition-all bg-white shadow-sm hover:shadow-md"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-semibold">Google</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full h-14 border-2 hover:border-[#a564d3] hover:bg-[#a564d3]/5 transition-all bg-white shadow-sm hover:shadow-md"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="font-semibold">Apple</span>
              </Button>
            </div>
          )}

          {/* Enhanced Divider */}
          {step === 1 && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t-2 border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gradient-to-br from-[#f8f6ff] to-[#f3efff] px-6 py-2 text-muted-foreground font-semibold rounded-full border border-border shadow-sm">
                  Or with email
                </span>
              </div>
            </div>
          )}

          {/* Enhanced Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-base font-semibold">
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="h-14 text-base border-2 focus:border-[#a564d3] shadow-sm bg-white"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-base font-semibold">
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className="h-14 text-base border-2 focus:border-[#a564d3] shadow-sm bg-white"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-semibold">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="h-14 text-base border-2 focus:border-[#a564d3] shadow-sm bg-white"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-semibold">
                    Create password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    className="h-14 text-base border-2 focus:border-[#a564d3] shadow-sm bg-white"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={8}
                  />
                  <p className="text-sm text-muted-foreground font-medium">Must be at least 8 characters long</p>
                </div>

                <div className="flex items-start space-x-3 p-5 bg-[#A564D3]/20 backdrop-blur-sm rounded-xl border border-[#415444]/10">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: !!checked })}
                    required
                  />
                  <label htmlFor="terms" className="text-base leading-relaxed cursor-pointer font-medium">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#a564d3] hover:underline font-bold">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#a564d3] hover:underline font-bold">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </>
            )}

            <div className="flex gap-3">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  className="h-14 border-2 bg-white shadow-sm hover:shadow-md px-6"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  <span className="font-semibold">Back</span>
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1 h-14 bg-gradient-to-r from-[#a564d3] to-[#b66ee8] hover:from-[#b66ee8] hover:to-[#c879ff] text-base font-bold group shadow-lg hover:shadow-xl transition-all"
              >
                {step === 1 ? "Continue to next step" : "Create my account"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>

          {/* Enhanced Login Link */}
          <div className="text-center pt-4 pb-2">
            <p className="text-base text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-[#a564d3] font-bold hover:underline hover:text-[#b66ee8]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#A564D3] via-[#B66EE8] to-[#A564D3] overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#f2a8ff]/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#e498ff]/20 blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#c879ff]/10 to-transparent blur-2xl" />
        </div>

        {/* Decorative Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #a564d3 1px, transparent 1px),
              linear-gradient(to bottom, #a564d3 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Product Images */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[6%] right-16 w-80 h-80 rounded-3xl bg-white/50 backdrop-blur-lg p-5 shadow-2xl animate-float border border-white/60">
            <Image
              src="/images/items-varios.jpeg"
              alt="items-varios"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="absolute top-[14%] left-20 w-60 h-60 rounded-3xl bg-white/50 backdrop-blur-lg p-4 shadow-2xl animate-float-delayed border border-white/60">
            <Image
              src="/images/fashion.jpeg"
              alt="fashion"
              width={240}
              height={240}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-12 mt-72">
          {/* Enhanced Header with Badge */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-white/60">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a564d3] to-[#b66ee8] flex items-center justify-center">
                <Gift className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-[#a564d3]">15% OFF YOUR FIRST ORDER</span>
            </div>
            <h1 className="text-6xl text-white leading-tight text-balance font-bold">
              Elevate your{" "}
              <span className="relative inline-block">
                <span className="relative z-10">everyday style</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-white/30 -rotate-1" />
              </span>
            </h1>
            <p className="text-xl text-[#415444]/80 leading-relaxed max-w-lg text-pretty font-medium">
              Join our exclusive community and discover handcrafted tote bags designed for the modern lifestyle
            </p>
          </div>

          {/* Enhanced Benefits Grid */}
          <div className="grid grid-cols-2 gap-5">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="space-y-3 bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-white/60 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} backdrop-blur-sm flex items-center justify-center shadow-md`}
                >
                  <benefit.icon className="w-7 h-7 text-[#415444]" />
                </div>
                <div>
                  <h3 className="text-lg text-[#415444] font-bold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-[#415444]/70 font-medium">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Testimonial */}
        <div className="relative z-10">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-2xl">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-[#415444] fill-[#415444]" />
              ))}
            </div>
            <p className="text-lg text-[#415444] mb-5 leading-relaxed italic font-medium">
              "The quality is exceptional and the designs are timeless. Best purchase I've made this year! The customer
              service is outstanding."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#415444] to-[#2d3b2f] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                SM
              </div>
              <div>
                <div className="font-bold text-[#415444] text-lg">Sarah Mitchell</div>
                <div className="text-sm text-[#415444]/70 font-medium flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Verified Customer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}