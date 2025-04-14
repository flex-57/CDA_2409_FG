<template>
    <div id="title">
        <h1>Ajouter une vente</h1>
    </div>
    <form @submit.prevent="save">
        <div v-if="message" id="error-form">{{ message }}</div>

        <div class="form-grp">
            <label for="name">Nom</label>
            <select id="name" v-model="sale.Name">
                <option value="" disabled>-- Choisir un légume --</option>
                <option v-for="v in vegetables" :key="v.Id" :value="v.Name">
                    {{ capitalize(v.Name) }}
                </option>
            </select>
        </div>

        <div class="form-grp">
            <label for="weight">Poids</label>
            <input type="number" id="weight" v-model.number="sale.SaleWeight" min="0" />
        </div>

        <div class="form-grp">
            <label id="label-box-radio">Active</label>
            <div id="box-radio">
                <input type="radio" id="active" :value="1" v-model="sale.SaleActive" />
                <label for="active" class="label-radio">Oui</label>

                <input type="radio" id="not-active" :value="0" v-model="sale.SaleActive" />
                <label for="not-active" class="label-radio">Non</label>
            </div>
        </div>

        <div class="form-grp">
            <label></label>
            <input type="submit" id="btn-submit" value="Ajouter" :disabled="!isFormOk" />
        </div>
    </form>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { fetchVegetables } from '@/utils/fetchVegetables'
import { fetchSales } from '@/utils/fetchSales'
import { capitalize } from '@/utils/stringUtils'
import router from '@/router'

const vegetables = ref([])
const sales = ref([])
const sale = ref({
    SaleId: 0,
    SaleDate: null,
    SaleWeight: 0,
    SaleUnitPrice: 0,
    SaleActive: null,
    VegetableId: 0,
    Name: '',
    Variety: '',
})

const isFormOk = ref(false)

const message = ref('')

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

const getVegetables = async () => {
    try {
        const data = await fetchVegetables()
        const storage = localStorage.getItem('vegetables')
            ? JSON.parse(localStorage.getItem('vegetables'))
            : []
        vegetables.value = storage.length ? storage : data
    } catch (e) {
        console.error('Erreur lors du chargement des légumes :', e)
    }
}

const save = () => {
    const selected = vegetables.value.find((v) => v.Name === sale.value.Name)

    if (!sale.value.Name || !sale.value.SaleWeight) {
        message.value = 'Veuillez remplir tous les champs !'
    } else {
        sale.value.SaleId = Math.max(...sales.value.map((v) => v.SaleId)) + 1
        sale.value.Variety = selected.Variety
        sale.value.VegetableId = selected.Id
        sale.value.SaleUnitPrice = selected.Price
        sale.value.SaleDate = new Date().toISOString()
        sales.value.push({ ...sale.value })
        localStorage.setItem(
            'sales',
            JSON.stringify(sales.value.sort((a, b) => b.SaleDate.localeCompare(a.SaleDate))),
        )
        router.push('/ventes')
    }
}

watchEffect(
    () =>
        (isFormOk.value =
            sale.value.Name && sale.value.SaleWeight && sale.value.SaleActive !== null),
)

onMounted(() => {
    getSales(), getVegetables()
})
</script>
