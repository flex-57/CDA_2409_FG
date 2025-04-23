<template>
    <div v-for="(card, i) in cards" :key="i" :class="`card color-${card.family.color}`">
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
    border-radius: 0.5rem;
    width: 80px;
    height: calc(80px / 21 * 28);
    padding: 0.2rem;
    background: white;
    font-weight: bold;
    box-shadow: 1px 2px 3px #585858;
    transition: opacity 0.3s ease-in-out;
}
.card.color-red {
    color: red;
    border: 2px solid red;
}

.card.color-black {
    color: black;
    border: 2px solid black;
}

.card-top {
    text-align: left;
    font-size: 2.6rem;
    border-bottom: none;
    line-height: 2.2rem;
}
.card-bottom {
    font-family: sans-serif;
    text-align: right;
    font-size: 5.8rem;
    border-top: none;
    line-height: 3.4rem;
}
</style>
