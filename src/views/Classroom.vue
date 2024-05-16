<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useQuestionStore } from '@/stores/questionStore';
import { userService } from '@/services/userService';
import StudentCard from '@/components/StudentCard.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useClassStore } from '@/stores/classStore';

// Fetch the students data here
const router = useRouter()
const authStore = useAuthStore()

const classStore = useClassStore()
const studentsId = ref([])

onMounted(async() => {
    await classStore.getClassById(1)
    studentsId.value = await classStore.classe.studentsId
})


</script>
<template>
    <div class="classroom">
        <h1>Classe</h1>
       
        <div v-for="studentId in studentsId" :key="studentId">
            <StudentCard :id="studentId"/>
        </div>
    </div>
</template>
<style>
</style>