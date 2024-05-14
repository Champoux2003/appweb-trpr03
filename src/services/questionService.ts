import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

async function getAllQuestions () {
  try {
    const response = await axiosAuth.get(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      `http://127.0.0.1:3000/questions`)
      return response.data
    } catch (error) {
      throw parseAxiosError(error)
    }
}

async function getQuestionById (questionId: string) {
  try {
    const response = await axiosAuth.get(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      `http://127.0.0.1:3000/questions/${questionId}`)
        return response.data
    }catch(error){
      throw parseAxiosError(error)
    }
}
export const questionService = {
    getAllQuestions,
    getQuestionById
    }