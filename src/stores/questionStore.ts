import { defineStore } from "pinia";
import { ref } from "vue";
import { questionService } from "../services/questionService";

export const useQuestionStore = defineStore("questionStoreId", () => {
  const questions = ref([]);
  const onError = ref(false);

  function _initializeQuestions(questionsList : any) {
    questions.value = questionsList;
    onError.value = false;
  }

  async function getQuestionsList() {
    try {
      onError.value = false;
      const questionsList = await questionService.getAllQuestions();
      _initializeQuestions(questionsList);
    } catch (error) {
      onError.value = true;
    }
  }
/*
  async function createQuestion(question: any) {
    try {
      onError.value = false;
      await questionService.createQuestion(question);
    } catch (error) {
      onError.value = true;
    }
  }

  async function updateQuestion(question : any) {
    try {
      onError.value = false;
      await questionService.updateQuestion(question);
    } catch (error) {
      onError.value = true;
    }
  }

  async function deleteQuestion(questionId: string) {
    try {
      onError.value = false;
      await questionService.deleteQuestion(questionId);
    } catch (error) {
      onError.value = true;
    }
  }
*/
  return {
    questions,
    onError,
    getQuestionsList,
    //createQuestion,
    //updateQuestion,
    //deleteQuestion,
  };
});
