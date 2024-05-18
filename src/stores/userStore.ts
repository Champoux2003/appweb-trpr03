import { defineStore } from 'pinia'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'
import { classService } from '@/services/classService'
import { ref } from 'vue'
import type { bool } from 'aws-sdk/clients/signer'

export const useUserStore = defineStore('userStore', () => {
    const users = ref([])
    const user = ref(null)


    async function getUserById(id: number) {
        try {
            user.value = await userService.getUserById(id)
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
    async function createUser(newUser: any) {
        try {
            await userService.createUser(newUser)
            await getUsers() // refresh the list of users
            const newUserWithId = users.value.find((u: any) => u.email === newUser.email) // we get the user we just created with the id (we find by email since email are unique)
            if (newUserWithId) {
                await classService.addStudent(newUserWithId.id) // we add the student to the class
            }

        } catch (error) {
        }
    }

    async function healthChange(healthChange: number, userId: number) {
        try {
            await userService.healthChange(healthChange, userId.toString())
        } catch (error) {
        }
    }

    return {
        getUsers,
        getUserById,
        users,
        user,
        createUser,
        healthChange
    }
})
