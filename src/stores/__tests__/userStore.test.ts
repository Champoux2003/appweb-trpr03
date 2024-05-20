import { vi, describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { userService } from '@/services/userService'
import { useUserStore } from '../userStore'

const pinia = createPinia()

vi.mock('@/services/userService', () => ({
    userService: {
        getUserById: vi.fn(),
        updateUserById: vi.fn(),
        ChangePassword: vi.fn()
    }
}))

describe('UserStore', () => {
    let userStore: ReturnType<typeof useUserStore>
    beforeEach(() => {
        setActivePinia(pinia)
        userStore = useUserStore()
    })
    it('Can get user by id', async () => {
        const id = 1
        const mockUser = { id: 1, name: 'John Doe' }
        userService.getUserById = vi.fn().mockReturnValue(mockUser)
        await userStore.getUserById(id)
        expect(userService.getUserById).toHaveBeenCalledWith(id)
    })

    it('Can get users list', async () => {
        const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]
        userService.getUsersList = vi.fn().mockReturnValue(mockUsers)
        await userStore.getUsers()
        expect(userService.getUsersList).toHaveBeenCalled()
    })

    it('Can create a user', async () => {
        const newUser = { name: 'John Doe' }
        userService.createUser = vi.fn().mockReturnValue(newUser)
        await userStore.createUser(newUser)
        expect(userService.createUser).toHaveBeenCalledWith(newUser)
    })
    
    it('Can change health', async () => {
        const healthChange = 2
        const userId = 1
        userService.healthChange = vi.fn().mockReturnValue(healthChange)
        await userStore.healthChange(healthChange,userId)
        expect(userService.healthChange).toHaveBeenCalledWith(healthChange,userId)
    })

    it('Can delete a user', async () => {
        const userId = 1
        userService.deleteUser = vi.fn().mockReturnValue(userId)
        await userStore.deleteUser(userId)
        expect(userService.deleteUser).toHaveBeenCalledWith(userId)
    })
})