<template>
    <header>
        <h1>Espace membres</h1>
        <span v-if="displayError">Identifiant ou mot de passe incorrect</span>
    </header>
    <form v-if="!user" @submit.prevent="connect">
        <h3>Identification</h3>
        <div>
            <label for="identifiant">Identifiant</label>
            <input type="text" id="identifiant" v-model="identifiant" />
        </div>
        <div>
            <label for="password">Mot de passe</label>
            <input type="password" id="password" v-model="password" />
        </div>
        <div>
            <label></label>
            <input type="submit" value="Connexion" :disabled="!isFormValid" />
        </div>
    </form>
    <section>
        <div>
            <span>Boujour {{ user.firstname }} {{ user.lastname }}</span>
            <button>Déconnexion</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date de naissance</th>
                    <th>Email</th>
                    <th>Salaire</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, u) in usersData" :key="u">
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.birthday }}</td>
                    <td>{{ user.email }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';

const identifiant = ref('')
const password = ref('')
const isFormValid = ref(false)
const displayError = ref(false)
const usersData = ([])
const user = ref('')

const connect = () => {
    user.value = usersData.find(user => user.identifiant === identifiant.value && user.password === password.value )
    displayError.value = !isFormValid.value
}

watchEffect(() => {
    isFormValid.value = identifiant.value && password.value
})

onMounted(async () => {
    const res = await fetch('../src/assets/users.json')
    usersData.value = await res.json()
    usersData.value = usersData.value.map((user) => ({
        ...user,
        identifiant: `${user.firstname.toLowerCase()}.${user.lastname.toLowerCase()}`
    }))
})
</script>
