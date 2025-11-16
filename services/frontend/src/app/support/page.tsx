"use client"

import { Bell, ChevronDown, Home, LogOut, Mail, MessageCircle, Phone, Search, Settings, ShoppingBag, User2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/core/ui/avatar"
import { Button } from "@/core/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card"
import { Input } from "@/core/ui/input"
import { Label } from "@/core/ui/label"
import { Textarea } from "@/core/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/core/ui/accordion"
import { toast } from "@/core/hooks/use-toast"

export default function SupportPage() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmitTicket = () => {
    if (!subject || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      })
      return
    }
    
    toast({
      title: "Ticket Submitted",
      description: "We'll get back to you within 24 hours.",
    })
    setSubject("")
    setMessage("")
  }

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by going to 'My Cart' and clicking on your order number. You'll see real-time updates on your shipment status.",
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all items. Products must be in original condition with tags attached. Contact our support team to initiate a return.",
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days. Express shipping is available and takes 2-3 business days. Free shipping is included on all orders.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping times vary by location, typically 7-14 business days.",
    },
    {
      question: "How can I change my shipping address?",
      answer: "You can update your shipping address in the Profile section before placing an order. For orders already placed, contact support immediately.",
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#fcfdfd]">
      {/* Sidebar */}
      <aside className="w-64 border-r px-6 py-8">
        <div className="mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fs-OQzXWiKsdo0mSCzNZyZmZHXxrCi0Bp.png"
            alt="Fashion Store"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
        </div>
        <nav className="space-y-6">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-gray-900"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-gray-900"
          >
            <User2 className="h-5 w-5" />
            Profile
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-gray-900"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-gray-900"
          >
            <Mail className="h-5 w-5" />
            Message
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-gray-900"
          >
            <ShoppingBag className="h-5 w-5" />
            My Cart
          </Link>
          <Link
            href="/support"
            className="flex items-center gap-3 rounded-lg bg-[#e0e5ce] px-3 py-2 text-[#415444] transition-colors"
          >
            <User2 className="h-5 w-5" />
            Support
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-red-500 transition-colors hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Support Center</h2>
            <p className="text-gray-500">Get help with your orders and account</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input className="w-64 pl-10" placeholder="Search for help" />
            </div>
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-482Kz4Ro7YXPgsZnttDFsQEmrWQnhG.jpeg"
                alt="User avatar"
              />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="grid gap-6 max-w-5xl">
          {/* Quick Contact Options */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="border-0 rounded-[24px] bg-[#e0e5ce] hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-[#415444]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
                <Button className="bg-[#415444] hover:bg-[#415444]/90 w-full rounded-xl">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 rounded-[24px] bg-white hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-[#e0e5ce] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-[#415444]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email Support</h3>
                <p className="text-sm text-gray-600 mb-4">support@fashionstore.com</p>
                <Button variant="outline" className="w-full rounded-xl">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 rounded-[24px] bg-white hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-[#e0e5ce] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-[#415444]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
                <p className="text-sm text-gray-600 mb-4">1-800-FASHION</p>
                <Button variant="outline" className="w-full rounded-xl">
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Submit a Ticket */}
          <Card className="border-0 rounded-[24px] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Submit a Support Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What do you need help with?"
                  className="rounded-xl"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue in detail..."
                  className="rounded-xl min-h-[150px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button
                className="bg-[#415444] hover:bg-[#415444]/90 rounded-xl px-8"
                onClick={handleSubmitTicket}
              >
                Submit Ticket
              </Button>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="border-0 rounded-[24px] bg-[#e0e5ce]">
            <CardHeader>
              <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white rounded-xl px-6 border-0"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
