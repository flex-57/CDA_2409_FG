<template>
    <section id="table" class="container">
        <h2 v-if="currentState === 'preflop'">
            Préflop
            <button type="button" @click="$emit('flop')">Flop</button>
        </h2>
        <h2 v-else-if="currentState === 'flop'">
            Flop
            <button type="button" @click="$emit('turn')">Turn</button>
        </h2>
        <h2 v-else-if="currentState === 'turn'">
            Turn
            <button type="button" @click="$emit('river')">River</button>
        </h2>
        <h2 v-else-if="currentState === 'river'">
            River
            <button type="button" @click="$emit('showdown')">Next</button>
        </h2>
        <h2 v-else-if="currentState === 'showdown'">
            Joueur {{ winner.position }} gagne {{ pot }}$
            <button type="button" @click="$emit('start')">Restart</button>
        </h2>
        <div class="cards-location">
            <CardComponent :cards="table" />
        </div>
        <div>
            <p>(SB: {{ smallBlind }}$ | BB: {{ bigBlind }}$)</p>
            <span>Pot: {{ pot }}$</span>
        </div>
    </section>
</template>

<script setup>
import CardComponent from './CardComponent.vue'

defineProps({
    currentState: String,
    table: Array,
    smallBlind: Number,
    bigBlind: Number,
    winner: Object,
    pot: Number,
})

defineEmits(['flop', 'turn', 'river', 'showdown', 'start'])
</script>

<style scoped>
#table {
    width: 430px;
    margin: 0 auto 2rem;
}

.cards-location {
    width: calc(60px * 5 + 1.2rem);
    justify-content: left;
}

button {
    margin-bottom: 5px;
}
</style>
