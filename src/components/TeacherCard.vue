<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { defineProps } from 'vue'
import { onMounted } from 'vue'



const userStore = useUserStore()
const authStore = useAuthStore()

const colors = ['red', 'yellow', 'green', 'god']

const props = defineProps({
    id: Number,
    isTeacher: Boolean
})
const id = props.id
const isTeacher = props.isTeacher

const teacher = ref(null)
let color = ref('')

onMounted(async () => {
    await userStore.getUserById(id)
    teacher.value = userStore.user
})

const getColor = computed(() => {
    const health = teacher.value?.health
    if (health <= 30)
        return ref(colors[0])
    else if (health <= 60)
        return ref(colors[1])
    else if (health <= 90)
        return ref(colors[2])
    else
        return ref(colors[3])
})


const changeHealth = async (healthChange: number) => {
    await userStore.healthChange(healthChange, id)
    await userStore.getUserById(id)
    teacher.value = userStore.user
}

</script>
<template>
    <div class="teacher-card col-9" v-if="teacher" :class="getColor.value">
        <h3>{{ teacher.name }}</h3>
        <h5>Points de vie: {{ teacher.health }}</h5>
        <button class="btn-green" @click="changeHealth(10)" name="addHealth" v-if="!isTeacher">+</button>
        <button class="btn-red" @click="changeHealth(-10)" name="removeHealth" v-if="!isTeacher">-</button>
    </div>
</template>


<style>
.teacher-card {
    position: relative;
    border: 2px solid #000000;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    min-width: 300px;
    max-width: 300px;
    min-height: fit-content;
    max-height: fit-content;
}

.btn-green {
    background-color: lime;
    color: black;
    font-size: large;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    padding: 10px;
    margin-right: 10px;
}

.btn-red {
    background-color: rgb(255, 0, 0);
    color: black;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    padding: 10px;
}


.red {
    width: 20%;
    padding: 10px;
    background-image: url(/src/assets/red.png);
}

.god {
    width: 20%;
    padding: 10px;
    background-image: url(/src/assets/rainbow.gif);
}

.green {
    width: 20%;
    padding: 10px;
    background-image: url(/src/assets/green.png);
}

.yellow {
    width: 20%;
    padding: 10px;
    background-image: url(/src/assets/yellow.png);
}
</style>
