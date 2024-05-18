import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import { useAuthStore } from '../stores/authStore'

const url = `http://127.0.0.1:3000/664/users`

interface User {
  email: string,
  password: string,
  name: string,
  role: string,
  health: number,
}

async function getUserById(userId: number) {
  try {
    const authStore = useAuthStore()
    // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
    // voir le fichier src/shared/axiosAuth.js
    const response = await axiosAuth.get(
      `${url}/${userId}`
    )

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function updateUserById(userId: number, newName:string) {
  try {
    
    const user = await getUserById(userId) // Await the getUserById function call
    const response = await axiosAuth.patch(
      `${url}/${userId}`, {name: newName} // Access the properties of the awaited user object
    )
    
    return response.data
  } catch (error) {
    throw parseAxiosError(error)

  }
}
async function getUsersList() {
  try {
    const response = await axiosAuth.get(
      `${url}`)
    return response.data
  }
  catch (error) {
    throw parseAxiosError(error)
  }
}

async function createUser(user : User) {
  try {
    await axiosAuth.post(`${url}`, {email: user.email, password: user.password, name: user.name, role: user.role, health: 50})
  }
  catch (error) {
    throw parseAxiosError(error)
  }
}

async function deleteUser(userId: number) { 
  try {
    await axiosAuth.delete(
      `${url}/${userId}`)
      return true
  }
  catch (error) {
    throw parseAxiosError(error)
  }
}

async function healthChange(healthChange: number, userId: string) {
  try {
    const user = await getUserById(userId)
    const newHealth = user.health + healthChange
    await axiosAuth.patch(
      `${url}/${userId}`, {health: newHealth}
    )
  }
  catch (error) {
    throw parseAxiosError(error)
  }
}


export const userService = {
  getUserById,
  getUsersList,
  updateUserById,
  createUser,
  deleteUser,
  healthChange
}
