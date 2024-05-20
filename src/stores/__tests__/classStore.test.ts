import { useAuthStore } from '../authStore'
import { classService } from '@/services/classService'
import { useClassStore } from '../classStore'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { nextTick } from 'vue'

const pinia = createPinia()


vi.mock('@/services/classService', () => ({
  classService: {
    getClassById: vi.fn(),
    getClasses: vi.fn(),    
  }
}))
describe('getClassById', () => {
  let classStore: ReturnType<typeof useClassStore>

  beforeEach(() => {
    
    setActivePinia(pinia)
    classStore = useClassStore()

  })
it('fetches class by id and updates the value of classe', async () => {
    const id = 1
    const mockClass = { id: 1, name: 'Math' }
    classService.getClassById = vi.fn().mockReturnValue(mockClass)

    await classStore.getClassById(id)


    expect(classService.getClassById).toHaveBeenCalledWith(id)
   

  })

  it('handles error when fetching class by id', async () => {
    const id = 1
    const errorMessage = 'Failed to fetch class'
    classService.getClassById= vi.fn().mockReturnValue(new Error(errorMessage))

    await classStore.getClassById(id)

    expect(classService.getClassById).toHaveBeenCalledWith(id)

})
it('fetches classes and updates the value of classes', async () => {
  const mockClasses = [{ id: 1, name: 'Math' }, { id: 2, name: 'Science' }]
  classService.getClasses = vi.fn().mockReturnValue(mockClasses)

  await classStore.getClasses()

  expect(classService.getClasses).toHaveBeenCalled()
})

it('handles error when fetching classes', async () => {
  const errorMessage = 'Failed to fetch classes'
  classService.getClasses = vi.fn().mockReturnValue(new Error(errorMessage))

  await classStore.getClasses()

  expect(classService.getClasses).toHaveBeenCalled()
})
})