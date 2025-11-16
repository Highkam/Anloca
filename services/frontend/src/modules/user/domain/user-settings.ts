// User settings domain models
export interface UserSettings {
  id: string
  userId: string
  notifications: NotificationSettings
  privacy: PrivacySettings
  appearance: AppearanceSettings
  preferences: UserPreferences
  updatedAt: Date
}

export interface NotificationSettings {
  email: {
    orderUpdates: boolean
    promotions: boolean
    newsletter: boolean
    securityAlerts: boolean
  }
  push: {
    orderUpdates: boolean
    promotions: boolean
    reminders: boolean
  }
  sms: {
    orderUpdates: boolean
    securityAlerts: boolean
  }
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends'
  showEmail: boolean
  showPhone: boolean
  showLastSeen: boolean
  allowDataCollection: boolean
  allowPersonalization: boolean
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto'
  language: string
  currency: string
  timezone: string
  dateFormat: string
  timeFormat: '12h' | '24h'
}

export interface UserPreferences {
  defaultShippingAddress?: string
  defaultBillingAddress?: string
  defaultPaymentMethod?: string
  orderNotifications: boolean
  wishlistPrivate: boolean
  reviewsPrivate: boolean
}

// Settings validation schemas
export const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de'] as const
export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY'] as const
export const SUPPORTED_TIMEZONES = [
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Madrid',
  'Asia/Tokyo',
] as const

export type Language = typeof SUPPORTED_LANGUAGES[number]
export type Currency = typeof SUPPORTED_CURRENCIES[number]
export type Timezone = typeof SUPPORTED_TIMEZONES[number]