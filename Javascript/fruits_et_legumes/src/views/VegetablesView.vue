<template>
    <h1>Liste des légumes</h1>
    <table>
        <thead>
            <tr>
                <th>Id</th>
                <th @click="sortVegetables('Name', false)">Nom</th>
                <th @click="sortVegetables('Variety', false)">Variété</th>
                <th @click="sortVegetables('PrimaryColor', false)">Couleur</th>
                <th @click="sortVegetables('LifeTime')">Durée conservation</th>
                <th @click="sortVegetables('Fresh')">Frais</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="vegetable in vegetables" :key="vegetable.Id">
                <td>{{ vegetable.Id }}</td>
                <td>{{ capitalizeName(vegetable.Name) }}</td>
                <td>{{ capitalizeName(vegetable.Variety) }}</td>
                <td>{{ vegetable.PrimaryColor }}</td>
                <td>{{ vegetable.LifeTime }}</td>
                <td>{{ vegetable.Fresh === 0 ? 'Non' : 'Oui' }}</td>
                <td>
                    <a href="">Éditer</a> -
                    <a href="">Supprimer</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { capitalizeName } from '@/utils/stringUtils'
import { fetchVegetables } from '@/utils/fetchVegetables'

const vegetables = ref([])

const sortState = ref({
    Name: false,
    Variety: false,
    PrimaryColor: false,
    LifeTime: false,
    Fresh: false,
})

const getVegetables = async () => {
    try {
        vegetables.value = await fetchVegetables()
    } catch (e) {
        console.error('Erreur lors du chargement des légumes :', e)
    }
}

const sortVegetables = (col, isNum = true) => {
    sortState.value[col] = !sortState.value[col]
    vegetables.value.sort((a, b) =>
        sortState.value[col]
            ? isNum
                ? b[col] - a[col]
                : b[col].localeCompare(a[col])
            : isNum
              ? a[col] - b[col]
              : a[col].localeCompare(b[col]),
    )
}

onMounted(getVegetables)
</script>
