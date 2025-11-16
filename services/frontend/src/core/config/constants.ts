// Application constants
export const APP_NAME = 'Anloca' as const
export const APP_VERSION = '1.0.0' as const

// API Configuration - Microservices URLs
export const AUTH_SERVICE_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3001'
export const CART_SERVICE_URL = process.env.NEXT_PUBLIC_CART_URL || 'http://localhost:3002'
export const CATALOG_SERVICE_URL = process.env.NEXT_PUBLIC_CATALOG_URL || 'http://localhost:3000'
export const API_TIMEOUT = 10000 // 10 seconds

// Legacy API Base URL (for backward compatibility)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Routes
export const ROUTES = {
  HOME: '/',
  CART: '/cart',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  SUPPORT: '/support',
} as const

// UI Constants
export const TOAST_TIMEOUT = 5000
export const LOADING_DELAY = 300