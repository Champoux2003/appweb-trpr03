<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { defineProps } from 'vue'
import { onMounted } from 'vue'


const userStore = useUserStore()

const colors = ['red', 'yellow', 'green', 'god']

const getColor = (health: number) => {
    if (health <= 30)
        return colors[0]
    else if (health <= 60)
        return colors[1]
    else if (health <= 90)
        return colors[2]
    else
        return colors[3]
}

const props = defineProps({
    id: Number
})

const student = ref(null)
onMounted(async () => {
    await userStore.getUserById(props.id)
    student.value = userStore.user
})

</script>
<template>
    <div class="student-card col-9" v-if="student" :class="getColor(student.health)">
        <h3>{{ student.name }}</h3>

        <!-- ajouter bouton pour ajouter et retirer la vie -->
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
