import { describe, vi, expect, it, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { useAuthStore } from '../authStore'
import HomeView from '@/views/HomeView.vue'

describe('authStore', () => {
    beforeEach(() => {
        setActivePinia(createTestingPinia({createSpy: vi.fn}))
    })
    
    it('should have a token', async () => {
        const wrapper = mount(HomeView, {
            global: {
                plugins: [createTestingPinia({createSpy: vi.fn})]
            }
        })
        const store = useAuthStore()


        expect(store.isLoggedIn).toBe(false)
    })
})
