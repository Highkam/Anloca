"use client"

import { Bell, Home, LogOut, Mail, Search, Settings, ShoppingBag, User2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/core/ui/avatar"
import { Button } from "@/core/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card"
import { Input } from "@/core/ui/input"
import { Label } from "@/core/ui/label"
import { Switch } from "@/core/ui/switch"
import { Separator } from "@/core/ui/separator"
import { toast } from "@/core/hooks/use-toast"
import { useCart } from "@/core/cart/cart-context"
import { AuthGuard } from "@/components/auth/AuthGuard"

function SettingsContent() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(true)
  const { cartItems } = useCart()

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="flex min-h-screen bg-[#fcfdfd]">
      {/* Sidebar */}
      <aside className="w-50 border-r px-6 py-8 bg-[#f8f9fa]/95 sticky top-0 h-screen">
        <div className="mb-8">
          <Image
            src="/images/anloca-logo.svg"
            alt="Anloca"
            width={200}
            height={60}
            className="h-20 w-auto"
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
            className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#A564D3] to-[#B66EE8] px-3 py-2 text-white transition-colors shadow-md"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
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
          <Link
            href="/support"
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-[#A564D3] hover:bg-[#FFC9FF]/20"
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
            <h2 className="text-2xl font-semibold">Settings</h2>
            <p className="text-gray-500">Manage your account preferences</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input className="w-64 pl-10" placeholder="Search settings" />
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

        <div className="grid gap-6 max-w-4xl">
          {/* Account Settings */}
          <Card className="border-0 rounded-[24px] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Name" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="User" className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="name@example.com" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="rounded-xl" />
              </div>
            </CardContent>
          </Card>

          {/* Password Settings */}
          <Card className="border-0 rounded-[24px] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" className="rounded-xl" />
              </div>
              <Button className="bg-gradient-to-r from-[#A564D3] to-[#B66EE8] hover:from-[#B66EE8] hover:to-[#C879FF] text-white rounded-xl transition-all duration-200">Update Password</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-0 rounded-[24px] bg-gradient-to-br from-[#FFC9FF]/20 to-[#FFCEFF]/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-[#A564D3]">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="emailNotif" className="text-base font-semibold">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-600">Receive order updates and news via email</p>
                </div>
                <Switch
                  id="emailNotif"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#A564D3] data-[state=checked]:to-[#B66EE8] data-[state=unchecked]:bg-gray-200"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="pushNotif" className="text-base font-semibold">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-gray-600">Get alerts about your orders and promotions</p>
                </div>
                <Switch
                  id="pushNotif"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#A564D3] data-[state=checked]:to-[#B66EE8] data-[state=unchecked]:bg-gray-200"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="marketing" className="text-base font-semibold">
                    Marketing Emails
                  </Label>
                  <p className="text-sm text-gray-600">Receive promotional offers and discounts</p>
                </div>
                <Switch
                  id="marketing"
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#A564D3] data-[state=checked]:to-[#B66EE8] data-[state=unchecked]:bg-gray-200"
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" className="rounded-xl px-8 border-[#A564D3] text-[#A564D3] hover:bg-[#A564D3] hover:text-white transition-colors">
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-[#A564D3] to-[#B66EE8] hover:from-[#B66EE8] hover:to-[#C879FF] text-white rounded-xl px-8 transition-all duration-200" onClick={handleSaveSettings}>
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsContent />
    </AuthGuard>
  )
}
