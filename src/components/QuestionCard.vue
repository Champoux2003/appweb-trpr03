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
  id: Number
})
const id = props.id
const question = ref(null)
const priority = ref(0)
const text = ref('')
const isTeacher = ref(false)
const user = ref(null)

onMounted(async () => {
  try {
    question.value = await questionStore.getQuestionById(id)
    await userStore.getUserById(question.value.userId)
    user.value = userStore.user
    userName.value = user.value?.name
    priority.value = question.value.priority
    text.value = question.value.question

    const userId = authStore.getUserId
    const loggedInUser = await userStore.getUserById(parseInt(userId))
    if (loggedInUser.role !== 'teacher') {
      isTeacher.value = false
    } else {
      isTeacher.value = true
    }
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
  } else {
    questionStore.lowerHand(id, priority.value)
  }
  handRaised.value = handRaised.value === 1 ? 0.5 : 1
  question.value = await questionStore.getQuestionById(id)
}
</script>
<template>
  <div>
    <div class="card" v-if="question">
      <p>Nom: {{ userName }}</p>
      <p>Question: {{ text }}</p>

      <!-- temporaire -->
      <p>Priorité: {{ question.priority }}</p>
      <img
        v-if="!isTeacher"
        src="/src/assets/man-raising-hand.png"
        alt="Lever la main"
        class="raise-hand-img"
        @click="raiseHand"
        :style="{ opacity: handRaised }"
      />

      <div class="button-group">
        <button class="btn btn-primary" @click="">Répondre</button>
        <button class="btn btn-danger" name="deleteQuestion" @click="deleteQuestion()">
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  position: relative;
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
