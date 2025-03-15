<template>
        <header>
        <h1>Cereals</h1>
        <fieldset>
            <legend>Rechercher</legend>
            <input
                type="search"
                id="input-search"
                placeholder="Nom de la céréale"
                v-model="search"
            />
        </fieldset>
        <fieldset>
            <legend>Filtrer</legend>
            <div id="filter">
                <fieldset>
                    <legend>Nutriscore</legend>
                    <label v-for="nutriscore in nutriscores" :for="nutriscore" :key="nutriscore">
                        {{ nutriscore }}
                        <input
                            type="checkbox"
                            name=""
                            :id="'nutriscore-' + nutriscore"
                            :value="nutriscore"
                            v-model="selectedNs"
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Catégorie</legend>
                    <select
                        name=""
                        id="select-categorie"
                        v-model="selectedCat"
                    >
                        <option v-for="cat in categories" :value="cat" :key="cat">{{ cat }}</option>
                    </select>
                </fieldset>
            </div>
        </fieldset>
    </header>
    <div>
        <div>recherche: {{ search }}</div>
        <div>ns: {{ selectedNs }}</div>
        <div>cat: {{ selectedCat }}</div>
    </div>
    <table>
        <thead>
            <th>id</th>
            <th>nom</th>
            <th>calories</th>
            <th>proteïnes</th>
            <th>sel</th>
            <th>fibres</th>
            <th>glucides</th>
            <th>sucre</th>
            <th>potassium</th>
            <th>vitamines</th>
            <th>évaluation</th>
            <th>ns</th>
            <th>del</th>
        </thead>
        <tbody>
            <tr v-for="cereal in filteredCereals" :key="cereal.id">
                <td>{{ cereal.id }}</td>
                <td>{{ cereal.name }}</td>
                <td>{{ cereal.calories }}</td>
                <td>{{ cereal.protein }}</td>
                <td>{{ cereal.sodium }}</td>
                <td>{{ cereal.fiber }}</td>
                <td>{{ cereal.carbo }}</td>
                <td>{{ cereal.sugars }}</td>
                <td>{{ cereal.potass }}</td>
                <td>{{ cereal.vitamins }}</td>
                <td>{{ cereal.rating }}</td>
                <td :class="ns(cereal.rating)">{{ ns(cereal.rating) }}</td>
                <td @click="deleteCereal(cereal.id)" class="delete">X</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td>{{ filteredCereals.length }} élément{{ filteredCereals.length > 1 ? 's' : '' }}</td>
                <td>Moyenne <br />calories <br />{{ avgCalories }}</td>
                <td colspan="10"></td>
            </tr>
        </tfoot>
    </table>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { fetchCereals } from '@/utils/fetchCereals'

const cereals = ref([])
const search = ref('')
const selectedNs = ref([])
const selectedCat = ref('Tous')

const nutriscores = ['A', 'B', 'C', 'D', 'E']
const categories = ['Tous', 'Sans sucre', 'Pauvre en sel', 'Boost']

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
    return cereals.value.length > 0 ? Math.floor(cereals.value.reduce((sum, c) => sum + c.calories, 0) / cereals.value.length) : 0
})

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

watch(search, (newSearch) => search.value = newSearch)
watch(selectedNs, (newSelectedNs) => selectedNs.value = newSelectedNs)
watch(selectedCat, (newSelectedCat) => selectedCat.value = newSelectedCat)

onMounted(getCereals)
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

