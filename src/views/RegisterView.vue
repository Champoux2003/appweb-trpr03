<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/stores/profileStore'
import { useUserStore } from '@/stores/userStore'




interface User {
    email: string,
    password: string,
    name: string,
    role: string
}

// Définir les règles de validation
defineRule('isRequired', required)
defineRule('passwordsMatch', (value : any) => {
    if (value !== password.value) {
        return 'Les mots de passe ne correspondent pas.'
    }
    return true
})
defineRule('isEmail', (value : any) => {
    if (!value.includes('@') || !value.includes('.')) {
        return 'Veuillez entrer une adresse email valide.'
    }
    return true
})

const isRequired = (value : any) => (!value ? 'Ce champ est requis.' : true)
const passwordsMatch = (value : any) => (value !== password.value ? 'Les mots de passe ne correspondent pas.' : true)
const isEmail = (value : any) => (!value.includes('@') || !value.includes('.') ? 'Veuillez entrer une adresse email valide.' : true)


const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const loggedInUser = ref(null)

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const role = ref('student') //can only register a student. Teacher are created by the school

const authServiceError = computed(() => authStore.authServiceError)

const isTeacher = ref(null)

onMounted(async() => {
    authStore.clearError()

    await userStore.getUserById(parseInt(authStore.getUserId))
    loggedInUser.value = userStore.user
    if (loggedInUser.value?.role === 'teacher') {
      isTeacher.value = true as any
    }
    else {
      isTeacher.value = false as any
    }

    if(!isTeacher.value) {
        router.push({ name: 'NotFound' })
    }
})

const register = async () => {
    // Validation manuelle avant la soumission
    const result = await validate({}, {}, {})

    if (!result.valid) {
        return // Arrête la fonction si la validation échoue
    }
    const newUser: User = {
        email: email.value,
        password: password.value,
        name: name.value,
        role: role.value
    }

    const userStore = useUserStore()
    
    await userStore.createUser(newUser)

    if (!authStore.authServiceError) {
        router.push({ name: 'Home' })
    }


}
</script>
<template>
    <div>
        <h1>Ajouter un étudiant</h1>
        <div class="container my-5">
            <div class="row justify-content-center">
                <!-- avec VeeValidate on utilise Form au lieu de form et pas de .prevent comme dans l'exemple de Vue Router.... -->
                <Form @submit="register">
                    <div class="mb-3">
                        <label class="form-label" for="name-input">Nom complet</label>
                        <!-- avec VeeValidate, on remplace les input par Field et on lui donne un nom -->
                        <!-- le nom est ensuite utilisé pour afficher les messages d'erreur dans ErrorMessage -->
                        <!-- le message d'erreur provient de la règle isRequired déclarée en haut -->
                        <Field class="form-control" id="name-input" name="name-input" type="name" :rules="isRequired"
                            v-model="name" />
                        <ErrorMessage class="text-danger" name="name-input-error" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="email-input">Email</label>
                        <!-- avec VeeValidate, on remplace les input par Field et on lui donne un nom -->
                        <!-- le nom est ensuite utilisé pour afficher les messages d'erreur dans ErrorMessage -->
                        <!-- le message d'erreur provient de la règle isRequired déclarée en haut -->
                        <Field class="form-control" id="email-input" name="email-input" type="email" :rules="[isRequired, isEmail]"
                            v-model="email" />
                        <ErrorMessage class="text-danger" name="email-input" />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="password-input">Mot de passe</label>
                        <Field class="form-control" id="password-input" name="password-input" type="password"
                            :rules="isRequired" v-model="password" />
                        <ErrorMessage class="text-danger" name="password-input" />
                        
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="password-confirm-input">Confirmation du mot de passe</label>
                        <Field class="form-control" id="password-confirm-input" name="password-confirm-input" type="password"
                            :rules="[isRequired, passwordsMatch]" v-model="passwordConfirm" />
                        <ErrorMessage class="text-danger" name="password-confirm-input" />
                    </div>
                    <div class="p-3 mb-2 bg-danger text-white" v-if="authServiceError">
                        {{ authServiceError }}
                    </div>
                    <button class="btn btn-primary" type="submit">Ajouter l'étudiant</button>
                </Form>
            </div>
        </div>
    </div>

</template>
<style></style>