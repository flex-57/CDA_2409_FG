<template>
    <section id="table">
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
            Joueur x gagne 100 $
            <button type="button" @click="$emit('start')">Restart</button>
        </h2>
        <div id="cards-location">
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
    pot: Number,
})

defineEmits(['flop', 'turn', 'river', 'showdown', 'start'])
</script>

<style scoped>
#table {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border: 4px solid #633211;
    box-shadow: 2px 2px 2px #dddddd50;
    border-radius: 3rem;
    background: #70707044;
    margin: 0 auto;
    width: calc(750px);
    margin-bottom: 2rem;

    #cards-location {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        height: calc(80px * (21 / 29.7));
        margin: 0 calc(750px - (80px * (29.7 / 21) * 5 + 1.4rem));
    }
    h2 {
        padding: 0.2rem 2rem 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
}
span {
    width: 100%;
    font-weight: bold;
    font-size: 1.8rem;
}

p{
    font-weight: bold;
}

button {
    background: #633211;
    padding: 0.8rem 0;
    border-radius: 40%;
    border: 4px solid black;
    font-size: 1.2rem;
    color: white;
    text-shadow: 0px 0px 5px black;
    box-shadow: 0 3px 3px black;
    transition: all 0.1s ease-in-out;
    width: 100px;
    text-align: center;
    cursor: pointer;

    &:focus {
        box-shadow: none;
    }
}
</style>
