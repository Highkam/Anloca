"use client"

import { useState } from 'react'
import { Bell, Home, LogOut, Mail, MapPin, Phone, Search, Settings, ShoppingBag, User2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from "@/core/ui/avatar"
import { Button } from "@/core/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card"
import { Input } from "@/core/ui/input"
import { Separator } from "@/core/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/core/ui/dialog"
import { useCart } from "@/core/cart/cart-context"
import { useAuth } from '@/infraestructure/auth/auth-provider'

export default function ProfilePage() {
  return <ProfileContent />
}

function ProfileContent() {
  const [showAuthRequired, setShowAuthRequired] = useState(false)
  const { cartItems } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const handleProtectedRoute = (route: string) => {
    if (!isAuthenticated) {
      setShowAuthRequired(true)
      return
    }
    router.push(route)
  }
  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 403.98,
      items: 2,
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "In Transit",
      total: 221.99,
      items: 1,
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Processing",
      total: 189.99,
      items: 1,
    },
  ]

  return (
    <>
    <div className="flex min-h-screen bg-[#fcfdfd]">
      {/* Sidebar */}
      <aside className="w-50 border-r px-6 py-8 bg-[#f8f9fa]/95 sticky top-0 h-screen">
        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={200}
            height={60}
            className="h-28 w-auto"
          />
        </div>
        <nav className="space-y-6">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-[#A564D3] hover:bg-[#FFC9FF]/20"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#A564D3] to-[#B66EE8] px-3 py-2 text-white transition-colors shadow-md"
          >
            <User2 className="h-5 w-5" />
            Profile
          </Link>
          <button
            onClick={() => handleProtectedRoute('/settings')}
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-[#A564D3] hover:bg-[#FFC9FF]/20 w-full text-left"
          >
            <Settings className="h-5 w-5" />
            Settings
          </button>
          <Link
            href="/cart"
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-[#A564D3] hover:bg-[#FFC9FF]/20"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#B66EE8] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
            My Cart
          </Link>
          <button
            onClick={() => handleProtectedRoute('/support')}
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-[#A564D3] hover:bg-[#FFC9FF]/20 w-full text-left"
          >
            <User2 className="h-5 w-5" />
            Support
          </button>
          <Link
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-red-500 transition-colors hover:text-red-600 hover:bg-red-50"
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
            <h2 className="text-2xl font-semibold">My Profile</h2>
            <p className="text-gray-500">View and manage your account details</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input className="w-64 pl-10" placeholder="Search" />
            </div>
            <Button size="icon" variant="ghost" className="hover:bg-[#FFC9FF]/20 text-gray-600 hover:text-[#A564D3]">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="/images/dd.jpeg"
                alt="User avatar"
              />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="grid gap-6 max-w-5xl">
          {/* Profile Header */}
          <Card className="border-0 rounded-[24px] bg-gradient-to-br from-[#D689FF] to-[#A564D3] shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start gap-8">
                <Avatar className="w-32 h-32 ring-4 ring-white/50">
                  <AvatarImage
                    src="/images/dd.jpeg"
                    alt="User avatar"
                  />
                  <AvatarFallback>NA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-semibold mb-2 text-white">Name User</h3>
                      <p className="text-white/90">Member since January 2024</p>
                    </div>
                    <Button className="bg-white text-[#A564D3] hover:bg-white/90 hover:text-[#B66EE8] rounded-xl transition-colors shadow-md">
                      Edit Profile
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-6 mt-6">
                    <div className="bg-white rounded-2xl p-4">
                      <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                      <p className="text-2xl font-bold text-[#A564D3]">24</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4">
                      <p className="text-gray-600 text-sm mb-1">Total Spent</p>
                      <p className="text-2xl font-bold text-[#A564D3]">$2,847</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4">
                      <p className="text-gray-600 text-sm mb-1">Loyalty Points</p>
                      <p className="text-2xl font-bold text-[#A564D3]">1,240</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card className="border-0 rounded-[24px] bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-[#A564D3] to-[#A564D3] rounded-full p-3">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">dollar@example.com</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-[#A564D3] to-[#A564D3] rounded-full p-3">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold">+1 (555) 123-4567</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-[#A564D3] to-[#A564D3] rounded-full p-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold">123 Fashion Street, NY 10001</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="border-0 rounded-[24px] bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Shipping Address</CardTitle>
                  <Button variant="ghost" size="sm" className="text-[#A564D3] hover:bg-[#FFC9FF]/20 hover:text-[#B66EE8]">Edit</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold mb-1">Name User</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    123 Fashion Street<br />
                    Apartment 4B<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
                <Separator />
                <Button variant="outline" className="w-full rounded-xl border-[#A564D3] text-[#A564D3] hover:bg-[#A564D3] hover:text-white transition-colors">
                  Add New Address
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="border-0 rounded-[24px] bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Recent Orders</CardTitle>
                <Button variant="link" className="text-[#A564D3] hover:text-[#B66EE8] hover:no-underline">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FFC9FF]/10 to-[#FFCEFF]/10 rounded-2xl hover:from-[#E498FF]/20 hover:to-[#F2A8FF]/20 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-[#E498FF] to-[#F2A8FF] rounded-xl p-4">
                        <ShoppingBag className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.items} items • {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Total</p>
                        <p className="font-semibold text-lg">$ {order.total.toFixed(2)}</p>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "In Transit"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl border-[#A564D3] text-[#A564D3] hover:bg-[#A564D3] hover:text-white transition-colors">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        </main>
      </div>
      
      {/* Auth Required Dialog */}
      <Dialog open={showAuthRequired} onOpenChange={setShowAuthRequired}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription>
              You need to sign in to access this feature.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={() => router.push('/login')}
              className="flex-1 bg-gradient-to-r from-[#A564D3] to-[#B66EE8] hover:from-[#B66EE8] hover:to-[#C879FF] text-white"
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAuthRequired(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}