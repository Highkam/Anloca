// API endpoint definitions for microservices
import { AUTH_SERVICE_URL, CART_SERVICE_URL, CATALOG_SERVICE_URL } from '@/core/config/constants'

const createAuthEndpoint = (path: string) => `${AUTH_SERVICE_URL}${path}`
const createCartEndpoint = (path: string) => `${CART_SERVICE_URL}${path}`
const createCatalogEndpoint = (path: string) => `${CATALOG_SERVICE_URL}${path}`

export const ENDPOINTS = {
  // Auth endpoints (Auth Service - Port 3001)
  AUTH: {
    SESSION: createAuthEndpoint('/auth/session'),
    LOGIN: createAuthEndpoint('/auth/login'),
    REGISTER: createAuthEndpoint('/auth/register'),
    LOGOUT: createAuthEndpoint('/auth/logout'),
    REFRESH: createAuthEndpoint('/auth/refresh'),
    FORGOT_PASSWORD: createAuthEndpoint('/auth/forgot-password'),
    RESET_PASSWORD: createAuthEndpoint('/auth/reset-password'),
  },

  // User endpoints (Auth Service)
  USER: {
    PROFILE: createAuthEndpoint('/users/profile'),
    SETTINGS: createAuthEndpoint('/users/settings'),
  },

  // Product endpoints (Catalog Service - Port 3000)
  PRODUCTS: {
    LIST: createCatalogEndpoint('/products'),
    DETAIL: (id: string) => createCatalogEndpoint(`/products/${id}`),
    SEARCH: createCatalogEndpoint('/products/search'),
    CATEGORIES: createCatalogEndpoint('/products/categories'),
  },

  // Cart endpoints (Cart Service - Port 3002) 
  CART: {
    // Cart management
    LIST_ALL: createCartEndpoint('/carts/all'),
    GET: (id: string) => createCartEndpoint(`/carts/${id}`),
    LIST_BY_USER: (userId: string) => createCartEndpoint(`/carts/user/${userId}`),
    CREATE: createCartEndpoint('/carts'),
    DELETE: (id: string) => createCartEndpoint(`/carts/${id}`),
    
    // Cart products management  
    PRODUCTS: {
      LIST: (cartId: string) => createCartEndpoint(`/cart-products/cart/${cartId}`),
      ADD: createCartEndpoint('/cart-products'),
      DELETE: (cartId: string, productId: string) => createCartEndpoint(`/cart-products/${cartId}/${productId}`),
    }
  },

  // Order endpoints (Future implementation - could be part of Cart Service)
  ORDERS: {
    LIST: createCartEndpoint('/orders'),
    DETAIL: (id: string) => createCartEndpoint(`/orders/${id}`),
    CREATE: createCartEndpoint('/orders'),
    CANCEL: (id: string) => createCartEndpoint(`/orders/${id}/cancel`),
  },

  // Support endpoints (Future implementation - could be part of Auth Service)
  SUPPORT: {
    TICKETS: createAuthEndpoint('/support/tickets'),
    CREATE_TICKET: createAuthEndpoint('/support/tickets'),
    FAQ: createAuthEndpoint('/support/faq'),
  },
} as const

export type EndpointPath = string