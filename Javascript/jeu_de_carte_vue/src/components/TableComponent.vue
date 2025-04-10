<template>
    <table>
        <thead>
            <tr>
                <th v-for="(title, i) in titles" :key="i">{{ title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(card, i) in data" :key="i">
                <td>{{ card.id }}</td>
                <td>{{ card.name }}</td>
                <td>{{ card.level }}</td>
                <td>{{ card.description }}</td>
                <td>{{ card.power }}</td>
                <td>{{ card.attack }}</td>
                <td>{{ card.armor }}</td>
                <td>{{ card.damage }}</td>
                <td>{{ card.mitigation }}</td>
                <td>{{ card.played }}</td>
                <td>{{ card.victory }}</td>
                <td>{{ card.defeat }}</td>
                <td>{{ card.draw }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
defineProps({
    titles: Array,
    data: Array,
})
</script>

<style scoped>
table {
    border-collapse: collapse;
    border: 3px solid #000;
}

thead {
    background: #ddd;
}

tr {
    border: 1px solid #aaa;
}

tbody tr:nth-child(even) {
    background: #eee;
}

tbody tr:hover {
    background: #ccc;
}

th {
    border: 1px solid #a1a1a1;
}

th,
td {
    padding: 0.3rem 0.8rem;
    text-align: center;
}
</style>
