// Application route definitions
export const ROUTES = {
  // Main pages
  HOME: '/',
  CART: '/cart',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  SUPPORT: '/support',
  
  // Auth routes (for future implementation)
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  
  // API routes
  API: {
    CART: '/api/cart',
    PRODUCTS: '/api/products',
    USER: '/api/user',
    AUTH: '/api/auth',
  }
} as const

// Type for route keys
export type RouteKey = keyof typeof ROUTES

// Helper function to generate dynamic routes
export const generateRoute = {
  product: (id: string) => `/products/${id}`,
  order: (id: string) => `/orders/${id}`,
  category: (slug: string) => `/category/${slug}`,
}

// Navigation items for menus
export const NAV_ITEMS = [
  { href: ROUTES.HOME, label: 'Dashboard', icon: 'Home' },
  { href: ROUTES.CART, label: 'Cart', icon: 'ShoppingBag' },
  { href: ROUTES.PROFILE, label: 'Profile', icon: 'User2' },
  { href: ROUTES.SETTINGS, label: 'Settings', icon: 'Settings' },
  { href: ROUTES.SUPPORT, label: 'Support', icon: 'Mail' },
] as const