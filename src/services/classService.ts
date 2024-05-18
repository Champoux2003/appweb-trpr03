import { parseAxiosError } from '../shared/parseAxiosError'
import axiosAuth from '../shared/axiosAuth'
import { useAuthStore } from '../stores/authStore'

const url = `http://127.0.0.1:3000/classes`

interface User {
  email: string,
  password: string,
  name: string,
  role: string,
  health: number,
}

async function getClassById(classId: number) {
  try {
    const response = await axiosAuth.get(
      `http://127.0.0.1:3000/classes/${classId}`
    )
    return response.data
  } catch (error) {
    throw parseAxiosError(error)
  }
}

async function getClasses() {
  try {
    const response = await axiosAuth.get(
      // TODO : utiliser une variable d'environnement pour l'url de l'api rest
      `http://127.0.0.1:3000/classes`
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
    console.log(classStudents)
    const response = await axiosAuth.put(
      `http://127.0.0.1:3000/classes/${1}`, { id: classe.id, name: classe.name, studentsId: classStudents }
    )
  } catch (error) {
  }
}

export const classService = {
  getClassById,
  getClasses,
  addStudent
}
