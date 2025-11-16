"use client"

import { Bell, Home, LogOut, Search, Settings, ShoppingBag, User2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/core/ui/avatar"
import { Button } from "@/core/ui/button"
import { Card, CardContent, CardHeader } from "@/core/ui/card"
import { Input } from "@/core/ui/input"
import { Separator } from "@/core/ui/separator"
import { useCart } from "@/core/cart/cart-context"

export default function Component() {
  const { cartItems, addToCart, updateQuantity, calculateTotal, isCartOpen, setIsCartOpen } = useCart()

  const popularItems = [
    {
      id: "1",
      name: "Monocle Canvas Tote Bag",
      price: 213.99,
      rating: 4.9,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Best%20Media%20Tote%20Bags,%20Ranked.jpg-z2O2nGPSTrjey8xEM1cc5aTI2ggjXE.jpeg",
    },
    {
      id: "2",
      name: "Square One District Tote",
      price: 189.99,
      rating: 4.9,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Index,%20Vanderbrand.jpg-Fv7HHkBaQgZe7HG3hbz5aojPoFRIuo.jpeg",
    },
    {
      id: "3",
      name: "Sporty & Rich Canvas Tote",
      price: 221.99,
      rating: 4.9,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(2).jpg-zbeT25jMphcVf4DmpAlTVsGALg88Zn.jpeg",
    },
  ]

  const cartTotal = calculateTotal()

  return (
    <div className="flex min-h-screen bg-[#fcfdfd]">
      {/* Sidebar */}
      <aside className="w-50 border-r px-6 py-8 bg-[#f8f9fa]/95">
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
            className="flex items-center gap-3 rounded-lg bg-[#a656bc] px-3 py-2 text-white transition-colors"
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
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-gray-900 w-full text-left"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#a656bc] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
            My Cart
          </button>
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
            <h2 className="text-2xl font-semibold">
              Hi, User! <span className="ml-1"></span>
            </h2>
            <p className="text-gray-500">Welcome Back</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input className="w-64 pl-10" placeholder="Search for bags" />
            </div>
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#a656bc] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
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

        <div className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularItems.map((item, index) => (
              <Card key={item.id} className="overflow-hidden border-0 rounded-3xl shadow-sm bg-white">
                <div className="aspect-square p-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover rounded-2xl"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-orange-400">★★★★★</span>
                      <span className="text-sm text-gray-500">({item.rating})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${item.price}</span>
                    <Button
                      onClick={() => addToCart(item)}
                      className="bg-[#415444] hover:bg-[#415444]/90 rounded-xl px-6"
                    >
                      Add To Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <aside className="fixed top-0 right-0 w-80 bg-white shadow-lg h-full z-50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">My Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(false)}
              className="rounded-full"
            >
              ✕
            </Button>
          </div>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-[#f7f7f7] rounded-2xl p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-gray-600 text-xs">Size: {item.size}</p>
                  <p className="font-semibold text-sm mt-1">${item.price}</p>
                  <div className="flex items-center gap-4 bg-[#f7f7f7] rounded-full px-4 py-1 mt-2 w-fit">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-base">
              <p className="text-gray-600">Sub Total</p>
              <p className="font-semibold">$ {cartTotal.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between text-base">
              <p className="text-gray-600">Shipping</p>
              <p className="text-[#338838]">FREE</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-lg font-semibold">
              <p>Total</p>
              <p>$ {cartTotal.toFixed(2)}</p>
            </div>
            <Button className="w-full bg-[#415444] hover:bg-[#415444]/90 rounded-2xl h-14 text-lg font-semibold mt-4">
              Checkout
            </Button>
          </div>
        </aside>
      )}
    </div>
  )
}