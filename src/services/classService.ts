import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import { useAuthStore } from '../stores/authStore'

const url = `http://127.0.0.1:3000/classes`

interface User {
  email: string
  password: string
  name: string
  role: string
  health: number
}

async function getClassById(classId: number) {
  try {
    const response = await axiosAuth.get(`${url}/${classId}`)
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function getClasses() {
  try {
    const response = await axiosAuth.get(
      `${url}`
    )
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function addStudent(newStudentId: number) {
  try {
    const classe = await getClassById(1)
    const classStudents = classe.studentsId
    classStudents.push(newStudentId)
    const response = await axiosAuth.patch(`${url}/${1}`, {
      studentsId: classStudents
    })
  } catch (error) {}
}

async function deleteStudentFromClass(studentId: number) {
  try{
    const classe = await getClassById(1)
    const classStudents = classe.studentsId
    const newStudents = classStudents.filter((id: number) => id !== studentId)
    await axiosAuth.patch(`${url}/1`, {studentsId: newStudents})
  }catch(error){
    throw parseAxiosError(error)
  }
}

export const classService = {
  getClassById,
  getClasses,
  addStudent,
  deleteStudentFromClass,
}
