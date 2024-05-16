<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuestionStore } from '@/stores/questionStore'
import { useUserStore } from '@/stores/userStore'
const questionStore = useQuestionStore()
const userStore = useUserStore()
const userName = ref('')
const kwestion = ref<any>({})
const props = defineProps<{
  id: number
}>()

onMounted(async () => {
  try {
    const question = await questionStore.getQuestionById(props.id)
    kwestion.value = question
    const user = await userStore.getUserById(question.userId)
    userName.value = user.name
    if (questionStore.onError) {
      confirm("Une erreur s'est produite lors de la récupération des questions.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store.")
  }
})

const deleteQuestion = (questionId: number) => {
  questionStore.deleteQuestion(questionId)
}
</script>
<template>
  <div>
    <div class="card">
      <p>Nom: {{ userName }}</p>
      <p>Question: {{ kwestion.question }}</p>
      <p>Priorité: {{ kwestion.priority }}</p>
    </div>
  </div>
  <button class="btn btn-primary" @click="">Répondre</button>
  <button class="btn btn-danger" @click="deleteQuestion(kwestion.id)">Supprimer</button>

  <!--<div class="col">
          <img class="img" src="../assets/man-raising-hand.png" @click="raiseHand()" :style="{ opacity: imageClicked ? '0.9': '1'}" v-if="!imageClicked"></img>
          <p v-else><img class="img" src="../assets/man-raising-hand.png" :style="{ opacity: imageClicked ? '0.5': '1'}"></img></p>
        </div>-->
</template>
