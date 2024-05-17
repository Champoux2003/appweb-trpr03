import { defineStore } from "pinia";
import { ref } from "vue";
import { questionService } from "../services/questionService";

interface Question {
  userId: number,
  question: string,
  priority: number,
  categoryId: number,
}
export const useQuestionStore = defineStore("questionStoreId", () => {
  const questions = ref([]);
  const onError = ref(false);
  const question = ref(null);
/*
  function _initializeQuestions(questionsList : any) {
    questions.value = questionsList;
    onError.value = false;
  }
*/
  async function getQuestionsList() {
    try {
      onError.value = false;
      const questionsList = await questionService.getAllQuestions();
      //_initializeQuestions(questionsList);
      questions.value = questionsList;
    } catch (error) {
      onError.value = true;
    }
  }
  async function getQuestionById(questionId: number) {
    try {
      onError.value = false;
      question.value = await questionService.getQuestionById(questionId)
      return question;
    } catch (error) {
      onError.value = true;
    }
  }

  async function createQuestion(question: Question) {
    try {
      onError.value = false;
      await questionService.createQuestion(question);
    } catch (error) {
      onError.value = true;
    }
  }

  async function deleteQuestion(questionId: number) {
    try {
      onError.value = false;
      await questionService.deleteQuestion(questionId);
     // await getQuestionsList();
    } catch (error) {
      onError.value = true;
    }
  }

  return {
    questions,
    onError,
    getQuestionsList,
    getQuestionById,
    createQuestion,
    deleteQuestion,
    question,
  };
});
