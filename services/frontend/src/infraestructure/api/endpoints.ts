// API endpoint definitions
import { API_BASE_URL } from '@/core/config/constants'

const createEndpoint = (path: string) => `${API_BASE_URL}${path}`

export const ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: createEndpoint('/auth/login'),
    REGISTER: createEndpoint('/auth/register'),
    LOGOUT: createEndpoint('/auth/logout'),
    REFRESH: createEndpoint('/auth/refresh'),
    FORGOT_PASSWORD: createEndpoint('/auth/forgot-password'),
    RESET_PASSWORD: createEndpoint('/auth/reset-password'),
  },

  // User endpoints
  USER: {
    PROFILE: createEndpoint('/user/profile'),
    SETTINGS: createEndpoint('/user/settings'),
    ADDRESSES: createEndpoint('/user/addresses'),
    ORDERS: createEndpoint('/user/orders'),
  },

  // Product endpoints
  PRODUCTS: {
    LIST: createEndpoint('/products'),
    DETAIL: (id: string) => createEndpoint(`/products/${id}`),
    SEARCH: createEndpoint('/products/search'),
    CATEGORIES: createEndpoint('/products/categories'),
  },

  // Cart endpoints
  CART: {
    GET: createEndpoint('/cart'),
    ADD: createEndpoint('/cart/items'),
    UPDATE: (itemId: string) => createEndpoint(`/cart/items/${itemId}`),
    REMOVE: (itemId: string) => createEndpoint(`/cart/items/${itemId}`),
    CLEAR: createEndpoint('/cart/clear'),
  },

  // Order endpoints
  ORDERS: {
    LIST: createEndpoint('/orders'),
    DETAIL: (id: string) => createEndpoint(`/orders/${id}`),
    CREATE: createEndpoint('/orders'),
    CANCEL: (id: string) => createEndpoint(`/orders/${id}/cancel`),
  },

  // Support endpoints
  SUPPORT: {
    TICKETS: createEndpoint('/support/tickets'),
    CREATE_TICKET: createEndpoint('/support/tickets'),
    FAQ: createEndpoint('/support/faq'),
  },
} as const

export type EndpointPath = string