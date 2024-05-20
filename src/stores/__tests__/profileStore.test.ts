import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProfileStore } from '../profileStore'
import { userService } from '@/services/userService'
const pinia = createPinia()

vi.mock('@/services/userService', () => ({
    userService: {
        getUserById: vi.fn(),
        updateUserById: vi.fn(),
        ChangePassword: vi.fn()
    }
}))

describe('ProfileStore', () => {
    let profileStore: ReturnType<typeof useProfileStore>
    beforeEach(() => {
        setActivePinia(pinia)
        profileStore = useProfileStore()
    })
    it('should update the name in the profile', async () => {
        const id = 1
        const newName = 'John Doe'
        const mockUser = { email: 'test@email.com', name: 'Doe', role: 'teacher' }
        userService.updateUserById = vi.fn().mockReturnValue(mockUser)

        await profileStore.updateProfileName(newName)

        expect(profileStore.name).toBe(newName)
    })

    it('should set onError to true if an error occurs', async () => {
        const newName = 'John Doe'
        const errorMessage = 'Failed to update user'
        userService.updateUserById = vi.fn().mockImplementationOnce(() => { throw new Error(errorMessage) })
        await profileStore.updateProfileName(newName)

        expect(profileStore.onError).toBe(true)
    })
/*
    it('should change the password', async () => {
        const id = 1
        const newPassword = 'newPassword'
        userService.changePassword = vi.fn().mockResolvedValue('success')
    
        await profileStore.changePassword(newPassword)
    
        expect(userService.changePassword).toHaveBeenCalledWith(id, newPassword)
    })
    */
})
