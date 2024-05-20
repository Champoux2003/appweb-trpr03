import { vi, describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { questionService } from '@/services/questionService'
import { useQuestionStore } from '../questionStore'


const pinia = createPinia()

vi.mock('@/services/questionService', () => ({
    questionService: {
        getAllQuestions: vi.fn(),
        getQuestionById: vi.fn(),
        createQuestion: vi.fn(),
        updateQuestion: vi.fn(),
        deleteQuestion: vi.fn(),
        getCategories: vi.fn(),
    }
    }))
    
describe('QuestionStore', () => {
    let questionStore: ReturnType<typeof useQuestionStore>
    beforeEach(() => {
        setActivePinia(pinia)
        questionStore = useQuestionStore()
    }
    )
    it('Can get all questions', async () => {
        const mockQuestions = [{ id: 1, title: 'Question 1' }, { id: 2, title: 'Question 2' }]
        questionService.getAllQuestions = vi.fn().mockReturnValue(mockQuestions)
        await questionStore.getQuestionsList()
        expect(questionService.getAllQuestions).toHaveBeenCalled()
    })

    it('Can get question by id', async () => {
        const id = 1
        const mockQuestion = { id: 1, title: 'Question 1' }
        questionService.getQuestionById = vi.fn().mockReturnValue(mockQuestion)
        await questionStore.getQuestionById(id)
        expect(questionService.getQuestionById).toHaveBeenCalledWith(id)
    })

    it('Can create a question', async () => {
        const question = { title: 'Question 1' }
        questionService.createQuestion = vi.fn().mockReturnValue(question)
        await questionStore.createQuestion(question)
        expect(questionService.createQuestion).toHaveBeenCalledWith(question)
    })

    it('Can delete a question', async () => {
        const id = 1
        questionService.deleteQuestion = vi.fn().mockReturnValue(id)
        await questionStore.deleteQuestion(id)
        expect(questionService.deleteQuestion).toHaveBeenCalledWith(id)
    })

    it('Can raise hand', async () => {
        const id = 1
        questionService.raiseHand = vi.fn().mockReturnValue(id)
        await questionStore.raiseHand(id)
        expect(questionService.raiseHand).toHaveBeenCalledWith(id)
    })

    it('Can lower hand', async () => {
        const id = 1
        const priority = 1
        questionService.lowerHand = vi.fn().mockReturnValue(id)
        await questionStore.lowerHand(id, priority)
        expect(questionService.lowerHand).toHaveBeenCalledWith(id, priority)
    })

    it('Can add a category', async () => {
        const category = 'Category 1';
        questionService.addCategory = vi.fn().mockReturnValue(undefined);
        await questionStore.addCategory(category);
        expect(questionService.addCategory).toHaveBeenCalledWith(category);
      })

      it('Can get all categories', async () => {
        const mockCategories = ['Category 1', 'Category 2'];
        questionService.getCategories = vi.fn().mockReturnValue(mockCategories);
        await questionStore.getCategories();
        expect(questionService.getCategories).toHaveBeenCalled();
      })

      it('Can answer a question', async () => {
        const id = 1;
        questionService.repondre = vi.fn().mockReturnValue(undefined);
        await questionStore.repondre(id);
        expect(questionService.repondre).toHaveBeenCalledWith(id);
      })
})
