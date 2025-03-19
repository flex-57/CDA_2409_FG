<template>
    <h1>Liste des ventes</h1>
    <div id="sales-box">
        <div v-for="sale in sales" :key="sale.SaleId">
            <h4>
                {{ sale.Name }} <br />
                ({{ sale.SaleWeight }}kgs)
            </h4>
            <span>{{ saleDate(sale.SaleDate) }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchSales } from '@/utils/fetchSales'

const sales = ref([])

const saleDate = (saleDate_) => {
    const date = new Date(saleDate_)
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
}

const getSales = async () => {
    try {
        sales.value = await fetchSales()
    } catch (e) {
        console.error('Erreur lors du chargement des ventes :', e)
    }
}

onMounted(getSales)
</script>
