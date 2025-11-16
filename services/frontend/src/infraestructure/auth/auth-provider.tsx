'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/modules/user/domain/user'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (userData: RegisterData) => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (token) {
          // TODO: Validate token and get user info
          // const userData = await validateToken(token)
          // setUser(userData)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        localStorage.removeItem('authToken')
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual login API call
      // const response = await authAPI.login({ email, password })
      // const { user, token } = response.data
      // localStorage.setItem('authToken', token)
      // setUser(user)
      
      // Mock implementation for now
      console.log('Login attempt:', { email, password })
      throw new Error('Login not implemented yet')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual register API call
      // const response = await authAPI.register(userData)
      // const { user, token } = response.data
      // localStorage.setItem('authToken', token)
      // setUser(user)
      
      // Mock implementation for now
      console.log('Register attempt:', userData)
      throw new Error('Registration not implemented yet')
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      // TODO: Implement actual logout API call
      // await authAPI.logout()
      
      localStorage.removeItem('authToken')
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthProvider