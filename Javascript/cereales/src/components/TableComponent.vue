<template>
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
                <td>{{ cereals.length }} élément{{ cereals.length > 1 ? 's' : '' }}</td>
                <td>Moyenne <br />calories <br />{{ avgCalories }}</td>
                <td colspan="10"></td>
            </tr>
        </tfoot>
    </table>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['cereals', 'search', 'selectedNs', 'selectedCat'])
const emit = defineEmits(['deleteCereal'])

const avgCalories = computed(() => {
    return Math.floor(props.cereals.reduce((sum, c) => sum + c.calories, 0) / props.cereals.length)
})

const deleteCereal = (id) => {
    emit('deleteCereal', id)
}

const filteredCereals = computed(() => {
    return props.cereals.filter((cereal) => {
        const matchSearch = cereal.name.toLowerCase().includes(props.search.toLowerCase())

        const matchNutriscore =
            props.selectedNs.length === 0 || props.selectedNs.includes(ns(cereal.rating))

        const matchCategory =
            props.selectedCat === 'Tous' ||
            (props.selectedCat === 'Sans sucre' && cereal.sugars < 1) ||
            (props.selectedCat === 'Pauvre en sel' && cereal.sodium < 50) ||
            (props.selectedCat === 'Boost' && cereal.vitamins >= 25 && cereal.fiber >= 10)

        return matchSearch && matchNutriscore && matchCategory
    })
})

const ns = (rating) => {
    if (rating < 35) return 'E'
    if (rating < 55) return 'D'
    if (rating < 70) return 'C'
    if (rating < 80) return 'B'
    return 'A'
}
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
