<script setup lang="ts">
import ChangePassword from '../components/ChangePassword.vue'
import ChangeEmail from '../components/ChangeEmail.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="container">
    <div v-if="route.params.form === 'password'">
      <ChangePassword />
    </div>
    <div v-else-if="route.params.form === 'email'">
      <ChangeEmail />
    </div>
  </div>
</template>
<style></style>
