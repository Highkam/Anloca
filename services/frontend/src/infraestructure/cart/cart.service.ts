// Cart Service - Handles shopping cart with Cart microservice
import { ENDPOINTS } from '../api/endpoints'
import { HttpClient, ApiResponse } from '../api/http-client'
import { CART_SERVICE_URL } from '@/core/config/constants'

export interface Cart {
  id: number
  userId: number
  createdAt: string
  updatedAt: string
}

export interface CartProduct {
  id: number
  cartId: number
  productId: number
  quantity: number
  createdAt: string
  updatedAt: string
}

export interface CartWithProducts extends Cart {
  products: CartProduct[]
}

export interface CreateCartRequest {
  userId?: number
}

export interface AddToCartRequest {
  cartId: number
  productId: number
  quantity: number
}

export interface UpdateCartProductRequest {
  quantity: number
}

class CartService {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient(CART_SERVICE_URL)
  }

  // Cart management
  async getAllCarts(): Promise<ApiResponse<Cart[]>> {
    return this.httpClient.get<Cart[]>(ENDPOINTS.CART.LIST_ALL)
  }

  async getCart(id: number): Promise<ApiResponse<Cart>> {
    return this.httpClient.get<Cart>(ENDPOINTS.CART.GET(id.toString()))
  }

  async getCartsByUser(userId: number): Promise<ApiResponse<Cart[]>> {
    return this.httpClient.get<Cart[]>(ENDPOINTS.CART.LIST_BY_USER(userId.toString()))
  }

  async createCart(userId: number, token?: string): Promise<ApiResponse<Cart>> {
    const headers = token ? { 'x-session-token': token } : undefined
    return this.httpClient.post<Cart>(ENDPOINTS.CART.CREATE, { userId }, headers)
  }

  async deleteCart(id: number, token?: string): Promise<ApiResponse<{ message: string }>> {
    const headers = token ? { 'x-session-token': token } : undefined
    return this.httpClient.delete<{ message: string }>(ENDPOINTS.CART.DELETE(id.toString()), headers)
  }

  // Cart products management
  async getCartProducts(cartId: number, token?: string): Promise<ApiResponse<CartProduct[]>> {
    const headers = token ? { 'x-session-token': token } : undefined
    return this.httpClient.get<CartProduct[]>(ENDPOINTS.CART.PRODUCTS.LIST(cartId.toString()), headers)
  }

  async addToCart(request: AddToCartRequest, token?: string): Promise<ApiResponse<CartProduct>> {
    const headers = token ? { 'x-session-token': token } : undefined
    return this.httpClient.post<CartProduct>(ENDPOINTS.CART.PRODUCTS.ADD, request, headers)
  }

  async removeFromCart(cartId: number, productId: number, token?: string): Promise<ApiResponse<{ message: string }>> {
    const headers = token ? { 'x-session-token': token } : undefined
    return this.httpClient.delete<{ message: string }>(
      ENDPOINTS.CART.PRODUCTS.DELETE(cartId.toString(), productId.toString()), 
      headers
    )
  }

  // Utility methods for common cart operations
  async getCurrentUserCart(userId: number, token?: string): Promise<Cart | null> {
    try {
      const response = await this.getCartsByUser(userId)
      const carts = response.data
      
      // Return the most recent cart or create a new one
      if (carts && carts.length > 0) {
        return carts[0]
      }
      
      // Create a new cart if none exists
      const newCartResponse = await this.createCart(userId, token)
      return newCartResponse.data
    } catch (error) {
      console.error('Error getting/creating user cart:', error)
      return null
    }
  }

  async getCartWithProducts(cartId: number, token?: string): Promise<CartWithProducts | null> {
    try {
      const [cartResponse, productsResponse] = await Promise.all([
        this.getCart(cartId),
        this.getCartProducts(cartId, token)
      ])
      
      return {
        ...cartResponse.data,
        products: productsResponse.data
      }
    } catch (error) {
      console.error('Error getting cart with products:', error)
      return null
    }
  }
}

export const cartService = new CartService()