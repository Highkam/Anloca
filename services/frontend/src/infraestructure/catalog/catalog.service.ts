// Catalog Service - Handles products with Catalog microservice
import { ENDPOINTS } from '../api/endpoints'
import { HttpClient, ApiResponse } from '../api/http-client'
import { CATALOG_SERVICE_URL } from '@/core/config/constants'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl?: string
  category?: string
  stock?: number
  createdAt: string
  updatedAt: string
}

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  imageUrl?: string
  category?: string
  stock?: number
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number
}

export interface ProductsListResponse {
  products: Product[]
  total: number
  page?: number
  limit?: number
}

export interface ProductSearchParams {
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  page?: number
  limit?: number
}

class CatalogService {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient(CATALOG_SERVICE_URL)
  }

  async getProducts(params?: ProductSearchParams): Promise<ApiResponse<Product[]>> {
    const searchParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    const url = searchParams.toString() 
      ? `${ENDPOINTS.PRODUCTS.LIST}?${searchParams}`
      : ENDPOINTS.PRODUCTS.LIST
      
    return this.httpClient.get<Product[]>(url)
  }

  async getProduct(id: number): Promise<ApiResponse<Product>> {
    return this.httpClient.get<Product>(ENDPOINTS.PRODUCTS.DETAIL(id.toString()))
  }

  async createProduct(product: CreateProductRequest): Promise<ApiResponse<Product>> {
    return this.httpClient.post<Product>(ENDPOINTS.PRODUCTS.LIST, product)
  }

  async updateProduct(id: number, product: Partial<CreateProductRequest>): Promise<ApiResponse<Product>> {
    return this.httpClient.put<Product>(ENDPOINTS.PRODUCTS.DETAIL(id.toString()), product)
  }

  async deleteProduct(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<void>(ENDPOINTS.PRODUCTS.DETAIL(id.toString()))
  }

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    const searchParams = new URLSearchParams({ search: query })
    return this.httpClient.get<Product[]>(`${ENDPOINTS.PRODUCTS.SEARCH}?${searchParams}`)
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    return this.httpClient.get<string[]>(ENDPOINTS.PRODUCTS.CATEGORIES)
  }
}

export const catalogService = new CatalogService()