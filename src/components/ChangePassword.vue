<script setup lang="ts">
import router from '@/router'
import { useProfileStore } from '@/stores/profileStore'
import { ref } from 'vue'

const profileStore = useProfileStore()
const password = ref('')

const changePassword = () => {
  profileStore.changePassword(password.value)
  router.push({ name: 'Profile' })
}
</script>
<template>
  <h1>Changer le mot de passe</h1>
  <form>
    <div class="row justify-content-center">
      <div class="mb-3">
        <label class="form-label" for="old-password">Ancien mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="old-password"
          name="old-password"
          rules="required"
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="new-password">Nouveau mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="new-password"
          name="new-password"
          v-model="password"
          rules="required"
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="confirm-password">Confirmer le nouveau mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="confirm-password"
          name="confirm-password"
          rules="required"
        />
      </div>
    </div>
    <button class="btn btn-primary" id="submit-btn" type="submit" @click="changePassword()">
      Changer le mot de passe
    </button>
  </form>
</template>
