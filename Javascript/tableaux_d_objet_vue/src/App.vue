<template>
    <header>
        <h1>Espace membres</h1>
        <span v-if="displayError">Identifiant ou mot de passe incorrect</span>
    </header>
    <form v-if="!userCurrent" @submit.prevent="connect">
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
    <section v-else>
        <div>
            <span>Bonjour {{ userCurrent.firstname }} {{ userCurrent.lastname }}</span>
            <button @click="disconnect">Déconnexion</button>
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
                <tr
                    v-for="(user, u) in usersData"
                    :key="u"
                    :class="JSON.stringify(userCurrent) === JSON.stringify(user) ? 'current' : ''"
                >
                    <td>{{ user.lastname }}</td>
                    <td>{{ user.firstname }}</td>
                    <td>{{ user.birthday }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.salary }} €</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'

const identifiant = ref('')
const password = ref('')
const isFormValid = ref(false)
const displayError = ref(false)
const usersData = ref([])
const userCurrent = ref('')

const connect = () => {
    const foundUser = usersData.value.find(
        (user) => user.identifiant === identifiant.value && user.password === password.value,
    )
    if (foundUser) {
        userCurrent.value = foundUser
        displayError.value = false
        identifiant.value = ''
        password.value = ''
    } else {
        displayError.value = true
    }
}

const disconnect = () => (userCurrent.value = '')

watchEffect(() => {
    isFormValid.value = identifiant.value && password.value
})

onMounted(async () => {
    const res = await fetch('../src/assets/users.json')
    usersData.value = await res.json()
    usersData.value = usersData.value.map((user) => ({
        ...user,
        identifiant: `${user.firstname.toLowerCase()}.${user.lastname.toLowerCase()}`,
        email: `${user.firstname.toLowerCase()}.${user.lastname.toLowerCase()}@example.com`,
    }))
})
</script>
