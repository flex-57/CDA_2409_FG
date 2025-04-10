<template>
    <h1>Jeu de cartes</h1>
    <TableComponent :titles="titles" :data="dataCards" />
    <p>
        Carte la plus jouée : <b>{{ bestPlayedCard.name }}</b> avec
        <b>{{ bestPlayedCard.victory }} victoires</b>.
    </p>
    <p>
        Carte avec le meilleur ratio victoires/défaites : <b>{{ bestRatioCard.name }}</b> avec
        <b>{{ bestRatioCard.victory }} victoires</b> pour <b>{{ bestRatioCard.played }} parties.</b>
    </p>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import TableComponent from './components/TableComponent.vue'

const dataCards = ref([])

const titles = [
    'id',
    'name',
    'level',
    'description',
    'power',
    'attack',
    'armor',
    'damage',
    'mitigation',
    'played',
    'victory',
    'defeat',
    'draw',
]

const bestPlayedCard = computed(() =>
    dataCards.value.length ? dataCards.value.reduce((a, b) => (b.played > a.played ? b : a)) : '',
)
const bestRatioCard = computed(() =>
dataCards.value.length ? dataCards.value.reduce((best, card) =>
        best.victory / (best.played - best.draw) > card.victory / (card.played - card.draw)
            ? best
            : card,
    ) : '',
)

onMounted(async () => {
    const response = await fetch(
        'https://arfp.github.io/tp/web/javascript/03-cardgame/cardgame.json',
    )
    dataCards.value = await response.json()
})
</script>

<style>
#app {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}
</style>
