import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'

const url = 'http://127.0.0.1:3000/666/questions'
const urlCategory = 'http://127.0.0.1:3000/666/categories'

interface Question {
  userId: number,
  question: string,
  priority: number,
}
async function getAllQuestions() {
  try {
    const response = await axiosAuth.get(
      `${url}`)
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function getQuestionById(questionId: number) {
  try {
    const response = await axiosAuth.get(
      `${url}/${questionId}`)
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function createQuestion(question: Question) {
  try {
    const response = await axiosAuth.post(
      `${url}`, { userid: question.userId, question: question.question, priority: question.priority })
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function deleteQuestion(questionId: number) {
  try {
    await axiosAuth.delete(
      `${url}/${questionId}`)
    return true
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function raiseHand(questionId: number) {
  try {
    await axiosAuth.patch(
      `${url}/${questionId}`, {priority: 1})
  }catch (error) {
    throw parseAxiosError(error)
  }
}

async function lowerHand(questionId: number, priority: number) {
  try {
    const question = await getQuestionById(questionId)
    await axiosAuth.patch(
      `${url}/${questionId}`, {priority: priority})
  }catch (error) {
    throw parseAxiosError(error)
  }
}

async function addCategory(category: string) {
  try {
    await axiosAuth.post(
      `${urlCategory}`, {category: category})
  }catch (error) {
    throw parseAxiosError(error)
  }
}

export const questionService = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  deleteQuestion,
  raiseHand,
  lowerHand,
  addCategory,
}