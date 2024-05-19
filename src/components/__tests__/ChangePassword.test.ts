import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { beforeEach } from 'node:test'
import { setActivePinia } from 'pinia'
import ChangePassword from '../ChangePassword.vue'
import { useProfileStore } from '@/stores/profileStore'

describe('ChangePassword', () => {
    beforeEach(() => {
        setActivePinia(createTestingPinia({createSpy: vi.fn }))
    })

    it('can change password', async () => {
        const wrapper = mount(ChangePassword, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
            }
        })

        const store = useProfileStore()
        store.changePassword = vi.fn() // Mock the changePassword function

        // Simulate filling the old password and new password fields
        await wrapper.find('#old-password').setValue('test')
        await wrapper.find('#new-password').setValue('test1')
        await wrapper.find('#confirm-password').setValue('test1')
        // Simulate clicking the submit button
        await wrapper.find('#submit-btn').trigger('click')

        // Check if the changePassword function was called with the new password
        expect(store.changePassword).toHaveBeenCalled()
        expect(store.changePassword).toHaveBeenCalledWith('test1')
    })
    
})
