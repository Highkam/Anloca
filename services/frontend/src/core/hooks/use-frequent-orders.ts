// Hook for managing user's frequent orders
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/infraestructure/auth/auth-provider'
import { catalogService, Product } from '@/infraestructure/catalog/catalog.service'

export interface FrequentOrder {
  id: string
  productId: number
  name: string
  price: number
  quantity: number
  image: string
  orderCount: number
  lastOrderDate: string
  category: string
}

interface UseFrequentOrdersReturn {
  frequentOrders: FrequentOrder[]
  loading: boolean
  error: string | null
  refreshOrders: () => Promise<void>
  addToFrequentOrders: (productId: number, quantity: number) => Promise<void>
  clearError: () => void
}

export function useFrequentOrders(): UseFrequentOrdersReturn {
  const { user, isAuthenticated } = useAuth()
  const [frequentOrders, setFrequentOrders] = useState<FrequentOrder[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = () => setError(null)

  // Mock data for demonstration - In real app, this would come from backend
  const getMockFrequentOrders = async (): Promise<FrequentOrder[]> => {
    if (!user) return []
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return [
      {
        id: "1",
        productId: 1,
        name: "Premium Coffee Pods - Colombian",
        price: 24.99,
        quantity: 2,
        image: "/images/coffeepods.png",
        orderCount: 8,
        lastOrderDate: "2024-11-20",
        category: "Food & Beverages"
      },
      {
        id: "2", 
        productId: 2,
        name: "Dog Food - Premium Kibble",
        price: 45.99,
        quantity: 1,
        image: "/images/dogfood.png",
        orderCount: 6,
        lastOrderDate: "2024-11-18",
        category: "Pet Supplies"
      },
      {
        id: "3",
        productId: 3,
        name: "Wireless Charging Pad",
        price: 29.99,
        quantity: 1,
        image: "/images/charger.png",
        orderCount: 4,
        lastOrderDate: "2024-11-15",
        category: "Electronics"
      },
      {
        id: "4",
        productId: 4,
        name: "Eco-Friendly Water Bottle",
        price: 19.99,
        quantity: 2,
        image: "/images/waterbottle.png",
        orderCount: 5,
        lastOrderDate: "2024-11-12",
        category: "Home & Garden"
      }
    ]
  }

  const loadFrequentOrders = async () => {
    if (!isAuthenticated || !user) {
      setFrequentOrders([])
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      // In a real implementation, you'd call an API endpoint like:
      // const response = await orderService.getFrequentOrders(user.id, sessionToken)
      
      const orders = await getMockFrequentOrders()
      setFrequentOrders(orders)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load frequent orders')
      console.error('Frequent orders loading error:', err)
    } finally {
      setLoading(false)
    }
  }

  const addToFrequentOrders = async (productId: number, quantity: number) => {
    if (!isAuthenticated) return

    try {
      // Get product details
      const productResponse = await catalogService.getProduct(productId)
      if (!productResponse.success) return

      const product = productResponse.data
      
      // Check if product already exists in frequent orders
      const existingOrderIndex = frequentOrders.findIndex(order => order.productId === productId)
      
      if (existingOrderIndex >= 0) {
        // Update existing order
        const updatedOrders = [...frequentOrders]
        updatedOrders[existingOrderIndex] = {
          ...updatedOrders[existingOrderIndex],
          orderCount: updatedOrders[existingOrderIndex].orderCount + 1,
          quantity: quantity,
          lastOrderDate: new Date().toISOString().split('T')[0]
        }
        setFrequentOrders(updatedOrders)
      } else {
        // Add new frequent order (limit to top 10 most frequent)
        const newOrder: FrequentOrder = {
          id: Date.now().toString(),
          productId,
          name: product.name,
          price: product.price,
          quantity,
          image: product.imageUrl || '/images/dd.jpeg', // fallback image
          orderCount: 1,
          lastOrderDate: new Date().toISOString().split('T')[0],
          category: product.category || 'General'
        }
        
        const updatedOrders = [newOrder, ...frequentOrders].slice(0, 10)
        setFrequentOrders(updatedOrders)
      }
      
      // In real app, sync with backend:
      // await orderService.updateFrequentOrders(user.id, updatedOrders, sessionToken)
      
    } catch (err) {
      console.error('Error updating frequent orders:', err)
    }
  }

  const refreshOrders = async () => {
    await loadFrequentOrders()
  }

  // Load orders when user authentication status changes
  useEffect(() => {
    loadFrequentOrders()
  }, [isAuthenticated, user])

  return {
    frequentOrders,
    loading,
    error,
    refreshOrders,
    addToFrequentOrders,
    clearError
  }
}