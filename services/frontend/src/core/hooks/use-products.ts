// Products Hook for catalog management
'use client'

import { useState, useEffect } from 'react'
import { catalogService, Product, ProductSearchParams } from '@/infraestructure/catalog/catalog.service'

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
  loadProducts: (params?: ProductSearchParams) => Promise<void>
  getProduct: (id: number) => Promise<Product | null>
  searchProducts: (query: string) => Promise<void>
  clearError: () => void
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = () => setError(null)

  const loadProducts = async (params?: ProductSearchParams) => {
    setLoading(true)
    setError(null)
    try {
      const response = await catalogService.getProducts(params)
      if (response.success) {
        setProducts(response.data)
      } else {
        setError('Failed to load products')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
      console.error('Products loading error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getProduct = async (id: number): Promise<Product | null> => {
    try {
      const response = await catalogService.getProduct(id)
      return response.success ? response.data : null
    } catch (err) {
      console.error('Product loading error:', err)
      return null
    }
  }

  const searchProducts = async (query: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await catalogService.searchProducts(query)
      if (response.success) {
        setProducts(response.data)
      } else {
        setError('Failed to search products')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
      console.error('Products search error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Load products on mount
  useEffect(() => {
    loadProducts()
  }, [])

  return {
    products,
    loading,
    error,
    loadProducts,
    getProduct,
    searchProducts,
    clearError,
  }
}