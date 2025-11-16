"use client"

import { Bell, Home, LogOut, Mail, MapPin, Phone, Search, Settings, ShoppingBag, User2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/core/ui/avatar"
import { Button } from "@/core/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card"
import { Input } from "@/core/ui/input"
import { Separator } from "@/core/ui/separator"

export default function ProfilePage() {
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
            className="flex items-center gap-3 rounded-lg bg-[#e0e5ce] px-3 py-2 text-[#415444] transition-colors"
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
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-gray-900"
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
            <h2 className="text-2xl font-semibold">My Profile</h2>
            <p className="text-gray-500">View and manage your account details</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input className="w-64 pl-10" placeholder="Search" />
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
          {/* Profile Header */}
          <Card className="border-0 rounded-[24px] bg-[#e0e5ce]">
            <CardContent className="p-8">
              <div className="flex items-start gap-8">
                <Avatar className="w-32 h-32">
                  <AvatarImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-482Kz4Ro7YXPgsZnttDFsQEmrWQnhG.jpeg"
                    alt="User avatar"
                  />
                  <AvatarFallback>NA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-semibold mb-2">Dollar Smith</h3>
                      <p className="text-gray-600">Member since January 2024</p>
                    </div>
                    <Button className="bg-[#415444] hover:bg-[#415444]/90 rounded-xl">
                      Edit Profile
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-6 mt-6">
                    <div className="bg-white rounded-2xl p-4">
                      <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                      <p className="text-2xl font-bold text-[#338838]">24</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4">
                      <p className="text-gray-600 text-sm mb-1">Total Spent</p>
                      <p className="text-2xl font-bold text-[#338838]">$2,847</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4">
                      <p className="text-gray-600 text-sm mb-1">Loyalty Points</p>
                      <p className="text-2xl font-bold text-[#338838]">1,240</p>
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
                  <div className="bg-[#e0e5ce] rounded-full p-3">
                    <Mail className="h-5 w-5 text-[#415444]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">dollar@example.com</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div className="bg-[#e0e5ce] rounded-full p-3">
                    <Phone className="h-5 w-5 text-[#415444]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold">+1 (555) 123-4567</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-4">
                  <div className="bg-[#e0e5ce] rounded-full p-3">
                    <MapPin className="h-5 w-5 text-[#415444]" />
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
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold mb-1">Dollar Smith</p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    123 Fashion Street<br />
                    Apartment 4B<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
                <Separator />
                <Button variant="outline" className="w-full rounded-xl">
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
                <Button variant="link">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-[#fcfdfd] rounded-2xl hover:bg-[#e0e5ce]/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-[#e0e5ce] rounded-xl p-4">
                        <ShoppingBag className="h-6 w-6 text-[#415444]" />
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
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl">
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
  )
}
