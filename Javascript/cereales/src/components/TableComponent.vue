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
            <tr v-for="cereal in cereals" :key="cereal">
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
                <td>{{ ns(cereal.rating) }}</td>
                <td>X</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { fetchCereals } from '@/utils/fetchCereals';
import { onMounted, ref } from 'vue';

const cereals = ref([])

const ns = (rating) => {
    if(rating < 35) return 'E'
    else if(rating < 55) return 'D'
    else if(rating < 70) return 'C'
    else if(rating < 80) return 'B'
    else return 'A'
}



const getCereals = async () => {
    try {
        cereals.value = await fetchCereals()
    } catch (e) {
        console.log(e);
    }
}



onMounted(getCereals)



</script>

<style scoped></style>
