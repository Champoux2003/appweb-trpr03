<script setup lang="ts">
import { ref } from 'vue';

const student = ref({
    name: 'John Doe',
    email: 'asda'
});

</script>
<template>
    <div class="student-card">
        <h2>{{ student.name }}</h2>
        <p>{{ student.email }}</p>
        <!-- Add more student details here -->
    </div>
</template>
<style>
.student-card {
    border: 1px solid #4aa3a3;
    border-radius: 4px;
    padding: 20px;
    margin: 10px;
    width: 200px;
}
</style>