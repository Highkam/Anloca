// Auth Service - Handles authentication with Auth microservice
import { ENDPOINTS } from '../api/endpoints'
import { HttpClient, ApiResponse } from '../api/http-client'
import { AUTH_SERVICE_URL } from '@/core/config/constants'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface User {
  id: number
  email: string
  name: string
}

export interface AuthSession {
  id: number | null
  user?: User
}

export interface AuthResponse {
  user: User
  token: string
}

class AuthService {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient(AUTH_SERVICE_URL)
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.httpClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials)
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return this.httpClient.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, userData)
  }

  async logout(token?: string): Promise<ApiResponse<void>> {
    const headers = token ? { 'x-session-token': token } : undefined
    return this.httpClient.post<void>(ENDPOINTS.AUTH.LOGOUT, {}, headers)
  }

  async getSession(token?: string): Promise<ApiResponse<AuthSession>> {
    const headers = token ? { 'x-session-token': token } : undefined
    return this.httpClient.get<AuthSession>(ENDPOINTS.AUTH.SESSION, headers)
  }

  async getUserProfile(token: string): Promise<ApiResponse<User>> {
    const headers = { 'x-session-token': token }
    return this.httpClient.get<User>(ENDPOINTS.USER.PROFILE, headers)
  }

  // Helper methods for token management
  setSessionToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sessionToken', token)
    }
  }

  getSessionToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sessionToken')
    }
    return null
  }

  removeSessionToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sessionToken')
    }
  }
}

export const authService = new AuthService()