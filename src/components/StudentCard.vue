<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { defineProps } from 'vue'
import { onMounted } from 'vue'


const userStore = useUserStore()

const colors = ['red', 'yellow', 'green', 'god']

const props = defineProps({
    id: Number
})
const id = props.id

const student = ref(null)
let color = ref('') 

onMounted(async () => {
    await userStore.getUserById(id)
    student.value = userStore.user
})

const getColor =computed(() => {
    const health = student.value?.health
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
    student.value = userStore.user
}

</script>
<template>
    <div class="student-card col-9" v-if="student" :class="getColor.value">
        <h3>{{ student.name }}</h3>
        <button class="btn-green" @click="changeHealth(10)">+</button>
        <button class="btn-red" @click="changeHealth(-10)">-</button>
    </div>
</template>


<style>
.student-card {
    border: 1px solid #4aa3a3;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    width: 200px;
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
