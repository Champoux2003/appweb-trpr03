import { describe, it, expect, vi, beforeEach } from 'vitest'
import Classroom from '../Classroom.vue'
import { useClassStore } from '@/stores/classStore'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { setActivePinia } from 'pinia'
import TeacherCard from '@/components/TeacherCard.vue'

describe('Classroom', async () => {
  beforeEach(() => {
    setActivePinia(createTestingPinia({ createSpy: vi.fn }))
  })

  it('should render classroom', () => {
    const wrapper = mount(Classroom, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      },

    })
    const store = useClassStore()
    store.getClassById = vi.fn()


  })
})
