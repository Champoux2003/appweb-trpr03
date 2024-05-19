import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { beforeEach } from 'node:test'
import { setActivePinia } from 'pinia'
import { useQuestionStore } from '@/stores/questionStore'
import { useAuthStore } from '@/stores/authStore'
import CreateQuestion from '../CreateQuestion.vue'

describe('CreateQuestion', () => {
    beforeEach(() => {
        setActivePinia(createTestingPinia({createSpy: vi.fn }))
    })

    it('can create question', async () => {
        const wrapper = mount(CreateQuestion, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
            }
        })

        const store = useQuestionStore()
        const authStore = useAuthStore()
        // Mock the createQuestion function
        store.createQuestion = vi.fn()

        // Simulate filling the question field

        await wrapper.find('#question-input').setValue('How are you?')
        await wrapper.find('#priority-select').setValue(1)
        await wrapper.find('#category-select').setValue('Test')

        // Simulate clicking the submit button
        await wrapper.find('#submit-btn').trigger('click')

        // Check if the createQuestion function was called
        expect(store.createQuestion).toHaveBeenCalled()
    })
    it('cannot create question with empty text', async () => {
        const wrapper = mount(CreateQuestion, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
            }
        })

        const store = useQuestionStore()
        const authStore = useAuthStore()
        // Mock the createQuestion function
        store.createQuestion = vi.fn()
        
        // Simulate filling the question field
        await wrapper.find('#question-input').setValue('')//empty question
        await wrapper.find('#priority-select').setValue(1)
        await wrapper.find('#category-select').setValue('Test')

        // Simulate clicking the submit button
        await wrapper.find('#submit-btn').trigger('click')

        // Check if the createQuestion function was called
        expect(store.createQuestion).not.toHaveBeenCalled()
    })

    it('cannot create question with empty priority', async () => {
        const wrapper = mount(CreateQuestion, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
            }
        })

        const store = useQuestionStore()
        const authStore = useAuthStore()
        // Mock the createQuestion function
        store.createQuestion = vi.fn()
        
        // Simulate filling the question field
        await wrapper.find('#question-input').setValue('Question?')

        await wrapper.find('#category-select').setValue('Test')

        // Simulate clicking the submit button
        await wrapper.find('#submit-btn').trigger('click')

        // Check if the createQuestion function was called
        expect(store.createQuestion).not.toHaveBeenCalled()
    })

    it('cannot create question with empty category', async () => {
        const wrapper = mount(CreateQuestion, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
            }
        })

        const store = useQuestionStore()
        const authStore = useAuthStore()
        // Mock the createQuestion function
        store.createQuestion = vi.fn()
        
        // Simulate filling the question field
        await wrapper.find('#question-input').setValue('Question?')
        await wrapper.find('#priority-select').setValue(1)

        // Simulate clicking the submit button
        await wrapper.find('#submit-btn').trigger('click')

        // Check if the createQuestion function was called
        expect(store.createQuestion).not.toHaveBeenCalled()
    })
})
