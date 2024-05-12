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
//const students = await userService.getUsersList()

</script>
<template>
    <div class="classroom">
        <h1>Classe</h1>
            <StudentCard v-for="student in students" :key="student.id" :student="student" />
        
    </div>
</template>
<style></style>