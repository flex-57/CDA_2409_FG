<template>
    <HeaderComponent :search="search" :selectedNs="selectedNs" :selectedCat="selectedCat"
        @update:search="search = $event" @update:selectedNs="selectedNs = $event"
        @update:selectedCat="selectedCat = $event" />
    <div id="save-box">
        <div id="save-btns">
            <a @click="exportData()" :href="url" :download="`cereals-${Date.now()}.json`" target="_blank">Exporter les
                données</a>
            <button @click="saveData">Enregistrer les données</button>
            <button v-if="isSavedCereals" @click="resetData">Reset</button>
        </div>
        <div v-if="messageFlash" id="message-flash">
            <p>{{ messageFlash }}</p>
        </div>
    </div>
    <TableComponent :cereals="filteredCereals" :avgCalories="avgCalories" @deleteCereal="deleteCereal"
        @sortCereals="sortCereals" />
    <ModalComponent :isVisible="showModalSave" @confirm="confirmSave" @cancel="cancelAction">
        <p>Des données sont déjà enregistrées. Voulez-vous vraiment les écraser ?</p>
    </ModalComponent>
    <ModalComponent :isVisible="showModalReset" @confirm="confirmReset" @cancel="cancelAction">
        <p>Voulez-vous vraiment effacer les données enregistrées ?</p>
    </ModalComponent>
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
const showModalSave = ref(false)
const showModalReset = ref(false)
const isSavedCereals = ref(false)
const messageFlash = ref('')
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
const url = ref('')

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
        showModalSave.value = true
    } else {
        confirmSave()
    }
}

const resetData = () => {
    const savedCereals = localStorage.getItem('savedCereals')
    if (savedCereals) {
        showModalReset.value = true
    } else {
        confirmReset()
    }
}

const exportData = () => {
    url.value = window.URL.createObjectURL(
        new Blob([JSON.stringify(cereals.value)]),
    )
}

const confirmSave = () => {
    localStorage.setItem('savedCereals', JSON.stringify(cereals.value))
    showModalSave.value = false
    isSavedCereals.value = true
    messageFlash.value = 'Les informations ont été enregistrées.'
}

const confirmReset = () => {
    localStorage.setItem('savedCereals', '')
    showModalReset.value = false
    isSavedCereals.value = false
    messageFlash.value = 'Les informations ont été effacées.'
    getCereals()
}

const cancelAction = () => {
    showModalSave.value = false
    showModalReset.value = false
}

onMounted(() => {
    const savedCereals = localStorage.getItem('savedCereals')
    if (savedCereals) {
        cereals.value = JSON.parse(savedCereals)
        isSavedCereals.value = true
    } else {
        getCereals()
    }
})
</script>

<style scoped>
#save-box {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
}

#save-btns {
    display: flex;
    gap: 0.5rem;
}

#message-flash p {
    background: var(--A);
    border-radius: var(--border-radius);
    padding: 0.5rem;
    margin: 0;
}

button,
a {
    text-decoration: none;
    background: var(--th);
    color: var(--title);
    padding: 0.5rem 0.6rem;
    border: none;
    border-radius: var(--border-radius);
    transition: all 0.3s;
}

button:hover,
a:hover {
    background: var(--bg-td-id_del);
}
</style>
