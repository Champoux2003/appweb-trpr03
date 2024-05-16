<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useQuestionStore } from '@/stores/questionStore';
import { userService } from '@/services/userService';
import StudentCard from '@/components/StudentCard.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

// Fetch the students data here
const router = useRouter()
const authStore = useAuthStore()

//temporaire va devenir userService.getUsers()
const users = userService.getUsersList()
const userList = ref([])

const students = ref([])    
/*
onMounted(() => {
    for (let i = 0; i < users.length; i++) {
        if (userList[i].role === 'student') {
            students.value.push(users[i])
        }
    }
})
*/



</script>
<template>
    <div class="classroom">
        <h1>Classe</h1>
       
        <div v-for="student in students" :key="students.id">
            <StudentCard :id="id"/>
        </div>
        

        
    </div>
</template>
<style>
</style>