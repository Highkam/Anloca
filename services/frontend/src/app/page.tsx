"use client"

import { useState, useEffect } from 'react'
import { Bell, Home, LogOut, Package, Search, Settings, ShoppingBag, User2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/core/ui/avatar"
import { Button } from "@/core/ui/button"
import { Card, CardContent, CardHeader } from "@/core/ui/card"
import { Input } from "@/core/ui/input"
import { Separator } from "@/core/ui/separator"
import { useCart } from "@/core/cart/cart-context"
import { useAuth } from "@/core/auth/auth-context"
import { useFrequentOrders } from "@/core/hooks/use-frequent-orders"
import { AuthGuard } from "@/components/auth/AuthGuard"

export default function Component() {
  const { cartItems, addToCart, updateQuantity, calculateTotal, isCartOpen, setIsCartOpen } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const { frequentOrders, loading: ordersLoading } = useFrequentOrders()
  
  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])

  // Solo mostrar órdenes frecuentes para usuarios autenticados
  const displayFrequentOrders = isAuthenticated ? frequentOrders : []

  const popularItems = [
    {
      id: "1",
      name: "Wireless Bluetooth Earbuds",
      description: "High-quality wireless earbuds with noise cancellation and long battery life.",
      category: "Electronics",
      price: 79.99,
      rating: 4.8,
      image: "/images/airbuds.png",
    },
    {
      id: "2",
      name: "Stainless Steel Water Bottle",
      description: "Insulated water bottle that keeps drinks cold for 24 hours.",
      category: "Sports & Outdoors",
      price: 24.99,
      rating: 4.7,
      image: "/images/waterbottle.png",
    },
    {
      id: "3",
      name: "Dog Food - Premium Kibble",
      description: "Nutritious premium dog food with real chicken and vegetables.",
      category: "Pet Supplies",
      price: 45.99,
      rating: 4.9,
      image: "/images/dogfood.png",
    },
    {
      id: "4",
      name: "Non-Stick Frying Pan Set",
      description: "Professional-grade non-stick cookware set for healthy cooking.",
      category: "Kitchen",
      price: 89.99,
      rating: 4.8,
      image: "/images/fryingpans.png",
    },
    {
      id: "5",
      name: "Phone Case - Clear Protective",
      description: "Crystal clear protective case with reinforced corners.",
      category: "Electronics",
      price: 19.99,
      rating: 4.6,
      image: "/images/phonecase.png",
    },
    {
      id: "6",
      name: "Coffee Pods - Medium Roast",
      description: "Premium coffee pods with rich, smooth medium roast flavor.",
      category: "Food & Beverages",
      price: 32.99,
      rating: 4.7,
      image: "/images/coffeepods.png",
    },
    {
      id: "7",
      name: "Dog Treats - Training Bites",
      description: "Healthy training treats that dogs love, perfect for obedience training.",
      category: "Pet Supplies",
      price: 18.99,
      rating: 4.8,
      image: "/images/dogtreats.png",
    },
    {
      id: "8",
      name: "Wireless Phone Charger",
      description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
      category: "Electronics",
      price: 34.99,
      rating: 4.5,
      image: "/images/charger.png",
    },
    {
      id: "9",
      name: "Kitchen Dish Soap - 3 Pack",
      description: "Concentrated dish soap that cuts through grease effectively.",
      category: "Household",
      price: 12.99,
      rating: 4.4,
      image: "/images/kitchendishsoap.png",
    },
    {
      id: "10",
      name: "USB-C Cable - 6ft",
      description: "Durable braided USB-C cable for fast charging and data transfer.",
      category: "Electronics",
      price: 15.99,
      rating: 4.6,
      image: "/images/usbcable.png",
    },
    {
      id: "11",
      name: "Air Purifier Filters",
      description: "HEPA replacement filters for cleaner, healthier air.",
      category: "Home & Garden",
      price: 42.99,
      rating: 4.7,
      image: "/images/airpurifier.png",
    },
    {
      id: "12",
      name: "Dog Leash - Retractable",
      description: "Strong retractable leash with comfortable grip and safety lock.",
      category: "Pet Supplies",
      price: 28.99,
      rating: 4.5,
      image: "/images/dogleash.png",
    },
  ]

  // Función de filtrado de productos
  const filterProducts = (query: string) => {
    if (!query.trim()) {
      return popularItems
    }
    
    const lowercaseQuery = query.toLowerCase()
    return popularItems.filter(item => 
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery)
    )
  }

  // Efecto para filtrar productos cuando cambia la búsqueda
  useEffect(() => {
    const filtered = filterProducts(searchQuery)
    setFilteredProducts(filtered)
  }, [searchQuery])

  // Inicializar con todos los productos
  useEffect(() => {
    setFilteredProducts(popularItems)
  }, [])

  // Manejar cambio en el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Limpiar búsqueda
  const clearSearch = () => {
    setSearchQuery("")
    setFilteredProducts(popularItems)
  }

  const handleAddToCart = (item: any) => {
    addToCart(item, true) // skipAuthCheck será manejado por AuthGuard
  }

  const reorderFrequentItems = () => {
    displayFrequentOrders.forEach((frequentItem) => {
      // Convertir FrequentOrderItem a formato compatible con addToCart
      const itemToAdd = {
        id: frequentItem.id,
        name: frequentItem.name,
        price: frequentItem.price,
        rating: 4.9, // Rating por defecto
        image: frequentItem.image,
      }
      
      // Agregar la cantidad específica del pedido frecuente
      for (let i = 0; i < frequentItem.quantity; i++) {
        addToCart(itemToAdd, true) // skipAuthCheck = true
      }
    })
  }

  const cartTotal = calculateTotal()
  const frequentOrdersTotal = displayFrequentOrders.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
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
            className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-[#A564D3] to-[#B66EE8] px-3 py-2 text-white transition-colors shadow-md"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <AuthGuard action="profile">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-[#A564D3] hover:bg-[#FFC9FF]/20 w-full text-left"
            >
              <User2 className="h-5 w-5" />
              Profile
            </Link>
          </AuthGuard>
          <AuthGuard action="settings">
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 text-gray-500 transition-colors hover:text-[#A564D3] hover:bg-[#FFC9FF]/20 w-full text-left"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </AuthGuard>
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
            <h2 className="text-2xl font-semibold">
              Hello, {isAuthenticated ? user?.name || 'User' : 'Guest'}! <span className="ml-1"></span>
            </h2>
            <p className="text-gray-500">{isAuthenticated ? 'Welcome Back' : 'Browse our products'}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input 
                className="w-64 pl-10 pr-10" 
                placeholder="Search for items" 
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => setIsCartOpen(true)}
              className="relative hover:bg-[#FFC9FF]/20 hover:text-[#A564D3]"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B66EE8] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Button>
            <AuthGuard action="profile">
              <Avatar 
                className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-[#B66EE8] transition-all"
              >
                <AvatarImage
                  src="/images/dd.jpeg"
                  alt="User avatar"
                />
                <AvatarFallback>{isAuthenticated && user?.name ? user.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
              </Avatar>
            </AuthGuard>
          </div>
        </header>

        {/* Promotional Cards */}
        <div className="mb-12 grid grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-[#F2A8FF] to-[#E498FF] border-0 rounded-[24px] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="flex items-center justify-between p-8 gap-6">
              <div className="flex-1">
                <p className="mb-3 text-sm font-medium uppercase text-white/70">BEST OFFERS</p>
                <h3 className="mb-4 text-2xl font-semibold text-white">Tote Bag Collection</h3>
                <p className="mb-6 text-white/90">Discover premium tote bags</p>
                <Button className="bg-white text-[#A564D3] hover:bg-white/90 transition-colors shadow-md">See More</Button>
              </div>
              <Image
                src="/images/w-totebag.png"
                alt="Tote Bag Collection"
                width={180}
                height={180}
                className="object-contain transition-transform duration-300 hover:scale-105 flex-shrink-0"
              />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#FFC9FF] to-[#FFC4FF] border-0 rounded-[24px] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="mb-4 text-3xl font-semibold text-[#A564D3]">Flash Sale ✨</h3>
                <p className="mb-6 text-5xl font-bold text-[#B66EE8]">75% OFF</p>
                <Button className="bg-[#A564D3] hover:bg-[#B66EE8] text-white transition-colors shadow-md">Buy Now!</Button>
              </div>
              <Image
                src="/images/index-20vanderbrand.jpeg"
                alt="Square One District Tote"
                width={200}
                height={200}
                className="object-contain transition-transform duration-300 hover:scale-105"
              />
            </CardContent>
          </Card>
        </div>

        {/* Frequent Orders Section */}
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Your Frequent Orders</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="h-4 w-4" />
              <span>{displayFrequentOrders.length} products</span>
            </div>
          </div>

          <Card className="border-0 bg-gradient-to-br from-[#D689FF] to-[#E498FF] rounded-[24px] shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-8">
              {!isAuthenticated ? (
                <div className="text-center py-12">
                  <User2 className="h-16 w-16 text-white/80 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2 text-white">Login to See Your Frequent Orders</h4>
                  <p className="text-white/90 mb-6">
                    Sign in to access your personalized order history and reorder your favorite products with one click
                  </p>
                  <Button
                    asChild
                    className="bg-white text-[#A564D3] hover:bg-white/90 hover:text-[#B66EE8] px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-md"
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              ) : ordersLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-white/90">Loading your frequent orders...</p>
                </div>
              ) : displayFrequentOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-white/80 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2 text-white">No Frequent Orders Yet</h4>
                  <p className="text-white/90">
                    Start shopping to build your personalized frequent orders list
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-white">Frequent Orders Package</h4>
                      <p className="text-white/90">
                        Products you order most frequently, ready to reorder with one click
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/80 mb-1">Package Total</p>
                      <p className="text-3xl font-bold text-white">$ {frequentOrdersTotal.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {displayFrequentOrders.map((item) => (
                      <div key={item.id} className="bg-white/95 rounded-2xl p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 backdrop-blur-sm">
                        <div className="relative mb-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-32 object-cover rounded-xl"
                          />
                          <div className="absolute top-2 right-2 bg-[#A564D3] text-white text-xs px-2 py-1 rounded-full">
                            x{item.quantity}
                          </div>
                        </div>
                        <h5 className="font-semibold text-sm mb-1 line-clamp-2">{item.name}</h5>
                        <p className="text-xs text-gray-500 mb-2">Ordered {item.orderCount} times</p>
                        <p className="text-[#A564D3] font-semibold">$ {item.price}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <AuthGuard action="cart">
                      <Button
                        className="flex-1 bg-white text-[#A564D3] hover:bg-white/90 hover:text-[#B66EE8] h-14 text-lg font-semibold rounded-2xl transition-all duration-200 hover:scale-105 shadow-md"
                        onClick={reorderFrequentItems}
                      >
                        <Package className="h-5 w-5 mr-2" />
                        Reorder Entire Package
                      </Button>
                    </AuthGuard>
                    <Button
                      variant="outline"
                      className="h-14 px-8 rounded-2xl border-2 border-white bg-white/20 text-white hover:bg-white hover:text-[#A564D3] transition-all duration-200 shadow-md"
                    >
                      Personalize
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Collection'}
            </h3>
            {searchQuery && (
              <p className="text-gray-500 mt-1">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            )}
          </div>
          {!searchQuery && (
            <Button variant="link" className="hover:text-[#B66EE8] transition-colors">See All</Button>
          )}
        </div>

        <div className="space-y-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find any products matching "{searchQuery}"
              </p>
              <Button 
                onClick={clearSearch}
                variant="outline"
                className="border-[#A564D3] text-[#A564D3] hover:bg-[#A564D3] hover:text-white"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((item, index) => (
              <Card key={item.id} className="group overflow-hidden border-0 rounded-3xl shadow-sm bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                <div className="aspect-square p-6 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 transition-colors ${i < Math.floor(item.rating) ? "text-orange-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({item.rating})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#B66EE8] text-lg font-bold">$ {item.price}</span>
                    <AuthGuard action="cart">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="bg-gradient-to-r from-[#A564D3] to-[#B66EE8] hover:from-[#B66EE8] hover:to-[#C879FF] text-white rounded-xl px-6 transition-all duration-200 hover:scale-105 shadow-md"
                      >
                        Add To Cart
                      </Button>
                    </AuthGuard>
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
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
            <AuthGuard action="purchase">
              <Button 
                className="w-full bg-gradient-to-r from-[#A564D3] to-[#B66EE8] hover:from-[#B66EE8] hover:to-[#C879FF] text-white rounded-2xl h-14 text-lg font-semibold mt-4 transition-all duration-200 hover:scale-105 shadow-lg"
                onClick={() => {
                  // Proceder con checkout
                  console.log('Proceeding to checkout')
                }}
              >
                Checkout
              </Button>
            </AuthGuard>
          </div>
        </aside>
      )}
    </div>
  )
}