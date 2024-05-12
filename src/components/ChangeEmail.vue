<script setup lang="ts"></script>

<template>
  <h1>Changer l'email de connexion</h1>
  <form>
    <div class="row justify-content-center">
      <div class="mb-3">
        <label class="form-label text-center" for="new-email">Nouveau courriel</label>
        <input type="email" class="form-control" id="new-email" name="new-email" rules="required" />
      </div>
      <div class="mb-3">
        <label class="form-label text-center" for="confirm-email"
          >Confirmer le nouveau courriel</label
        >
        <input
          type="email"
          class="form-control"
          id="confirm-email"
          name="confirm-email"
          rules="required"
        />
      </div>
    </div>
    <button class="btn btn-primary" type="submit">Changer l'email de connexion</button>
  </form>
</template>
