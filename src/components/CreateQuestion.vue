<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { useQuestionStore } from '@/stores/questionStore'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { required } from '@vee-validate/rules'


const questionStore = useQuestionStore()
const userStore = useUserStore()
const authStore = useAuthStore()

const emit = defineEmits(['question-created'])

defineRule('isRequired', required)
const isRequired = 'isRequired'



const categories = ref([])

const question = ref('')
const priority = ref(0)
const category = ref('')

onMounted(async () => {
  categories.value = await questionStore.getCategories()
})


const register = async () => {
  // Validation manuelle avant la soumission
  const result = await validate({}, {}, {})
  if (!result.valid) {
    return // Arrête la fonction si la validation échoue
  }
  const newQuestion = {
    userId: 0,
    question: '',
    priority: 0,
    category: ''
  }

  newQuestion.userId = await parseInt(authStore.getUserId)
  newQuestion.question = question.value as any
  newQuestion.priority = priority.value
  newQuestion.category = category.value as any

  console.log(newQuestion)

  question.value = ''
  priority.value = 0
  category.value = '' 

  await questionStore.createQuestion(newQuestion)

  emit('question-created')
}
</script>
<template>
  <div class="card">
    <div class="row justify-content-center">
      <Form>
        <div class="mb-3">
          <label for="question" class="form-label">Question</label>
          <Field type="text" class="form-control" id="question-input" name="question-input" :rules="isRequired" v-model="question" placeholder="Entrez une question"/>
          <ErrorMessage class="text-danger" name="question-input-error" />
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="priority" class="form-label">Priorité</label>
            <select class="form-control" id="priority-select" name="priority-select" :rules="isRequired" v-model="priority">
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="category" class="form-label">Catégorie</label>
            <select class="form-control" id="category-select" name="category-select" :rules="isRequired" v-model="category">
              <option v-for="n in categories" :value="n">{{ n.name }}</option>
            </select>
            <ErrorMessage class="text-danger" name="category" />
          </div>
        </div>
        <button v-if="question != '' && category != '' && priority != 0" type="submit" id="submit-btn" name="submit-question" class="btn btn-primary" @click="question != '' && category != '' && priority != 0 ? register() : null">Créer</button>
      </Form>
    </div>
  </div>
</template>
<style scoped>
.card {
  position: relative;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  position: relative;
  width: 500px;
  height: 225px;
  padding: 20px;
  margin: 20px;
  margin-left: 0px;
}
.btn-primary {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 25px;
  height: 40px;
  width: 100px;
  transform: translate(70%, 450%);
}
</style>
