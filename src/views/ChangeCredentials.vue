<script setup lang="ts">
import ChangePassword from '../components/ChangePassword.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="container">
    <div v-if="route.params.form === 'password'">
      <ChangePassword />
    </div>
  </div>
</template>
<style></style>
