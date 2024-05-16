import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '../services/userService'
import { useAuthStore } from './authStore'

export const useProfileStore = defineStore('profileStoreId', () => {
  const email = ref('')
  const name = ref('')
  const onError = ref(false)
  const role = ref('')

  function _initializeProfile(profile: { email: string; name: string, role: string}) {
    email.value = profile.email
    name.value = profile.name
    role.value = profile.role
    onError.value = false
  }

  async function getProfile() {
    try {
      onError.value = false
      const authStore = useAuthStore()
      const userId = authStore.getUserId // Assuming getUserId is a computed or a ref inside authStore
      const profile = await userService.getUserById(userId)
      _initializeProfile(profile)
    } catch (error) {
      onError.value = true
    }
  }
/*
  async function updateProfile() {
    try {
      onError.value = false
      const authStore = useAuthStore()
      const userId = authStore.getUserId // Assuming getUserId is a computed or a ref inside authStore
      await userService.updateUserById(userId, { email: email.value, name: name.value, role: role.value})
    } catch (error) {
      onError.value = true
    }
  }
*/
  async function updateProfileName(newName: string){
    try {
      onError.value = false
      const authStore = useAuthStore()
      console.log("ProfileStore");
      const userId = authStore.getUserId
      console.log(userId) // Assuming getUserId is a computed or a ref inside authStore
      await userService.updateUserById(userId, newName);
      name.value = newName
    } catch (error) {
      onError.value = true
    }
  }
  async function deleteProfile() {
    try {
      onError.value = false
      const authStore = useAuthStore()
      const userId = authStore.getUserId // Assuming getUserId is a computed or a ref inside authStore
      await userService.deleteUser(userId)
    } catch (error) {
      onError.value = true
    }
  }

  return { 
    email, 
    name, 
    role,
    onError, 
    getProfile,
    updateProfileName,
    deleteProfile
  }
})
