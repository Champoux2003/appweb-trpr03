<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useQuestionStore } from '@/stores/questionStore'
import QuestionCard from '@/components/QuestionCard.vue'
import CreateQuestion from '@/components/CreateQuestion.vue'
import { useUserStore } from '@/stores/userStore'

const questionStore = useQuestionStore()
const userStore = useUserStore()
const questionsList = computed(() => questionStore.questions) //questions est un tableau de questions
const user = computed(() => userStore.user)
onMounted(async () => {
  try {
    await questionStore.getQuestionsList()

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
        <div class="row" v-for="quest in questionsList">
          <QuestionCard :id="quest.id" :key="`${quest.id}-${selectedOption}`"/>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
img {
  width: 40%;
  height: 100%;
}

.btn-group {
  margin: 10px;
}
</style>
