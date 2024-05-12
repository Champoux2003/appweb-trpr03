<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore'
import { userService } from '@/services/userService'
import User from '../scripts/user'


// Définir les règles de validation
defineRule('isRequired', required)
const isRequired = (value : any) => (!value ? 'Ce champ est requis.' : true)

const router = useRouter()
const authStore = useAuthStore()
const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('student') //can only register a student. Teacher are created by the school

const authServiceError = computed(() => authStore.authServiceError)


onMounted(() => {
    authStore.clearError()
})

const register = async () => {
    // Validation manuelle avant la soumission
    const result = await validate({}, {}, {})

    if (!result.valid) {
        return // Arrête la fonction si la validation échoue
    }
    const newUser = new User(email.value, password.value, name.value, role.value)


    await userService.createUser(newUser)

    if (!authStore.authServiceError) {
        router.push({ name: 'Profile' })
    }
}
</script>
<template>
    <div>
        <h1>Connexion</h1>
        <div class="container my-5">
            <div class="row justify-content-center">
                <!-- avec VeeValidate on utilise Form au lieu de form et pas de .prevent comme dans l'exemple de Vue Router.... -->
                <Form @submit="register">
                    <div class="mb-3">
                        <label class="form-label" for="email-input">Nom complet</label>
                        <!-- avec VeeValidate, on remplace les input par Field et on lui donne un nom -->
                        <!-- le nom est ensuite utilisé pour afficher les messages d'erreur dans ErrorMessage -->
                        <!-- le message d'erreur provient de la règle isRequired déclarée en haut -->
                        <Field class="form-control" id="email-input" name="email-input" type="email" :rules="isRequired"
                            v-model="email" />
                        <ErrorMessage class="text-danger" name="email-input" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="password-input">Mot de passe</label>
                        <Field class="form-control" id="password-input" name="password-input" type="password"
                            :rules="isRequired" v-model="password" />
                        <ErrorMessage class="text-danger" name="password-input" />
                    </div>
                    <div class="p-3 mb-2 bg-danger text-white" v-if="authServiceError">
                        {{ authServiceError }}
                    </div>
                    <button class="btn btn-primary" type="submit">Se connecter</button>
                </Form>
            </div>
        </div>
    </div>

</template>
<style></style>