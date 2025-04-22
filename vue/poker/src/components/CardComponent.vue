<template>
    <div v-for="(card, i) in cards" :key="i" :class="`card color-${card.family.color}`">
        <div class="card-top">{{ card.family.symbol }}</div>
        <div class="card-bottom">{{ card.rank.fig }}</div>
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
    border: 2px solid black;
    border-radius: 0.5rem;
    padding: 0.3rem;
    aspect-ratio: 10 / 13;
    width: 80px;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-weight: bold;
    box-shadow: 1px 2px 3px #585858;
    transition: opacity 0.3s ease-in-out;
}
.card.color-red {
    color: red;
}

.card.color-black {
    color: black;
}

.card-top {
    text-align: right;
    font-size: 4.2rem;
    line-height: 2.5rem;
}
.card-bottom {
    font-family: sans-serif;
    text-align: left;
    font-size: 3.5rem;
    line-height: 2.7rem;
}
</style>
