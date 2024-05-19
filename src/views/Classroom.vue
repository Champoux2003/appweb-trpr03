<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import StudentCard from '@/components/StudentCard.vue';
import TeacherCard from '@/components/TeacherCard.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useClassStore } from '@/stores/classStore';

// Fetch the students data here
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

const classStore = useClassStore()
const studentsId = ref(null)
const classe = ref(null)
const teacherId = ref(null)

const isTeacher = ref(null)

onMounted(async () => {
    await classStore.getClassById(1)
    classe.value = classStore.classe
    teacherId.value = classe.value?.teacherId
    studentsId.value = classe.value?.studentsId

    const userId = await authStore.getUserId
    await userStore.getUserById(parseInt(userId))
    const loggedInUser = userStore.user
    if (loggedInUser?.role !== 'teacher') {
        isTeacher.value = false
    } else {
        isTeacher.value = true
    }
})


</script>
<template>
    <div class="classroom" v-if="teacherId != null && isTeacher != null">
        <h1>{{ classe?.name }}</h1>
        <h2>Professeur</h2>
        <div>
            <TeacherCard v-if="teacherId != null" :id="teacherId" :isTeacher="isTeacher" />
        </div>
        <h2>Élèves</h2>
        <div class="students-grid">
            <StudentCard v-if="teacherId != null" :id="studentId" :isTeacher="isTeacher" v-for="studentId in studentsId" :key="studentId" />
        </div>
    </div>
</template>
<style>
.students-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}
</style>