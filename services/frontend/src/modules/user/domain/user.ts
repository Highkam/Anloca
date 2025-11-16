// User domain models
export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
  dateOfBirth?: Date
  isEmailVerified: boolean
  isActive: boolean
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

export interface UserAddress {
  id: string
  userId: string
  type: AddressType
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  isDefault: boolean
}

export enum AddressType {
  SHIPPING = 'shipping',
  BILLING = 'billing'
}

export interface UserProfile {
  user: User
  addresses: UserAddress[]
  preferences: UserPreferences
}

export interface UserPreferences {
  newsletter: boolean
  promotions: boolean
  orderUpdates: boolean
  language: string
  currency: string
  timezone: string
}