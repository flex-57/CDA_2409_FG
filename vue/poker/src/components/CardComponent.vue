<template>
    <div v-for="(card, i) in cards" :key="i" :class="`card color-${card.family.name}`">
        <div class="card-top">{{ card.rank.fig }}</div>
        <div class="card-bottom">{{ card.family.symbol }}</div>
    </div>
</template>

<script setup>
defineProps({
    cards: {
        type: Array,
        required: true,
    },
})
</script>

<style scoped>
.card {
    background: white;
    border-radius: 0.5rem;
    width: 60px;
    height: calc(60px * 29.7 / 21);
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.card.color-hearts,
.card.color-diamonds {
    color: red;
    border: 2px solid red;
}

.card.color-spades,
.card.color-clubs {
    color: black;
    border: 3px solid black;
}

.card-top {
    height: 40%;
    text-align: left;
    padding: 0 0.2rem;
    font-size: 2.2rem;
    line-height: 2rem;
    font-weight: bold;
}
.card-bottom {
    height: 60%;
    text-align: right;
    padding: 0 0.2rem;
    font-size: 5rem;
    line-height: 2rem;
    font-weight: bold;
}

.card.color-clubs .card-bottom,
.card.color-hearts .card-bottom {
    font-size: 4.6rem;
    line-height: 2.3rem;
}
</style>
