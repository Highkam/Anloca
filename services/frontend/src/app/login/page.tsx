"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/core/ui/button"
import { Input } from "@/core/ui/input"
import { Label } from "@/core/ui/label"
import { Checkbox } from "@/core/ui/checkbox"
import Link from "next/link"
import { ArrowRight, ArrowLeft, ShoppingBag, Star, Check, Sparkles, Gift, Truck, Shield } from "lucide-react"
import Image from "next/image"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  
  // Register form state
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  })

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[Auth] Login attempt:", { email, password, rememberMe })
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 2) {
      setStep(2)
    } else {
      console.log("[Auth] Register attempt:", formData)
    }
  }

  const benefits = [
    {
      icon: Gift,
      title: "Welcome Gift",
      description: "Get 15% off your first order",
      color: "from-[#a564d3]/30 to-[#b66ee8]/20",
    },
    {
      icon: Truck,
      title: "Free Shipping", 
      description: "On all orders, no minimum",
      color: "from-[#c879ff]/30 to-[#d689ff]/20",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data is always protected", 
      color: "from-[#e498ff]/30 to-[#f2a8ff]/20",
    },
    {
      icon: Sparkles,
      title: "Early Access",
      description: "Be first to shop new collections",
      color: "from-[#ffc4ff]/30 to-[#ffc9ff]/20",
    },
  ]

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#D689FF] via-[#B66EE8] to-[#A564D3] overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-[#f2a8ff]/30 to-[#ffc4ff]/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#e498ff]/25 to-[#d689ff]/15 blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#c879ff]/15 to-[#ffb7ff]/10 blur-2xl" />
          <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-gradient-to-br from-[#ffc9ff]/20 to-[#ffceff]/15 blur-2xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-[#ffb7ff]/25 to-[#f2a8ff]/20 blur-2xl animate-pulse delay-500" />
        </div>

        {/* Decorative Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffc9ff 1px, transparent 1px),
              linear-gradient(to bottom, #ffceff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Product Images */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[6%] right-16 w-80 h-80 rounded-2xl bg-gradient-to-br from-[#FFCEFF]/70 to-[#ffceff]/60 backdrop-blur-md p-4 shadow-2xl animate-float border border-[#ffb7ff]/40">
            <Image
              src="images/fashion.jpg"
              alt="fashion"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
            </div>
          <div className="absolute top-[14%] left-20 w-60 h-60 rounded-2xl bg-gradient-to-br from-[#f2a8ff]/70 to-[#ffc4ff]/60 backdrop-blur-md p-3 shadow-2xl animate-float-delayed border border-[#e498ff]/40">
            <Image
              src="images/items-varios.jpeg"
              alt="Items varios"
              width={240}
              height={240}
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Logo with Glow Effect */}
        <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#a564d3] to-[#b66ee8] rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <Image
                  src="/images/logo.png"
                  alt="Store Logo"
                  width={80}
                  height={27}
                  className="relative z-10 group-hover:scale-110 transition-all"
                />
              </div>
            </Link>
        </div>

        {/* Hero Content with Enhanced Typography */}
        <div className="relative z-10 space-y-8 mt-72">
          <div className="space-y-6">
            {/* Decorative Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ffc9ff]/90 to-[#ffceff]/90 backdrop-blur-md rounded-full border border-[#ffb7ff]/60 shadow-lg">
              <Sparkles className="w-4 h-4 text-[#a564d3]" />
              <span className="text-sm font-semibold text-[#a564d3]">Premium Quality Since 2025</span>
            </div>

            <h1 className="text-6xl text-white leading-tight text-balance font-bold drop-shadow-lg">
              Shop essentials that matter{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#ffc9ff]">in every form.</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#ffceff]/60 -rotate-1 rounded-sm" />
              </span>
            </h1>
            <p className="text-xl text-[#ffc4ff] leading-relaxed max-w-lg text-pretty drop-shadow-md">
              Join thousands of customers who have found the perfect blend of functionality, variety, and timeless style
            </p>
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="flex flex-col gap-6 pt-4">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-11 h-11 rounded-full border-3 border-[#f4cd69] bg-gradient-to-br from-[#d897f8] to-[#ffc4ff] flex items-center justify-center text-[#a564d3] text-xs font-bold shadow-lg"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-white font-semibold drop-shadow-md">
                  <div className="text-2xl font-bold text-[#ffc9ff]">10k+</div>
                  <div className="text-xs text-[#ffb7ff]">happy customers</div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-[#f7de9a] text-[#f4cd69] drop-shadow-sm" />
                  ))}
                </div>
                <span className="text-sm text-[#ffb7ff] font-semibold drop-shadow-md">4.9/5 from 2,500 reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Product Preview Card */}
        <div className="relative z-10">
          <div className="bg-gradient-to-br from-[#FFCEFF]/90 to-[#FFCEFF]/80 backdrop-blur-xl rounded-3xl p-6 border border-[#d689ff]/70 shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 bg-gradient-to-br from-[#c879ff]/60 to-[#b66ee8]/50 rounded-2xl flex items-center justify-center relative overflow-hidden border-2 border-[#a564d3]/40">
                <div className="absolute inset-0 bg-cover opacity-10" />
                <ShoppingBag className="w-12 h-12 text-white relative z-10 drop-shadow-md" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#a564d3] to-[#b66ee8] text-white text-xs font-bold rounded-full mb-2 shadow-md">
                  BESTSELLER
                </div>
                <h3 className="text-xl text-white font-bold mb-1 drop-shadow-md">Premium Canvas Tote</h3>
                <p className="text-sm text-[#A564D3] font-medium drop-shadow-sm">Free shipping on orders over $50</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 lg:p-12 bg-gradient-to-br from-[#f8f6ff] to-[#f3efff] relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A564D3]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b66ee8]/10 rounded-full blur-3xl" />

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-[#a564d3] to-[#b66ee8] rounded-xl shadow-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl text-[#a564d3] font-semibold">Tote Store</span>
          </div>

          {/* Auth Mode Toggle */}
          <div className="flex p-1 bg-gradient-to-r from-[#f2a8ff]/20 to-[#ffc4ff]/20 backdrop-blur-sm rounded-lg mb-6 border border-[#e498ff]/30">
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all ${
                isLogin ? "bg-gradient-to-r from-[#a564d3] to-[#b66ee8] shadow-md text-white" : "text-[#c879ff] hover:text-[#a564d3] hover:bg-[#f2a8ff]/20"
              }`}
              onClick={() => {setIsLogin(true); setStep(1)}}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all ${
                !isLogin ? "bg-gradient-to-r from-[#a564d3] to-[#b66ee8] shadow-md text-white" : "text-[#c879ff] hover:text-[#a564d3] hover:bg-[#f2a8ff]/20"
              }`}
              onClick={() => {setIsLogin(false); setStep(1)}}
            >
              Create Account
            </button>
          </div>

          {/* Enhanced Header */}
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-[#c879ff]/20 backdrop-blur-sm rounded-full border border-[#a564d3]/20">
              <span className="text-sm font-semibold text-[#a564d3]">
                {isLogin ? "Welcome Back" : "Start Your Journey"}
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl text-foreground leading-tight text-balance font-bold">
              {isLogin ? "Sign in to continue" : (step === 1 ? "Join our community" : "Almost there!")}
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              {isLogin 
                ? "Access your personalized shopping experience and exclusive member benefits"
                : (step === 1 
                  ? "Create your account and unlock exclusive member benefits" 
                  : "Complete your account setup to start shopping")}
            </p>
          </div>

          {/* Register Progress Indicator */}
          {!isLogin && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className={step >= 1 ? "text-[#415444]" : "text-muted-foreground"}>
                  {step === 1 ? "→ Personal Info" : "✓ Personal Info"}
                </span>
                <span className={step >= 2 ? "text-[#415444]" : "text-muted-foreground"}>
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
          )}

          {/* Enhanced Social Login Buttons */}
          {(isLogin || (!isLogin && step === 1)) && (
            <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 border-2 hover:border-[#415444] hover:bg-[#415444]/5 transition-all bg-white shadow-sm hover:shadow-md"
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
              className="w-full h-14 border-2 hover:border-[#415444] hover:bg-[#415444]/5 transition-all bg-white shadow-sm hover:shadow-md"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="font-semibold">Apple</span>
            </Button>
            </div>
          )}

          {/* Enhanced Divider */}
          {(isLogin || (!isLogin && step === 1)) && (
            <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t-2 border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gradient-to-br from-[#f8f6ff] to-[#f3efff] px-6 py-2 text-muted-foreground font-semibold rounded-full border border-border shadow-sm">
                Or continue with email
              </span>
            </div>
            </div>
          )}

          {/* Enhanced Auth Forms */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-14 text-base border-2 focus:border-[#415444] shadow-sm bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-base font-semibold">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#415444] hover:underline font-semibold hover:text-[#2d3b2f]"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-14 text-base border-2 focus:border-[#415444] shadow-sm bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-3 py-2">
              <Checkbox id="remember" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(!!checked)} />
              <label htmlFor="remember" className="text-base font-medium leading-none cursor-pointer">
                Keep me signed in for 30 days
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-[#a564d3] to-[#b66ee8] hover:from-[#b66ee8] hover:to-[#c879ff] text-base font-bold group shadow-lg hover:shadow-xl transition-all"
            >
              Sign in to your account
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
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
                        className="h-14 text-base border-2 focus:border-[#415444] shadow-sm bg-white"
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
                        className="h-14 text-base border-2 focus:border-[#415444] shadow-sm bg-white"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerEmail" className="text-base font-semibold">
                      Email address
                    </Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="name@example.com"
                      className="h-14 text-base border-2 focus:border-[#415444] shadow-sm bg-white"
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
                    <Label htmlFor="registerPassword" className="text-base font-semibold">
                      Create password
                    </Label>
                    <Input
                      id="registerPassword"
                      type="password"
                      placeholder="Minimum 8 characters"
                      className="h-14 text-base border-2 focus:border-[#415444] shadow-sm bg-white"
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
                      <Link href="/terms" className="text-[#415444] hover:underline font-bold">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#415444] hover:underline font-bold">
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
          )}

          {/* Enhanced Benefits List */}
          {isLogin && (
            <div className="pt-6 space-y-3 border-t-2 border-[#A564D3]/30">
            <p className="text-sm font-semibold text-[#c879ff] uppercase tracking-wide mb-4">Member Benefits</p>
            {[
              "Exclusive member discounts up to 30%",
              "Early access to new collections",
              "Free shipping on all orders",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-[#a564d3] to-[#b66ee8] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Check className="w-4 h-4 text-white font-bold" />
                </div>
                <span className="text-base text-black font-medium">{benefit}</span>
              </div>
              ))}
            </div>
          )}          {/* Enhanced Auth Link */}
          <div className="text-center pt-4 pb-2">
            <p className="text-base text-[#c879ff]">
              {isLogin ? (
                <>New to Handy?{" "}
                <button 
                  onClick={() => setIsLogin(false)}
                  className="text-[#a564d3] font-bold hover:underline hover:text-[#b66ee8]"
                >
                  Create an account
                </button></>
              ) : (
                <>Already have an account?{" "}
                <button 
                  onClick={() => setIsLogin(true)}
                  className="text-[#a564d3] font-bold hover:underline hover:text-[#b66ee8]"
                >
                  Sign in
                </button></>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
