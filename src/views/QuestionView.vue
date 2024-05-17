<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useQuestionStore } from '@/stores/questionStore'
import QuestionCard from '@/components/QuestionCard.vue'
import CreateQuestion from '@/components/CreateQuestion.vue'
import { useProfileStore } from '@/stores/profileStore'

const questionStore = useQuestionStore()
const profileStore = useProfileStore()
const questionsList = computed(() => questionStore.questions) //questions est un tableau de questions

onMounted(async () => {
  await questionStore.getQuestionsList()
})
//const imageClicked = ref(false)

const selectedOption = ref('Plus récent')
/*
const raiseHand = () => {
  if (!imageClicked.value) {
    imageClicked.value = true
  }
}*/

const isTeacher = computed(() => profileStore.role === 'teacher') ?? false

const selectOption = (option: string) => {
  selectedOption.value = option
}
</script>
<template>
  <div class="container">
    <div>
      <h1>Question</h1>
      <div v-if="isTeacher">
        <!-- remettre isTeacher-->
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ selectedOption }}
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#" @click="selectOption('Plus récent')">Plus récent</a>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="selectOption('Plus ancien')">Plus ancien</a>
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="selectOption('Priorité')">Priorité</a>
            </li>
          </ul>

          <button id="category" class="btn btn-primary" @click="questionStore.getQuestionsList()">
            Créer catégorie
          </button>
        </div>
        <div>
          <div class="row" v-for="quest in questionsList">
            <QuestionCard :id="quest.id" />
          </div>
        </div>
      </div>
      <div v-else>
        <CreateQuestion />
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
#category {
  margin-left: 10px;
}
</style>
