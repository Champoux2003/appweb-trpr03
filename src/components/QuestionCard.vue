<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useQuestionStore } from '@/stores/questionStore'
import { useUserStore } from '@/stores/userStore'
const questionStore = useQuestionStore()
const userStore = useUserStore()
const userName = ref('')
const question = ref(null)
const props = defineProps<{
  id: number
}>()
const user = ref(null)

onMounted(async () => {
  await questionStore.getQuestionById(props.id)
  question.value = questionStore.question
  await userStore.getUsers()

  user.value = userStore.users.find((user) => user.id === question.value?.userId)
  console.log(user.value)
  userName.value = user.value?.name
})

const deleteQuestion = () => {
  questionStore.deleteQuestion(question.value?.id)
  question.value = null
  //questionStore.getQuestionsList()
}
</script>
<template>
  <div v-if="question">
    <div class="card">
      <p>Nom: {{ userName }}</p>
      <p>Question: {{ question.question }}</p>
      <p>Priorité: {{ question.priority }}</p>
      <p>Catégorie: {{ question.category }}</p>
    </div>

    <button class="btn btn-primary" @click="">Répondre</button>
    <button class="btn btn-danger" @click="deleteQuestion()">Supprimer</button>
  </div>
  <!--<div class="col">
          <img class="img" src="../assets/man-raising-hand.png" @click="raiseHand()" :style="{ opacity: imageClicked ? '0.9': '1'}" v-if="!imageClicked"></img>
          <p v-else><img class="img" src="../assets/man-raising-hand.png" :style="{ opacity: imageClicked ? '0.5': '1'}"></img></p>
        </div>-->
</template>
