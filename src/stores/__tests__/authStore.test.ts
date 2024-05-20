import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '@/services/authService'
import jwtDecode from 'jwt-decode'

// Mock the jwtDecode function
vi.mock('jwt-decode', () => ({
  default: vi.fn()
}))

// Mock the authService
vi.mock('@/services/authService', () => ({
  authService: {
    getToken: vi.fn()
  }
}))

describe('useAuthStore', () => {
  let authStore: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    authStore = useAuthStore()
  })

  it('initializes with correct default values', () => {
    expect(authStore.token).toBe('')
    expect(authStore.authServiceError).toBe('')
    expect(authStore.isLoggedIn).toBe(false)
    expect(authStore.getUserId).toBe('')
    expect(authStore.isTokenExpired).toBe(true)
  })

  
  it('login handles error correctly', async () => {
    const errorMessage = 'Invalid credentials'
    authService.getToken(new Error(errorMessage))
    await authStore.login({ email: 'test@example.com', password: 'wrong-password' })
    expect(authStore.token).toBe('')
  })

  it('logout clears the token and localStorage', () => {
    authStore.token = 'mock-token'
    localStorage.setItem('token', 'mock-token')
    authStore.logout()
    expect(authStore.token).toBe('')
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('loadPersistedToken loads token from localStorage', () => {
    localStorage.setItem('token', 'persisted-token')
    authStore.loadPersistedToken()
    expect(authStore.token).toBe('persisted-token')
  })

  it('clearError clears the authServiceError', () => {
    authStore.authServiceError = 'Some error'
    authStore.clearError()
    expect(authStore.authServiceError).toBe('')
  })

  it('refreshToken logs out the user', () => {
    authStore.token = 'mock-token'
    localStorage.setItem('token', 'mock-token')
    authStore.refreshToken()
    expect(authStore.token).toBe('')
    expect(localStorage.getItem('token')).toBeNull()
  })
})
