<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
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
        <RouterLink
          class="nav-link"
          :class="{ active: $route.name == 'Home' }"
          :to="{ name: 'Home' }"
          id="home"
        >
          Accueil
        </RouterLink>

        <!-- Page question -->
        <RouterLink
          class="nav-link"
          :class="{ active: $route.name == 'Question' }"
          :to="{ name: 'Question' }"
          v-if="isLoggedIn"
          id="question"
          >Question
        </RouterLink>

        <!-- La page Profile n'est accessible que si l'utilisateur est connecté (v-if). Voir la propriété calculée isLoggedIn() qui retourne la valeur de la propriété isLoggedIn du store. -->
        <RouterLink
          class="nav-link"
          :class="{ active: $route.name == 'Profile' }"
          v-if="isLoggedIn"
          :to="{ name: 'Profile' }"
          id="profile"
        >
          Profile
        </RouterLink>
        <RouterLink
          v-if="isLoggedIn && isTeacher"
          class="nav-link"
          :class="{ active: $route.name == 'Register' }"
          :to="{ name: 'Register' }"
          id="register"
        >
          Ajouter un étudiant
        </RouterLink>
        <RouterLink
          v-if="isLoggedIn"
          class="nav-link"
          :class="{ active: $route.name == 'Classe' }"
          :to="{ name: 'Classe' }"
          id="classe"
        >
          Classe
        </RouterLink>
      </div>
      <div class="d-flex">
        <div class="navbar-nav ml-auto" id="login-logout">
          <a class="nav-link" @click="logout" v-if="isLoggedIn" href="#" id="logout">
            Se déconnecter
          </a>
          <RouterLink
            v-else
            class="nav-link"
            :class="{ active: $route.name == 'Login' }"
            :to="{ name: 'Login' }"
            id="login"
          >
            Connexion
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
