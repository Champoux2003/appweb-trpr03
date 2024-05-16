import { defineStore } from 'pinia'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
    const users = ref([])
    const user = ref(null)


    async function getUserById(id: number) {
        try {
            user.value = await userService.getUserById(id.toString())
            return user

        } catch (error) {
        }
    }
    async function getUsers() {
        try {
            users.value = await userService.getUsersList()
            return users

        } catch (error) {
        }
    }

    return {
        getUserById,
        getUsers,
        users,
        user
    }
})
