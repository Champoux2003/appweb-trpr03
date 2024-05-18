import { defineStore } from "pinia";
import { ref } from "vue";
import { questionService } from "../services/questionService";

export const useQuestionStore = defineStore("questionStoreId", () => {
  const questions = ref([]);
  const onError = ref(false);
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
      return await questionService.getQuestionById(questionId);
    } catch (error) {
      onError.value = true;
    }
  }

  async function createQuestion(question: any) {
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
    } catch (error) {
      onError.value = true;
    }
  }

  async function raiseHand(questionId: number) {
    try {
      onError.value = false;
      await questionService.raiseHand(questionId);
    } catch (error) {
      onError.value = true;
    }
  }
  async function lowerHand(questionId: number, priority: number) {
    try {
      onError.value = false;
      await questionService.lowerHand(questionId, priority);
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
    raiseHand,
    lowerHand,
  };
});
