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
        <button @click="resetData">Reset</button>
    </div>
    <TableComponent
        :cereals="filteredCereals"
        :avgCalories="avgCalories"
        @deleteCereal="deleteCereal"
        @sortCereals="sortCereals"
    />
    <ModalComponent :isVisible="showModal" @confirm="confirmSave" @cancel="cancelSave" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchCereals } from '@/utils/fetchCereals'
import HeaderComponent from './components/HeaderComponent.vue'
import TableComponent from './components/TableComponent.vue'
import ModalComponent from './components/ModalComponent.vue'

const cereals = ref([])
const search = ref('')
const selectedNs = ref([])
const selectedCat = ref('Tous')
const showModal = ref(false)
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
    const savedCereals = localStorage.getItem('savedCereals')
    if (savedCereals) {
        showModal.value = true
    } else {
        confirmSave()
    }
}

const confirmSave = () => {
    localStorage.setItem('savedCereals', JSON.stringify(cereals.value))
    showModal.value = false 
}

const cancelSave = () => {
    showModal.value = false
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
</style>
