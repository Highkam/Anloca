// Application constants
export const APP_NAME = 'Anloca' as const
export const APP_VERSION = '1.0.0' as const

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
export const API_TIMEOUT = 10000 // 10 seconds

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