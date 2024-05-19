<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useProfileStore } from '../stores/profileStore'
import { userService } from '@/services/userService'
import { RouterLink } from 'vue-router'

const profileStore = useProfileStore()

const name = computed(() => profileStore.name)
const email = computed(() => profileStore.email)
const role = computed(() => profileStore.role)
const onError = computed(() => profileStore.onError)

const editingName = ref(false)
const newName = ref('')

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

const saveName = () => {
  profileStore.updateProfileName(newName.value)
  editingName.value = false
}

const cancelEdit = () => {
  editingName.value = false
}
</script>

<template>
  <div>
    <h1>Profile</h1>
    <div>
      <p v-if="!editingName">
        Nom: {{ name }} <button class="btn btn-primary" @click="editingName = true">⚙️</button>
      </p>
      <p v-else>
        <input type="text" v-model="newName" :placeholder="name" />
        <button class="btn btn-primary" @click="saveName">Sauvegarder</button>
        <button class="btn btn-secondary" @click="cancelEdit">Annuler</button>
      </p>
    </div>
    <div>Courriel: {{ email }}</div>
    <div>Rôle: {{ role }}</div>
    <RouterLink :class="{ active: $route.name == 'ChangeCredentials' }"
      :to="{ name: 'ChangeCredentials', params: { form: 'password' } }">
      Changer le mot de passe
    </RouterLink>
  </div>
</template>

<style scoped></style>
