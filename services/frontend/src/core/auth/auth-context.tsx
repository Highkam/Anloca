// Auth Context for session management
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService, User, AuthSession } from '@/infraestructure/auth/auth.service'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  register: (email: string, password: string, name: string) => Promise<boolean>
  refreshSession: () => Promise<void>
  isAuthenticated: boolean
  sessionToken: string | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sessionToken, setSessionToken] = useState<string | null>(null)

  const isAuthenticated = !!user && !!sessionToken

  const refreshSession = async () => {
    setLoading(true)
    try {
      const token = authService.getSessionToken()
      if (!token) {
        setUser(null)
        setSessionToken(null)
        return
      }

      const response = await authService.getSession(token)
      if (response.success && response.data.id) {
        // If session is valid, get user profile
        const profileResponse = await authService.getUserProfile(token)
        if (profileResponse.success) {
          setUser(profileResponse.data)
          setSessionToken(token)
        } else {
          // Session invalid, clear it
          authService.removeSessionToken()
          setUser(null)
          setSessionToken(null)
        }
      } else {
        // Session invalid, clear it
        authService.removeSessionToken()
        setUser(null)
        setSessionToken(null)
      }
    } catch (error) {
      console.error('Session refresh failed:', error)
      authService.removeSessionToken()
      setUser(null)
      setSessionToken(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login({ email, password })
      if (response.success && response.data) {
        setUser(response.data.user)
        setSessionToken(response.data.token)
        authService.setSessionToken(response.data.token)
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response = await authService.register({ email, password, name })
      if (response.success && response.data) {
        setUser(response.data.user)
        setSessionToken(response.data.token)
        authService.setSessionToken(response.data.token)
        return true
      }
      return false
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      const token = authService.getSessionToken()
      if (token) {
        await authService.logout(token)
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      authService.removeSessionToken()
      setUser(null)
      setSessionToken(null)
    }
  }

  // Initialize session on mount
  useEffect(() => {
    refreshSession()
  }, [])

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    register,
    refreshSession,
    isAuthenticated,
    sessionToken,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}