<template>
    <h1>Liste des personnes inscrites</h1>

    <section id="form">
        <h3>Ajouter une personne</h3>
        <form @submit.prevent="save">
            <div>
                <label for="firstname">Prénom</label>
                <input type="text" id="firstname" v-model.trim="firstname" @input="userAdded = false, userExists = false" />
            </div>
            <div>
                <label for="lastname">Nom</label>
                <input type="text" id="lastname" v-model.trim="lastname" @input="userAdded = false, userExists = false" />
            </div>
            <div>
                <input type="submit" value="Ajouter" :disabled="!isFormOk" />
            </div>
        </form>
        <div v-if="userAdded" class="message ok">
            <p>{{ capitalize(firstname) }} {{ capitalize(lastname) }} a été ajouté !</p>
        </div>
        <div v-else-if="userExists" class="message error">
            <p>Un utilisateur portant le nom de {{ capitalize(firstname) }} {{ capitalize(lastname) }} existe déjà !</p>
        </div>
    </section>
    <section v-if="people.length">
        <ul>
            <li v-for="(p, i) in people" :key="i">{{ capitalize(p.split(' ')[0]) }} {{ capitalize(p.split(' ')[1]) }}</li>
        </ul>

        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, i) in people" :key="i">
                    <td>{{ capitalize(p.split(' ')[1]) }}</td>
                    <td>{{ capitalize(p.split(' ')[0]) }}</td>
                    <td>{{ formatEmail(p) }}</td>
                    <td @click="people.splice(i, 1), userAdded = false, userExists = false">X</td>
                </tr>
            </tbody>
        </table>
    </section>
    <div v-else>
        <p>Il n'y a personne dans la liste, veuillez en ajouter !</p>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const people = ref(['Mike Dev', 'John Makenzie', 'Léa Grande'])
const firstname = ref('')
const lastname = ref('')
const userAdded = ref(false)
const userExists = ref(false)
const isFormOk = ref(false)

const save = () => {
    if(!people.value.find(p => formatEmail(p) === formatEmail(`${firstname.value} ${lastname.value}`))) {
        people.value.push(`${firstname.value} ${lastname.value}`)
        userAdded.value = true
    }
    else {
        userAdded.value = false
        userExists.value = true
    }
}

const formatEmail = (str) => {
    const lower = String(str).toLowerCase()
    return `${lower.split(' ')[0]}.${lower.split(' ')[1]}@example.com`
}
const capitalize = (str) =>
    `${String(str).charAt(0).toUpperCase()}${String(str).slice(1).toLowerCase()}`

watchEffect(() => {
    isFormOk.value = /^[a-zA-Z]{2,}$/.test(firstname.value) && /^[a-zA-Z]{2,}$/.test(lastname.value)
})
</script>
