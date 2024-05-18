<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { userService } from '../services/userService'
import { RouterLink, useRouter } from 'vue-router'
import { useProfileStore } from '../stores/profileStore'

const authStore = useAuthStore()
const profileStore = useProfileStore()

const router = useRouter()

const isLoggedIn = computed(() => authStore.isLoggedIn) ?? false

const isTeacher = computed(() => profileStore.role === 'teacher') ?? false

function logout() {
  authStore.logout()
  router.push({
    name: 'Login'
  })
}
</script>

<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-nav mr-auto">
        <!-- Le ":class={...}" veut dire si la route est égal à 'Home' alors "active" de bootstrap sera ajoutée à l'attribut "class". Ce qui aura comme effet de mettre en évidence l'option du menu. -->
        <RouterLink class="nav-link" :class="{ active: $route.name == 'Home' }" :to="{ name: 'Home' }">
          Accueil
        </RouterLink>

        <!-- Page question -->
        <RouterLink class="nav-link" :class="{ active: $route.name == 'Question' }" :to="{ name: 'Question' }">Question
        </RouterLink>

        <!-- La page Profile n'est accessible que si l'utilisateur est connecté (v-if). Voir la propriété calculée isLoggedIn() qui retourne la valeur de la propriété isLoggedIn du store. -->
        <RouterLink class="nav-link" :class="{ active: $route.name == 'Profile' }" v-if="isLoggedIn"
          :to="{ name: 'Profile' }">
          Profile
        </RouterLink>
        <RouterLink v-if="isLoggedIn && isTeacher" class="nav-link" :class="{ active: $route.name == 'Register' }"
          :to="{ name: 'Register' }">
          Ajouter un étudiant
        </RouterLink>
        <RouterLink v-if="isLoggedIn" class="nav-link" :class="{ active: $route.name == 'Classe' }"
          :to="{ name: 'Classe' }">
          Classe
        </RouterLink>
      </div>
      <div class="d-flex">
        <div class="navbar-nav ml-auto">
          <a class="nav-link" @click="logout" v-if="isLoggedIn" href="#"> Se déconnecter </a>
          <RouterLink v-else class="nav-link" :class="{ active: $route.name == 'Login' }" :to="{ name: 'Login' }">
            Connexion
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
