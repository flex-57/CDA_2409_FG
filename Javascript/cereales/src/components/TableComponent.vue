<template>
    <table>
        <thead>
            <th @click="sortCereals('id')">id</th>
            <th @click="sortCereals('name', false)">nom</th>
            <th @click="sortCereals('calories')">calories</th>
            <th @click="sortCereals('protein')">proteïnes</th>
            <th @click="sortCereals('sodium')">sel</th>
            <th @click="sortCereals('fiber')">fibres</th>
            <th @click="sortCereals('carbo')">glucides</th>
            <th @click="sortCereals('sugars')">sucre</th>
            <th @click="sortCereals('potass')">potassium</th>
            <th @click="sortCereals('vitamins')">vitamines</th>
            <th @click="sortCereals('rating')">évaluation</th>
            <th>ns</th>
            <th>del</th>
        </thead>
        <tbody>
            <tr v-for="cereal in cereals" :key="cereal.id">
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
const props = defineProps({
    cereals: {
        type: Array,
        required: true,
    },
    avgCalories: {
        type: Number,
        required: true,
    },
})

const emit = defineEmits(['deleteCereal', 'sortCereals'])

const ns = (rating) => {
    if (rating < 35) return 'E'
    if (rating < 55) return 'D'
    if (rating < 70) return 'C'
    if (rating < 80) return 'B'
    return 'A'
}

const deleteCereal = (id) => {
    emit('deleteCereal', id)
}

const sortCereals = (col, isNum = true) => {
    emit('sortCereals', col, isNum)
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
