import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

interface Question {
  userId: number,
  question: string,
  priority: number,
}
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

async function getQuestionById (questionId: number) {
  try {
    const response = await axiosAuth.get(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      `http://127.0.0.1:3000/questions/${questionId}`)
        return response.data
    }catch(error){
      throw parseAxiosError(error)
    }
}

async function createQuestion (question: Question) { 
  try {
    const response = await axiosAuth.post(
      `http://127.0.0.1:3000/questions`, {userid: question.userId, question: question.question, priority: question.priority})
      return response.data
    }catch(error){
      throw parseAxiosError(error)
    }
}

async function deleteQuestion(questionId: number){
  try{
    await axiosAuth.delete(
      `http://127.0.0.1:3000/questions/${questionId}`)
      return true
  }catch(error){
    throw parseAxiosError(error)
}
}
export const questionService = {
    getAllQuestions,
    getQuestionById,
    createQuestion,
    deleteQuestion,
    }