<script setup lang="ts"></script>

<template>
  <div class="container">
    <div>
      <h1>Changer le mot de passe</h1>
      <div class="row justify-content-center">
        <Form>
          <div class="mb-3">
            <label class="form-label" for="old-password">Ancien mot de passe</label>
            <Field
              type="password"
              class="form-control"
              id="old-password"
              name="old-password"
              rules="required"
              v-model="oldPassword"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="new-password">Nouveau mot de passe</label>
            <Field
              type="password"
              class="form-control"
              id="new-password"
              name="new-password"
              rules="required"
              v-model="newPassword"
            />
          </div>
          <button class="btn btn-primary" type="submit">Changer le mot de passe</button>
        </Form>
      </div>
    </div>
  </div>
</template>
<style></style>
