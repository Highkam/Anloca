// Product domain models
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  productId: string
  size: string
  color: string
  sku: string
  stock: number
  price?: number // Override product price if different
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  children?: ProductCategory[]
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  sizes?: string[]
  colors?: string[]
  inStock?: boolean
  featured?: boolean
  search?: string
}

export interface ProductSearchResult {
  products: Product[]
  total: number
  page: number
  limit: number
  hasNextPage: boolean
  hasPrevPage: boolean
}