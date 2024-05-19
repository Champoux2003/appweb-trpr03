<script setup lang="ts"></script>

<template>
  <div class="home">
    <h1>Accueil</h1>
    <p>La page "Accueil" est accessible par tout le monde.</p>

    <div class="page-btn">
      <h2>Question</h2>
      <p>La page "Question" est accessible par tout le monde qui est connecté</p>
      <RouterLink class="nav-link" :class="{ active: $route.name == 'Question' }" :to="{ name: 'Question' }">
        <button class="btn btn-secondary">
          Question
        </button>
      </RouterLink>
    </div>
    <div class="page-btn">
      <h2>Profile</h2>
      <p>La page "Profile" est accessible par tout le monde qui est connecté</p>
      <RouterLink class="nav-link" :class="{ active: $route.name == 'Profile' }" :to="{ name: 'Profile' }">
        <button class="btn btn-secondary">
          Profile
        </button>
      </RouterLink>
    </div>
    <div class="page-btn">
      <h2>Classe</h2>
      <p>La page "Classe" est accessible par tout le monde qui est connecté</p>
      <RouterLink class="nav-link" :class="{ active: $route.name == 'Classe' }" :to="{ name: 'Classe' }">
        <button class="btn btn-secondary">
          Classe
        </button>
      </RouterLink>
    </div>
    <div class="page-btn">
      <h2>Register</h2>
      <p>La page d'ajout d'un étudiant est accessible par un professeur</p>
      <RouterLink class="nav-link" :class="{ active: $route.name == 'Register' }" :to="{ name: 'Register' }">
        <button class="btn btn-secondary">
          Register
        </button>
      </RouterLink>
    </div>
    <div class="page-btn">
      <h2>Login</h2>
      <p>La page de connection est accessible par tout le monde qui n'est pas connecté</p>
      <RouterLink class="nav-link" :class="{ active: $route.name == 'Register' }" :to="{ name: 'Register' }">
        <button class="btn btn-secondary">
          Login
        </button>
      </RouterLink>
    </div>
    <div class="page-btn">
      <h2>Not Found</h2>
      <p>La page d'erreur est accessible par tout le monde</p>
      <RouterLink class="nav-link" :class="{ active: $route.name == 'NotFound' }" :to="{ name: 'NotFound' }">
        <button class="btn btn-secondary">
          Erreur
        </button>
      </RouterLink>
    </div>

  </div>
</template>
<style scoped>
.page-btn {
  margin: 20px;
}

.home {
  margin: 10px;
}
</style>