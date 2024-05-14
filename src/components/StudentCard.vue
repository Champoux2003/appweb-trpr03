<script setup lang="ts">
import { ref } from 'vue';





const colors = ['red', 'yellow', 'green', 'god']
function getColor(health: number) {
    if (health <= 30)
        return colors[0]
    else if (health <= 60)
        return colors[1]
    else if (health <= 90)
        return colors[2]
    else
        return colors[3]
}
</script>
<template>
    <div class="student-card col-9" :class="getColor(student.health)">
        <h3>{{ student.name }}</h3>
        <p>{{ student.email }}</p>
        <p>{{ student.health }}</p>
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

.red{
    width: 20%; padding: 10px; background-image: url(/src/assets/red.png);
}
.god{
    width: 20%; padding: 10px; background-image: url(/src/assets/rainbow.gif);
}
.green{
    width: 20%; padding: 10px; background-image: url(/src/assets/green.png);
}
.yellow{
    width: 20%; padding: 10px; background-image: url(/src/assets/yellow.png);
}
</style>