<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useProfileStore } from '../stores/profileStore'
import { RouterLink } from 'vue-router'

const profileStore = useProfileStore()

const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const onError = computed(() => profileStore.onError)

onMounted(async () => {
  try {
    await profileStore.getProfile()
    if (onError.value) {
      // Utilisation d'une boîte de dialogue au lieu de 'confirm'
      confirm("Une erreur s'est produite lors de la récupération du profil de l'utilisateur.")
    }
  } catch (error) {
    confirm("Erreur critique lors de l'accès au store.")
  }
})
</script>

<template>
  <div>
    <h1>Profile</h1>
    <div>
      <p>Nom: {{ name }} <button class="btn btn-primary">⚙️</button></p>
    </div>
    <input type="text" v-model="name" placeholder="Nouveau nom" />
    <div>Courriel: {{ email }}</div>
    <div>Rôle:</div>
    <RouterLink
      :class="{ active: $route.name == 'ChangeCredentials' }"
      :to="{ name: 'ChangeCredentials', params: { form: 'password' } }"
    >
      Changer le mot de passe
    </RouterLink>
    <div>
      <RouterLink
        :class="{ active: $route.name == 'ChangeCredentials' }"
        :to="{ name: 'ChangeCredentials', params: { form: 'email' } }"
      >
        Changer le courriel
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
