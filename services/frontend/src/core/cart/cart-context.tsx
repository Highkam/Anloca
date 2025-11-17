"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { toast } from "@/core/hooks/use-toast"

interface CartItem {
  id: string
  name: string
  price: number
  size: string
  quantity: number
  image: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: any) => void
  updateQuantity: (itemId: string, change: number) => void
  calculateTotal: () => number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

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

  const addToCart = useCallback((item: any) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      toast({
        title: "Item added to cart",
        description: `${item.name} has been added to your cart.`,
      })
      return [...prevItems, { ...item, quantity: 1, size: "M" }]
    })
    // Solo abre el carrito si no está ya abierto
    if (!isCartOpen) {
      setIsCartOpen(true)
    }
  }, [isCartOpen])

  const calculateTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  const value: CartContextType = {
    cartItems,
    addToCart,
    updateQuantity,
    calculateTotal,
    isCartOpen,
    setIsCartOpen,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}