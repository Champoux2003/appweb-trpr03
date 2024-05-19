<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuestionStore } from '@/stores/questionStore'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'

const questionStore = useQuestionStore()
const userStore = useUserStore()
const authStore = useAuthStore()
const userName = ref('')
const props = defineProps({
  id: Number,
  isTeacher: Boolean
})
const id = props.id
const question = ref(null)
const priority = ref(null)
const text = ref('')
const category = ref('')

const isTeacher = props.isTeacher
const user = ref(null)



onMounted(async () => {
  try {
    question.value = await questionStore.getQuestionById(id)

    const userId = question.value?.userId
    await userStore.getUserById(userId)
    user.value = userStore.user
    
    userName.value = user.value?.name
    priority.value = question.value?.priority
    category.value = question.value?.category 
    text.value = question.value?.question 
  } catch (error) {}
})

const deleteQuestion = () => {
  questionStore.deleteQuestion(id)
  question.value = null
}

const handRaised = ref(1)

const raiseHand = async () => {
  // allows to raise and lower hand raising the hand makes the question priority 1
  if (handRaised.value === 1) {
    questionStore.raiseHand(id)
    priority.value = 0 as any
  } else {
    questionStore.lowerHand(id, priority.value)
    priority.value = question.value?.priority as any
  }
  handRaised.value = handRaised.value === 1 ? 0.5 : 1
  question.value = await questionStore.getQuestionById(id)
}
const buttonClicked = ref(false)
const repondre = async () => {
  questionStore.repondre(id)
  buttonClicked.value = true
}

</script>
<template>
  <div :class="{'ongoing': buttonClicked || priority == -1}">
    <div class="card" :class="{'urgent': priority == 0 && isTeacher}" v-if="question">
      <p>Nom: {{ userName }}</p>
      <p>Question: {{ text }}</p>
      <p>Catégorie: {{ category }}</p>
      <img v-if="question.userId == parseInt(authStore.getUserId) && !isTeacher" src="/src/assets/man-raising-hand.png" alt="Lever la main" class="raise-hand-img" @click="raiseHand" :style="{ opacity: handRaised}" name="hand">
      <div class="button-group">
        <button class="btn btn-primary" name="repondre" @click="repondre()" v-if="isTeacher">Répondre</button>
        <button class="btn btn-danger" name="deleteQuestion" @click="deleteQuestion()" v-if="buttonClicked || isTeacher || question.userId == parseInt(authStore.getUserId)">
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.ongoing > .card {
  background-image: url(/src/assets/yellow.png);
}
.urgent {
  background-image: url(/src/assets/red.png);
}

.card {
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  position: relative;
  padding: 10px;
  margin-top: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin-top: 20px;
}

.button-group .btn {
  width: 80px;
  padding: 5px;
  font-size: 0.8em;
  margin: 0 10px;
  margin-bottom: 10px;
}

.raise-hand-img {
  width: 80px;
  height: 80px;
  position: absolute;
  right: 0;
  transform: translate(0%, 50%);
}
</style>
