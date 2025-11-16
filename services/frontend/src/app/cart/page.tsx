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

interface CartItem {
  id: string
  name: string
  price: number
  size: string
  quantity: number
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Monocle Canvas Tote Bag",
      price: 213.99,
      size: "L",
      quantity: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Best%20Media%20Tote%20Bags,%20Ranked.jpg-z2O2nGPSTrjey8xEM1cc5aTI2ggjXE.jpeg",
    },
    {
      id: "2",
      name: "Square One District Tote",
      price: 189.99,
      size: "M",
      quantity: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Index,%20Vanderbrand.jpg-Fv7HHkBaQgZe7HG3hbz5aojPoFRIuo.jpeg",
    },
  ])

  const updateQuantity = useCallback((itemId: string, change: number) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) => {
            if (item.id === itemId) {
              const newQuantity = Math.max(0, item.quantity + change)
              if (newQuantity === 0) {
                toast({
                  title: "Item removed",
                  description: `${item.name} has been removed from your cart.`,
                })
                return null
              }
              return { ...item, quantity: newQuantity }
            }
            return item
          })
          .filter(Boolean) as CartItem[],
    )
  }, [])

  const calculateTotal = useCallback((items: CartItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [])

  const cartTotal = calculateTotal(cartItems)
  const shippingCost = 0
  const tax = cartTotal * 0.08

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
            className="flex items-center gap-3 rounded-lg bg-[#e0e5ce] px-3 py-2 text-[#415444] transition-colors"
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
            <h2 className="text-2xl font-semibold">My Shopping Cart</h2>
            <p className="text-gray-500">{cartItems.length} items in your cart</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input className="w-64 pl-10" placeholder="Search products" />
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
                          <p className="text-sm text-[#338838]">SIZE: {item.size}</p>
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
                        <div className="flex items-center gap-4 bg-[#f7f7f7] rounded-full px-5 py-2">
                          <button
                            className="text-gray-500 hover:text-gray-700 text-xl"
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            className="text-gray-500 hover:text-gray-700 text-xl"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                        <p className="text-2xl font-bold text-[#338838]">$ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="col-span-1">
            <Card className="border-0 rounded-[24px] bg-[#e0e5ce] sticky top-8">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-semibold">$ {cartTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p className="text-[#338838] font-semibold">FREE</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Tax (8%)</p>
                    <p className="font-semibold">$ {tax.toFixed(2)}</p>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-lg">
                    <p className="font-semibold">Total</p>
                    <p className="text-2xl font-bold text-[#338838]">$ {(cartTotal + tax).toFixed(2)}</p>
                  </div>
                </div>
                <Button className="w-full bg-[#415444] hover:bg-[#415444]/90 rounded-2xl h-14 text-lg font-semibold">
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-2xl h-14 text-lg font-semibold"
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
