<template>
    <h1>Résultat de la course</h1>
    <InfoComponent :data="resultsData" :winner="winner" />
    <h2>Filtrer</h2>
    <FilterComponent :data="resultsData" v-model:selected="selectedCountries" />
    <TableComponent :data="filteredResults" :winner="winner" />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import InfoComponent from './components/InfoComponent.vue'
import FilterComponent from './components/FilterComponent.vue'
import TableComponent from './components/TableComponent.vue'

const resultsData = ref([])
const selectedCountries = ref([])

const winner = computed(() =>
    resultsData.value.length ? resultsData.value.reduce((a, b) => (a.temps < b.temps ? a : b)) : {},
)

const filteredResults = computed(() => {
    if (!selectedCountries.value.length) return resultsData.value
    return resultsData.value.filter((results) => selectedCountries.value.includes(results.pays))
})

onMounted(async () => {
    const res = await fetch('./src/assets/resultat10000metres.json')
    resultsData.value = (await res.json()).sort((a, b) => a.temps - b.temps)
})
</script>
