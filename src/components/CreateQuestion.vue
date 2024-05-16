<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { useQuestionStore } from '@/stores/questionStore'
import { useUserStore } from '@/stores/userStore'
const questionStore = useQuestionStore()
const userStore = useUserStore()
defineRule('isRequired', required)

const register = async () => {
  // Validation manuelle avant la soumission
  const result = await validate({}, {}, {})

  if (!result.valid) {
    return // Arrête la fonction si la validation échoue
  }
  const newQuestion = {
    userId: userStore.user.id,
    question: question.value,
    priority: priority.value
  }
  console.log(newQuestion)
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
            :rules="isRequired"
          />
          <ErrorMessage class="text-danger" name="question" />
        </div>
        <div class="mb-3">
          <label for="priority" class="form-label">Priorité</label>
          <Field
            type="text"
            class="form-control"
            id="priority"
            name="priority"
            :rules="isRequired"
          />
          <ErrorMessage class="text-danger" name="priority" />
        </div>
        <button type="submit" class="btn btn-primary">Créer</button>
      </Form>
    </div>
  </div>
</template>
<style></style>
