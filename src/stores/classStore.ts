import { defineStore } from 'pinia'
import { classService } from '../services/classService'
import { useAuthStore } from './authStore'
import { ref } from 'vue'

export const useClassStore = defineStore('classStore', () => {
    const classes = ref([])
    const classe = ref(null)
    async function getClassById(id: number) {
        try {
            classe.value = await classService.getClassById(id)
            return classe

        } catch (error) {
        }
    }
    async function getClasses() {
        try {
            classes.value = await classService.getClasses()
            return classes

        } catch (error) {
        }
    }

    async function deleteStudentFromClass(studentId: number) {
        try {
            await classService.deleteStudentFromClass(studentId)
            return true
        } catch (error) {
            return false
        }
    }
    return {
        getClassById,
        getClasses,
        classes,
        classe,
        deleteStudentFromClass,
    }
})
