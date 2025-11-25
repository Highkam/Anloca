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
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: Sparkles,
      title: "Early Access",
      description: "Be first to shop new collections",
      color: "from-amber-500/20 to-orange-500/20",
    },
  ]

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#e0e5ce] via-[#d4dac4] to-[#c8d0b8] overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#415444]/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#415444]/10 blur-3xl animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#415444]/5 to-transparent blur-2xl" />
        </div>

        {/* Decorative Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #415444 1px, transparent 1px),
              linear-gradient(to bottom, #415444 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Product Images */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] right-12 w-48 h-48 rounded-2xl bg-white/40 backdrop-blur-md p-4 shadow-2xl animate-float">
            <Image
              src="/elegant-beige-canvas-tote-bag-product-shot.jpg"
              alt="Tote Bag 1"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-xl"
            />
            </div>
          <div className="absolute top-[16%] left-16 w-40 h-40 rounded-2xl bg-white/40 backdrop-blur-md p-3 shadow-2xl animate-float-delayed">
            <Image
              src="/minimalist-sage-green-tote-bag.jpg"
              alt="Tote Bag 2"
              width={160}
              height={160}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Logo with Glow Effect */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-[#415444] rounded-xl group-hover:scale-110 transition-all shadow-lg relative">
              <div className="absolute inset-0 bg-[#415444] rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <ShoppingBag className="h-6 w-6 text-white relative z-10" />
            </div>
            <span className="text-2xl font-serif text-[#415444] font-semibold">Tote Store</span>
          </Link>
        </div>

        {/* Hero Content with Enhanced Typography */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-6">
            {/* Decorative Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-white/40 shadow-lg">
              <Sparkles className="w-4 h-4 text-[#415444]" />
              <span className="text-sm font-semibold text-[#415444]">Premium Quality Since 2020</span>
            </div>

            <h1 className="text-6xl font-serif text-[#415444] leading-tight text-balance font-bold">
              Carry your world in{" "}
              <span className="relative inline-block">
                <span className="relative z-10">timeless style</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#415444]/20 -rotate-1" />
              </span>
            </h1>
            <p className="text-xl text-[#415444]/80 leading-relaxed max-w-lg text-pretty">
              Join thousands of style enthusiasts who've discovered the perfect blend of functionality and elegance
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
                      className="w-11 h-11 rounded-full border-3 border-white bg-gradient-to-br from-[#415444] to-[#2d3b2f] flex items-center justify-center text-white text-xs font-bold shadow-lg"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-[#415444] font-semibold">
                  <div className="text-2xl font-bold">10k+</div>
                  <div className="text-xs opacity-80">happy customers</div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-[#415444] text-[#415444]" />
                  ))}
                </div>
                <span className="text-sm text-[#415444] font-semibold">4.9/5 from 2,500 reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Product Preview Card */}
        <div className="relative z-10">
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 bg-gradient-to-br from-[#415444]/20 to-[#415444]/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/tote-bag-icon.png')] bg-cover opacity-10" />
                <ShoppingBag className="w-12 h-12 text-[#415444] relative z-10" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-[#415444] text-white text-xs font-bold rounded-full mb-2">
                  BESTSELLER
                </div>
                <h3 className="font-serif text-xl text-[#415444] font-bold mb-1">Premium Canvas Tote</h3>
                <p className="text-sm text-[#415444]/70 font-medium">Free shipping on orders over $50</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8 lg:p-12 bg-gradient-to-br from-[#fefdfb] to-[#f9f7f4] relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e0e5ce]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#415444]/5 rounded-full blur-3xl" />

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="p-2 bg-[#415444] rounded-xl shadow-lg">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-serif text-[#415444] font-semibold">Tote Store</span>
          </div>

          {/* Auth Mode Toggle */}
          <div className="flex p-1 bg-muted rounded-lg mb-6">
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all ${
                isLogin ? "bg-white shadow-sm text-[#415444]" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => {setIsLogin(true); setStep(1)}}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all ${
                !isLogin ? "bg-white shadow-sm text-[#415444]" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => {setIsLogin(false); setStep(1)}}
            >
              Create Account
            </button>
          </div>

          {/* Enhanced Header */}
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-[#e0e5ce]/50 backdrop-blur-sm rounded-full border border-[#415444]/10">
              <span className="text-sm font-semibold text-[#415444]">
                {isLogin ? "Welcome Back" : "Start Your Journey"}
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-serif text-foreground leading-tight text-balance font-bold">
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
                  className={`h-2.5 flex-1 rounded-full transition-all shadow-sm ${step >= 1 ? "bg-[#415444]" : "bg-muted"}`}
                />
                <div
                  className={`h-2.5 flex-1 rounded-full transition-all shadow-sm ${step >= 2 ? "bg-[#415444]" : "bg-muted"}`}
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
              <span className="bg-gradient-to-br from-[#fefdfb] to-[#f9f7f4] px-6 py-2 text-muted-foreground font-semibold rounded-full border border-border shadow-sm">
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
              className="w-full h-14 bg-[#415444] hover:bg-[#2d3b2f] text-base font-bold group shadow-lg hover:shadow-xl transition-all"
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

                  <div className="flex items-start space-x-3 p-5 bg-[#e0e5ce]/30 backdrop-blur-sm rounded-xl border border-[#415444]/10">
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
                  className="flex-1 h-14 bg-[#415444] hover:bg-[#2d3b2f] text-base font-bold group shadow-lg hover:shadow-xl transition-all"
                >
                  {step === 1 ? "Continue to next step" : "Create my account"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          )}

          {/* Enhanced Benefits List */}
          {isLogin && (
            <div className="pt-6 space-y-3 border-t-2 border-[#e0e5ce]/50">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Member Benefits</p>
            {[
              "Exclusive member discounts up to 30%",
              "Early access to new collections",
              "Free shipping on all orders",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e0e5ce] flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Check className="w-4 h-4 text-[#415444] font-bold" />
                </div>
                <span className="text-base text-muted-foreground font-medium">{benefit}</span>
              </div>
              ))}
            </div>
          )}          {/* Enhanced Auth Link */}
          <div className="text-center pt-4 pb-2">
            <p className="text-base text-muted-foreground">
              {isLogin ? (
                <>New to Anloca?{" "}
                <button 
                  onClick={() => setIsLogin(false)}
                  className="text-[#415444] font-bold hover:underline hover:text-[#2d3b2f]"
                >
                  Create an account
                </button></>
              ) : (
                <>Already have an account?{" "}
                <button 
                  onClick={() => setIsLogin(true)}
                  className="text-[#415444] font-bold hover:underline hover:text-[#2d3b2f]"
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
