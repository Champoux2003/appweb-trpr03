import { defineStore } from 'pinia'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'

export const useUserStore = defineStore('userStore', () => {

    async function getUserById(id: number) {
        try {
            const user = await userService.getUserById(id.toString())
            return user

        } catch (error) {
        }
    }
    async function getUsers() {
        try {
            const users = await userService.getUsersList()
            return users

        } catch (error) {
        }
    }

    return {
        getUserById,
        getUsers
    }
})