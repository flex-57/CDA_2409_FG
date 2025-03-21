<template>
    <h1>Liste des légumes</h1>
    {{ storage }}
    <table>
        <thead>
            <tr>
                <th @click="sortVegetables('Name', false)">Nom</th>
                <th @click="sortVegetables('Variety', false)">Variété</th>
                <th @click="sortVegetables('PrimaryColor', false)">Couleur</th>
                <th @click="sortVegetables('LifeTime')">Durée conservation</th>
                <th @click="sortVegetables('Fresh')">Frais</th>
                <th @click="sortVegetables('Price')">Price</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="vegetable in getAllVegetables" :key="vegetable.Id">
                <td>{{ capitalizeName(vegetable.Name) }}</td>
                <td>{{ capitalizeName(vegetable.Variety) }}</td>
                <td>{{ vegetable.PrimaryColor }}</td>
                <td>{{ vegetable.LifeTime }} day{{ vegetable.LifeTime > 1 ? 's' : '' }}</td>
                <td>{{ vegetable.Fresh === 0 ? 'Non' : 'Oui' }}</td>
                <td>{{ vegetable.Price.toFixed(2) }} $</td>
                <td>
                    <a href="">Éditer</a> -
                    <a href="">Supprimer</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
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

const storage = ref(localStorage.getItem('vegetables'))

const getFetchedVegetables = async () => {
    try {
        vegetables.value = await fetchVegetables()
    } catch (e) {
        console.error('Erreur lors du chargement des légumes :', e)
    }
}

const getAllVegetables = computed(() => {
    return [...vegetables.value, ...localStorage.getItem('vegetables')]
})

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

onMounted(() => {
     getFetchedVegetables()
})
</script>
