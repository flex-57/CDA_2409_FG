<template>
    <div id="title">
        <h1>Liste des légumes</h1>
        <button @click="resetStorage">Réinitialiser les données</button>
    </div>
    <table v-if="vegetables.length">
        <thead>
            <tr>
                <th @click="sortVegetables('Id')">
                    Id
                    <span v-if="sortState.col === 'Id'">{{ sortState.direction ? '▼' : '▲' }}</span>
                </th>
                <th @click="sortVegetables('Name')">
                    Nom
                    <span v-if="sortState.col === 'Name'">{{
                        sortState.direction ? '▼' : '▲'
                    }}</span>
                </th>
                <th @click="sortVegetables('Variety')">
                    Variété
                    <span v-if="sortState.col === 'Variety'">{{
                        sortState.direction ? '▼' : '▲'
                    }}</span>
                </th>
                <th @click="sortVegetables('PrimaryColor')">
                    Couleur
                    <span v-if="sortState.col === 'PrimaryColor'">{{
                        sortState.direction ? '▼' : '▲'
                    }}</span>
                </th>
                <th @click="sortVegetables('LifeTime')">
                    Durée conservation
                    <span v-if="sortState.col === 'LifeTime'">{{
                        sortState.direction ? '▼' : '▲'
                    }}</span>
                </th>
                <th @click="sortVegetables('Fresh')">
                    Frais
                    <span v-if="sortState.col === 'Fresh'">{{
                        sortState.direction ? '▼' : '▲'
                    }}</span>
                </th>
                <th @click="sortVegetables('Price')">
                    Price
                    <span v-if="sortState.col === 'Price'">{{
                        sortState.direction ? '▼' : '▲'
                    }}</span>
                </th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="vegetable in vegetables" :key="vegetable.Id">
                <td>{{ vegetable.Id }}</td>
                <td>{{ capitalize(vegetable.Name) }}</td>
                <td>{{ capitalize(vegetable.Variety) }}</td>
                <td>{{ vegetable.PrimaryColor }}</td>
                <td>{{ vegetable.LifeTime }} day{{ vegetable.LifeTime > 1 ? 's' : '' }}</td>
                <td>{{ vegetable.Fresh === 0 ? 'Non' : 'Oui' }}</td>
                <td>{{ vegetable.Price.toFixed(2) }} $</td>
                <td>
                    <span>Éditer</span> -
                    <span @click="deleteItem(vegetable.Id)">Supprimer</span>
                </td>
            </tr>
        </tbody>
    </table>
    <div v-else id="empty-table">
        <p>Aucun légumes à afficher...</p>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { capitalize } from '@/utils/stringUtils'
import { fetchVegetables } from '@/utils/fetchVegetables'

const vegetables = ref([])

const getVegetables = async () => {
    try {
        const data = await fetchVegetables()
        const storage = localStorage.getItem('vegetables')
            ? JSON.parse(localStorage.getItem('vegetables'))
            : []
        vegetables.value = storage.length ? storage : data
        sortState.value.direction = false
        sortVegetables('Name')
    } catch (e) {
        console.error('Erreur lors du chargement des légumes :', e)
    }
}

const sortState = ref({
    col: 'Name',
    direction: true,
})

const sortVegetables = (col) => {
    if (sortState.value.col === col) {
        sortState.value.direction = !sortState.value.direction
    } else {
        sortState.value.col = col
        sortState.value.direction = true
    }
    vegetables.value.sort((a, b) => {
        if (typeof a[col] === 'string' && typeof b[col] === 'string') {
            return sortState.value.direction
                ? a[col].localeCompare(b[col])
                : b[col].localeCompare(a[col])
        } else {
            return sortState.value.direction ? a[col] - b[col] : b[col] - a[col]
        }
    })
}

const deleteItem = (id) => {
    vegetables.value = vegetables.value.filter((v) => v.Id != id)
}

const resetStorage = () => {
    localStorage.removeItem('vegetables')
    sortState.value = {
        col: 'Name',
        direction: true,
    }
    getVegetables()
}

watch(
    vegetables,
    (newVal) => {
        localStorage.setItem('vegetables', JSON.stringify(newVal))
    },
    { deep: true },
)

onMounted(getVegetables)
</script>
