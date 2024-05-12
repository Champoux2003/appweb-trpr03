<script setup lang="ts">
import{ computed, ref, onMounted } from 'vue'  
import { useQuestionStore } from '@/stores/questionStore';
import {userService} from '@/services/userService';

interface Question {
  id: string;
  userId: string;
  question: string;
  priority: string;
}

const questionStore = useQuestionStore()
const questionsList = computed(() => questionStore.questions)//questions est un tableau de questions
const userList = ref([])

onMounted(async () => {
  try {
    await questionStore.getQuestionsList()
    userList.value = await userService.getUsersList()

    if (questionStore.onError) {
      confirm("Une erreur s'est produite lors de la récupération des questions.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store.")
  }
})
const imageClicked = ref(false) 
const answer = ref(false) 
const selectedOption = ref('Plus récent')


const raiseHand = () => {
  if(!imageClicked.value){
    imageClicked.value = true 
  }
}
const respond = () => {
  if(!answer.value){
    answer.value = true 
  }
}
const selectOption = (option: string) => {
  selectedOption.value = option
}

const getUser = (userId:string) => {
const user = userList.value.find(user => question.userId === userId)
return user ? user.name: 'Utilisateur inconnu';
}

</script>
<template>
  <div class="container">
    <div>
      <h1>Question</h1>
      <div class="btn-group">
        <button type="button" class=" btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{{ selectedOption }}</button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" @click="selectOption('Plus récent')">Plus récent</a></li>
          <li><a class="dropdown-item" href="#" @click="selectOption('Plus ancien')">Plus ancien</a></li>
          <li><a class="dropdown-item" href="#" @click="selectOption('Priorité')">Priorité</a></li>
        </ul>
      </div>
     <div>
      <div class="row"  v-for="question in questionsList">
        <div class="card col-9">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div>{{ getUser(question.userId)}}</div>
              <div>{{ question.priority }}</div>
              <div>{{question.question}}</div>
              <button class="btn btn-primary" @click="respond()">Répondre</button>
              <button class="btn btn-danger">Supprimer</button>
            </li>
            <p v-if="answer"><input type="text"></p> 
          </ul>
        </div>
        <div class="col">
          <img class="img" src="../assets/man-raising-hand.png" @click="raiseHand()" :style="{ opacity: imageClicked ? '0.9': '1'}" v-if="!imageClicked"></img>
          <p v-else><img class="img" src="../assets/man-raising-hand.png" :style="{ opacity: imageClicked ? '0.5': '1'}"></img></p>
        </div>
      </div>

     </div>
      
    </div>
  </div>
</template>
<style>
img{
  width: 40%;
  height: 100%;
}
.btn-group{
  margin: 10px;
}
</style>
