<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useQuestionStore } from '@/stores/questionStore'
import { useAuthStore } from '@/stores/authStore'

interface Question {
  userId: number
  question: string
  priority: number
}
const questionStore = useQuestionStore()

const authStore = useAuthStore()
const question = ref('')
const priority = ref(0)

defineRule('isRequired', required)
const isRequired = (value: any) => (!value ? 'Ce champ est requis.' : true)

const register = async () => {
  // Validation manuelle avant la soumission
  const result = await validate({}, {}, {})

  if (!result.valid) {
    return // Arrête la fonction si la validation échoue
  }
  const newQuestion: Question = {
    userId: parseInt(authStore.getUserId),
    question: question.value,
    priority: priority.value
  }

  await questionStore.createQuestion(newQuestion)
}
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <Form @submit="register">
        <div class="mb-3">
          <label for="question" class="form-label">Question</label>
          <Field
            type="text"
            class="form-control"
            id="question"
            name="question"
            v-model="question"
            :rules="isRequired"
          />
          <ErrorMessage class="text-danger" name="question" />
        </div>
        <div class="mb-3">
          <label for="priority" class="form-label">Priorité (1-5): </label>
          <select class="form-control" id="priority" v-model="priority">
            <option disabled value="">Veuillez sélectionner une priorité</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Créer</button>
      </Form>
    </div>
  </div>
</template>
<style></style>
