<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useQuestionStore } from '@/stores/questionStore'
import QuestionCard from '@/components/QuestionCard.vue'
import CreateQuestion from '@/components/CreateQuestion.vue'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'

const questionStore = useQuestionStore()
const userStore = useUserStore()
const authStore = useAuthStore()
const questionsList = computed(() => questionStore.questions) //questions est un tableau de questions
const user = computed(() => userStore.user)

const loggedInUser = ref(null)
const isTeacher = ref(false)

let category = ref('')
onMounted(async () => {
  try {
    await questionStore.getQuestionsList()
    await userStore.getUserById(parseInt(authStore.getUserId))
    loggedInUser.value = userStore.user

    if (loggedInUser.value?.role === 'teacher') {
      isTeacher.value = true
    }

    if (questionStore.onError) {
      confirm("Une erreur s'est produite lors de la récupération des questions.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store.")
  }
})

const selectedOption = ref('Plus récent')

const selectOption = (option: string) => {
  selectedOption.value = option
  if (option === 'Plus récent') {
    questionsList.value.sort((a, b) => a.id - b.id); // sort by id
  }
  else if (option === 'Plus ancien') {
    questionsList.value.sort((a, b) => b.id - a.id); // sort by id descending
  }
  else if (option === 'Priorité') {
    questionsList.value.sort((a, b) => a.priority - b.priority); // sort by priority
  }
}

const addCategory = () => {
  console.log(category.value)
  questionStore.addCategory(category.value)
  category.value = ''
}

const updateQuestions = async() => {
  questionStore.getQuestionsList()
}
</script>
<template>
  <div class="container">
    <div>
      <h1>Question</h1>
      <div class="btn-group">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          {{ selectedOption }}
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="#" @click="selectOption('Plus récent')">Plus récent</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="selectOption('Plus ancien')">Plus ancien</a>
          </li>
          <li><a class="dropdown-item" href="#" @click="selectOption('Priorité')">Priorité</a></li>
        </ul>
      </div>
      <div>
        <div class="input-group" v-if="isTeacher">
          <input type="text" class="form-control form-control-sm" placeholder="Ajouter une catégorie" v-model="category"/>
          <button type="button" class="btn btn-primary btn-sm" @click="addCategory()">Ajouter</button>
        </div>
        <div class="input-group" v-else-if="!isTeacher">
          <CreateQuestion @question-created="updateQuestions"/>
        </div>
      </div>

      <div>
        <div class="row" v-for="quest in questionsList">
          <QuestionCard :id="quest.id" :key="`${quest.id}-${selectedOption}`" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
img {
  width: 40%;
  height: 100%;
}

.btn-group {
  margin: 10px;
}

.input-group {
  display: flex;
  justify-content: space-between;
  width: 300px;
}
</style>
