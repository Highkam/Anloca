"use client"

import { Bell, Home, LogOut, Mail, Search, Settings, ShoppingBag, User2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useCallback, useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/core/ui/avatar"
import { Button } from "@/core/ui/button"
import { Card, CardContent } from "@/core/ui/card"
import { Input } from "@/core/ui/input"
import { Separator } from "@/core/ui/separator"
import { toast } from "@/core/hooks/use-toast"
import { useCart } from "@/core/cart/cart-context"

export default function CartPage() {
  const { cartItems, updateQuantity, calculateTotal } = useCart()

  const cartTotal = calculateTotal()
  const shippingCost = 0
  const tax = cartTotal * 0.08

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
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-gray-900"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#A564D3] to-[#B66EE8] px-3 py-2 text-white transition-colors shadow-md"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#A564D3] text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
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
            <h2 className="text-2xl font-semibold">My Shopping Cart</h2>
            <p className="text-gray-500">{cartItems.length} items in your cart</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input className="w-64 pl-10" placeholder="Search products" />
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

        <div className="grid grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="col-span-2 space-y-6">
            {cartItems.map((item) => (
              <Card key={item.id} className="border-0 rounded-[24px] bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={150}
                      height={150}
                      className="h-[150px] w-[150px] rounded-2xl bg-[#e0e5ce] object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                          <p className="text-sm text-black font-medium">SIZE: {item.size}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, -item.quantity)}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 18L18 6M6 6L18 18"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="flex items-center gap-4 bg-gradient-to-r from-[#FFC9FF]/20 to-[#FFCEFF]/20 rounded-full px-5 py-2 border border-[#E498FF]/30">
                          <button
                            className="text-[#A564D3] hover:text-[#B66EE8] text-xl font-semibold transition-colors"
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-[#A564D3]">{item.quantity}</span>
                          <button
                            className="text-[#A564D3] hover:text-[#B66EE8] text-xl font-semibold transition-colors"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                        <p className="text-2xl font-bold text-[#A564D3]">$ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="col-span-1">
            <Card className="border-0 rounded-[24px] bg-gradient-to-br from-[#A564D3] to-[#F2A8FF] sticky top-8 shadow-lg">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-semibold text-white">Order Summary</h3>
                <Separator className="bg-white/20" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-white/90">Subtotal</p>
                    <p className="font-semibold text-white">$ {cartTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white/90">Shipping</p>
                    <p className="text-green-200 font-semibold">FREE</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white/90">Tax (8%)</p>
                    <p className="font-semibold text-white">$ {tax.toFixed(2)}</p>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex items-center justify-between text-lg">
                    <p className="font-semibold text-white">Total</p>
                    <p className="text-2xl font-bold text-white">$ {(cartTotal + tax).toFixed(2)}</p>
                  </div>
                </div>
                <Button className="w-full bg-white text-[#A564D3] hover:bg-white/90 hover:text-[#B66EE8] rounded-2xl h-14 text-lg font-semibold transition-colors shadow-md">
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-2xl h-14 text-lg font-semibold border-2 border-white bg-white/20 text-white hover:bg-white hover:text-[#A564D3] transition-all duration-200 shadow-md"
                  asChild
                >
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
