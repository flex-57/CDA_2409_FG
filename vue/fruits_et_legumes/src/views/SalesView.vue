<template>
    <div id="title">
        <h1>Liste des ventes</h1><button @click="resetStorage">Réinitialiser les données</button>
    </div>
    <div id="sales-box">
        <div
            v-for="sale in paginationSales"
            :key="sale.SaleId"
            :class="sale.SaleActive ? 'sale-active' : 'sale-inactive'"
        >
            <h4>
                {{ sale.Name }} {{ sale.Variety }} <br />
                ({{ sale.SaleWeight }}kgs)
            </h4>
            <span>{{ saleDate(sale.SaleDate) }}</span>
        </div>
    </div>
    <div id="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchSales } from '@/utils/fetchSales'

const sales = ref([])

const currentPage = ref(1)

const nbItems = 20

const paginationSales = computed(() => {
    const start = (currentPage.value - 1) * nbItems
    return sales.value.slice(start, start + nbItems)
})

const totalPages = computed(() => {
    return Math.ceil(sales.value.length / nbItems)
})

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
}

const saleDate = (saleDate_) => {
    const date = new Date(saleDate_)
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
}

const getSales = async () => {
    try {
        const data = await fetchSales()
        const storage = localStorage.getItem('sales')
            ? JSON.parse(localStorage.getItem('sales'))
            : []
        sales.value = storage.length ? storage : data
    } catch (e) {
        console.error('Erreur lors du chargement des ventes :', e)
    }
}

const resetStorage = () => {
    localStorage.removeItem('sales')
    getSales()
}

onMounted(getSales)
</script>
