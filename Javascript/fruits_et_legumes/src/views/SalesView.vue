<template>
    <h1>Liste des ventes</h1>
    <div v-for="sale in sales" :key="sale.SaleId">
        <h4>{{ sale.Name }} <br> ({{ sale.SaleWeight }}KGS)</h4>
        <span>{{ saleDate(sale.SaleDate) }}</span>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchSales } from '@/utils/fetchSales'

const sales = ref([])
const saleDate = (saleDate) => {
    const date = new Date(saleDate)
    return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`
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
