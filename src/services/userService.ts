import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

async function getUserById (userId: string) {
  try {
    // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
    // voir le fichier src/shared/axiosAuth.js
    const response = await axiosAuth.get(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      `http://127.0.0.1:3000/users/${userId}`
    )

    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function updateUserById (userId: string, user: any) {
  try {
    // axiosAuth est une instance d'axios configurée pour ajouter le JWT à une requête nécessitant une authentification.
    // voir le fichier src/shared/axiosAuth.js
    const response = await axiosAuth.put(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      `http://127.0.0.1:3000/users/${userId}`
   ) 
   return response.data
  }catch(error){
    throw parseAxiosError(error)
  
  }
}
async function getUsersList(){
  try{
    const response = await axiosAuth.get(
      `http://127.0.0.1:3000/users`)
      return response.data

  }
  catch(error){
    throw parseAxiosError(error)
}
}
export const userService = {
  getUserById,
  getUsersList,
  updateUserById
}
