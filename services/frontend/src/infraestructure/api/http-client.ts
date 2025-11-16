// HTTP client for API communication
import { API_TIMEOUT } from '@/core/config/constants'

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  code?: string
  status?: number
}

export class HttpClient {
  private baseURL: string
  private timeout: number
  private defaultHeaders: Record<string, string>

  constructor(baseURL: string, timeout = API_TIMEOUT) {
    this.baseURL = baseURL
    this.timeout = timeout
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`
      
      const response = await fetch(fullUrl, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout')
        }
        throw error
      }
      
      throw new Error('Unknown error occurred')
    }
  }

  async get<T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: 'GET', headers })
  }

  async post<T>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'PUT',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(
    url: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'PATCH',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: 'DELETE', headers })
  }

  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  removeAuthToken() {
    delete this.defaultHeaders['Authorization']
  }
}

// Default HTTP client instance
export const httpClient = new HttpClient(process.env.NEXT_PUBLIC_API_URL || '')

export default httpClient