<template>
    <h1>Liste des légumes</h1>
    <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Variété</th>
                <th>Couleur</th>
                <th>Durée conservation</th>
                <th>Frais</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="vegetable in vegetables" :key="vegetable.Id">
                <td>{{ capitalizeName(vegetable.Name) }}</td>
                <td>{{ capitalizeName(vegetable.Variety) }}</td>
                <td>{{ vegetable.PrimaryColor }}</td>
                <td>{{ vegetable.LifeTime }}</td>
                <td>{{ vegetable.Fresh === 0 ? 'Non' : 'Oui' }}</td>
                <td>
                    <a href="">Éditer</a> -
                    <a href="">Supprimer</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { capitalizeName } from '@/utils/stringUtils'
import { fetchVegetables } from '@/utils/fetchVegetables'

const vegetables = ref([])

const getVegetables = async () => {
    try {
        vegetables.value = await fetchVegetables()
    } catch (e) {
        console.error('Erreur lors du chargement des légumes :', e)
    }
}

onMounted(getVegetables)
</script>
