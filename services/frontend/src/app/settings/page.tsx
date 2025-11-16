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

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(true)

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

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
            className="flex items-center gap-3 rounded-lg bg-[#e0e5ce] px-3 py-2 text-[#415444] transition-colors"
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
            <h2 className="text-2xl font-semibold">Settings</h2>
            <p className="text-gray-500">Manage your account preferences</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input className="w-64 pl-10" placeholder="Search settings" />
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
                  <Input id="firstName" defaultValue="Dollar" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Smith" className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="dollar@example.com" className="rounded-xl" />
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
              <Button className="bg-[#415444] hover:bg-[#415444]/90 rounded-xl">Update Password</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-0 rounded-[24px] bg-[#e0e5ce]">
            <CardHeader>
              <CardTitle className="text-xl">Notification Preferences</CardTitle>
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
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" className="rounded-xl px-8">
              Cancel
            </Button>
            <Button className="bg-[#415444] hover:bg-[#415444]/90 rounded-xl px-8" onClick={handleSaveSettings}>
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
