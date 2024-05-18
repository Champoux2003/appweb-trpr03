<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'


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
    <button class="btn btn-primary" type="submit">Changer le mot de passe</button>
  </form>
</template>
