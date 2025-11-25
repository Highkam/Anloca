// Cart Hook for shopping cart management
'use client'

import { useState, useEffect } from 'react'
import { cartService, Cart, CartProduct, CartWithProducts } from '@/infraestructure/cart/cart.service'
import { catalogService, Product } from '@/infraestructure/catalog/catalog.service'
import { useAuth } from '@/infraestructure/auth/auth-provider'

interface CartItem extends CartProduct {
  product?: Product
}

interface UseCartReturn {
  cart: Cart | null
  items: CartItem[]
  loading: boolean
  error: string | null
  addToCart: (productId: number, quantity?: number) => Promise<boolean>
  removeFromCart: (productId: number) => Promise<boolean>
  clearError: () => void
  refreshCart: () => Promise<void>
  getTotalPrice: () => number
  getTotalItems: () => number
}

export function useCart(): UseCartReturn {
  const { user, sessionToken, isAuthenticated } = useAuth()
  const [cart, setCart] = useState<Cart | null>(null)
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = () => setError(null)

  const loadCart = async () => {
    if (!user || !sessionToken) {
      setCart(null)
      setItems([])
      return
    }

    setLoading(true)
    try {
      // Get user's cart
      const userCart = await cartService.getCurrentUserCart(user.id, sessionToken)
      if (!userCart) {
        setCart(null)
        setItems([])
        return
      }

      setCart(userCart)

      // Get cart products
      const cartProducts = await cartService.getCartProducts(userCart.id, sessionToken)
      if (cartProducts) {
        // Load product details for each cart item
        const itemsWithProducts = await Promise.all(
          cartProducts.data.map(async (cartProduct) => {
            try {
              const productResponse = await catalogService.getProduct(cartProduct.productId)
              return {
                ...cartProduct,
                product: productResponse.success ? productResponse.data : undefined
              }
            } catch {
              return cartProduct
            }
          })
        )
        setItems(itemsWithProducts)
      } else {
        setItems([])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart')
      console.error('Cart loading error:', err)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId: number, quantity = 1): Promise<boolean> => {
    if (!user || !sessionToken || !cart) {
      setError('Must be logged in to add items to cart')
      return false
    }

    try {
      setLoading(true)
      const response = await cartService.addToCart(
        { cartId: cart.id, productId, quantity },
        sessionToken
      )

      if (response.success) {
        await loadCart() // Refresh cart
        return true
      } else {
        setError('Failed to add item to cart')
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart')
      return false
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (productId: number): Promise<boolean> => {
    if (!cart || !sessionToken) {
      setError('Invalid cart state')
      return false
    }

    try {
      setLoading(true)
      const response = await cartService.removeFromCart(cart.id, productId, sessionToken)

      if (response.success) {
        await loadCart() // Refresh cart
        return true
      } else {
        setError('Failed to remove item from cart')
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item from cart')
      return false
    } finally {
      setLoading(false)
    }
  }

  const refreshCart = async () => {
    await loadCart()
  }

  const getTotalPrice = (): number => {
    return items.reduce((total, item) => {
      if (item.product) {
        return total + (item.product.price * item.quantity)
      }
      return total
    }, 0)
  }

  const getTotalItems = (): number => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  // Load cart when user changes
  useEffect(() => {
    if (isAuthenticated) {
      loadCart()
    } else {
      setCart(null)
      setItems([])
    }
  }, [user?.id, sessionToken, isAuthenticated])

  return {
    cart,
    items,
    loading,
    error,
    addToCart,
    removeFromCart,
    clearError,
    refreshCart,
    getTotalPrice,
    getTotalItems,
  }
}