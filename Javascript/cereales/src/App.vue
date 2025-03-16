<template>
    <HeaderComponent
        :search="search"
        :selectedNs="selectedNs"
        :selectedCat="selectedCat"
        @update:search="search = $event"
        @update:selectedNs="selectedNs = $event"
        @update:selectedCat="selectedCat = $event"
    />
    <div id="save-box">
        <button @click="saveData">Enregistrer les infos</button>
    </div>
    <TableComponent
        :cereals="filteredCereals"
        @deleteCereal="deleteCereal"
        @sortCereals="sortCereals"
        :avgCalories="avgCalories"
    />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchCereals } from '@/utils/fetchCereals'
import HeaderComponent from './components/HeaderComponent.vue'
import TableComponent from './components/TableComponent.vue'

const cereals = ref([])
const search = ref('')
const selectedNs = ref([])
const selectedCat = ref('Tous')
const sortState = ref({
    id: false,
    name: false,
    calories: false,
    protein: false,
    sodium: false,
    fiber: false,
    carbo: false,
    sugars: false,
    potass: false,
    vitamins: false,
    rating: false,
})

const ns = (rating) => {
    if (rating < 35) return 'E'
    if (rating < 55) return 'D'
    if (rating < 70) return 'C'
    if (rating < 80) return 'B'
    return 'A'
}

const getCereals = async () => {
    try {
        cereals.value = await fetchCereals()
    } catch (e) {
        console.error('Erreur lors du chargement des céréales :', e)
    }
}

const avgCalories = computed(() => {
    return filteredCereals.value.length > 0
        ? Math.floor(
              filteredCereals.value.reduce((sum, c) => sum + c.calories, 0) /
                  filteredCereals.value.length,
          )
        : 0
})

const deleteCereal = (id) => {
    cereals.value = cereals.value.filter((cereal) => cereal.id !== id)
}

const sortCereals = (col, isNum = true) => {
    sortState.value[col] = !sortState.value[col]
    cereals.value.sort((a, b) =>
        sortState.value[col]
            ? isNum
                ? b[col] - a[col]
                : b[col].localeCompare(a[col])
            : isNum
                ? a[col] - b[col]
                : a[col].localeCompare(b[col]),
    )
}

const filteredCereals = computed(() => {
    return cereals.value.filter((cereal) => {
        const matchSearch = cereal.name.toLowerCase().includes(search.value.toLowerCase())

        const matchNutriscore =
            selectedNs.value.length === 0 || selectedNs.value.includes(ns(cereal.rating))

        const matchCategory =
            selectedCat.value === 'Tous' ||
            (selectedCat.value === 'Sans sucre' && cereal.sugars < 1) ||
            (selectedCat.value === 'Pauvre en sel' && cereal.sodium < 50) ||
            (selectedCat.value === 'Boost' && cereal.vitamins >= 25 && cereal.fiber >= 10)

        return matchSearch && matchNutriscore && matchCategory
    })
})

const saveData = () => {  
    localStorage.setItem('savedCereals', JSON.stringify(cereals.value))
}

onMounted(() => {
    const savedCereals = localStorage.getItem('savedCereals')
    if (savedCereals) {
        cereals.value = JSON.parse(savedCereals)
    } else {
        getCereals()
    }
})
</script>

<style scoped>
table {
    border-collapse: collapse;
}

th {
    text-transform: uppercase;
    background: var(--th);
    color: var(--title);
    padding: 0.4rem;
}

tbody tr:hover td:not(:nth-child(12)) {
    background: var(--tr-hover);
}

td {
    padding: 0.3rem 0;
}

td:first-child,
tbody td:last-child {
    background: var(--bg-td-id_del);
}

td:first-child {
    color: yellow;
}

td:nth-child(2) {
    padding-left: 0.5rem;
}

td:not(td:nth-child(2)) {
    text-align: center;
}

.delete {
    cursor: pointer;
    color: var(--E);
    font-weight: bold;
    text-shadow: 0 1px 1px #000;
}

.E {
    background: var(--E);
}

.D {
    background: var(--D);
}

.C {
    background: var(--C);
}

.B {
    background: var(--B);
}

.A {
    background: var(--A);
}
</style>
