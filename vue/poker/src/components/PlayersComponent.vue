<template>
    <section id="players">
        <div v-for="(player, i) in players" :key="player.position">
            <div class="combo">
                <p>{{ combo[i].result }}</p>
            </div>
            <div class="player container" :class="{ current: player.isCurrent }">
                <h2>
                    Joueur {{ player.position }}
                    <span
                        v-if="player.isDealer"
                        class="dealer"
                        :class="{ actif: player.isDealer }"
                        >{{ player.isDealer ? 'Deal' : '' }}</span
                    >
                    <span
                        v-if="player.isSmallblind"
                        class="blinds"
                        :class="{ actif: player.isSmallblind }"
                        >{{ player.isSmallblind ? 'SB' : '' }}</span
                    >
                    <span
                        v-if="player.isBigBlind"
                        class="blinds"
                        :class="{ actif: player.isBigBlind }"
                        >{{ player.isBigBlind ? 'BB' : '' }}</span
                    >
                </h2>
                <div class="cards-location">
                    <CardComponent :cards="player.hand" />
                </div>
                <span class="stack">{{ player.stack }}$</span>
                <span class="bet">Mise : {{ player.currentBet }}$</span>
            </div>
            <button v-if="player.isCurrent" @click="$emit('bet', 50)">Miser 50$</button>
        </div>
    </section>
</template>

<script setup>
import CardComponent from './CardComponent.vue'

defineProps({
    players: {
        type: Array,
        required: true,
    },
    combo: {
        type: Array,
        required: true,
    },
})

defineEmits(['bet'])
</script>

<style scoped>
#players {
    display: flex;
    justify-content: space-evenly;
    flex-direction: row-reverse;
}

.player {
    width: 200px;
    margin-bottom: .4rem;
}

.cards-location {
    display: flex;
}

.actif {
    width: 35px;
    padding: 0.4rem 0;
    margin-bottom: 7px;
    font-size: 0.7rem;
    font-weight: bold;
    border: 2px solid black;
    border-radius: 50%;
    box-shadow: 1px 2px 1px;
}

.dealer {
    background: #ffa600;
}

.blinds {
    background: #d1d1d1;
}

.combo {
    display: flex;
    justify-content: center;
}

p {
    padding: 0.4rem 0 0.2rem;
    font-size: 0.9rem;
    font-weight: bold;
}

.stack, .bet {
    width: 100%;
    font-weight: bold;
    font-size: 1.2rem;
    display: block;
}
</style>
