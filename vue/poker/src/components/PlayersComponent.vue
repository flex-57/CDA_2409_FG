<template>
    <section id="players">
        <div v-for="(player, i) in players" :key="player.position">
            <div class="combo">
                <p>{{ combo[i].result }}</p>
            </div>
            <div class="player" :class="{ current: player.isCurrent }">
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
                <CardComponent :cards="player.hand" />
                <span>{{ player.stack }}$</span>
                <span>Mise : {{ player.currentBet }}$</span>
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
    margin-bottom: 2rem;

    .player {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.5rem 0.2rem;
        text-align: center;
        border: 4px solid #632111;
        box-shadow: 2px 2px 2px #dddddd50;
        border-radius: 3.2rem;
        background: #70707044;
        width: 280px;
        margin-bottom: 0.5rem;

        &.current {
            box-shadow: inset 2px 2px 2px #dddddd80;
        }
    }
    h2 {
        padding: 1.1rem 2rem 0.3rem;
        font-size: 2.2rem;
        width: 100%;
        border-bottom: 3px solid #633211;
        border-radius: 3rem 3rem 0 0;
        background: #ffffff1c;
        display: flex;
        justify-content: space-between;

        .dealer {
            background: #eeaa44;
        }
        .blinds {
            background: #d1d1d1;
        }
        .actif {
            width: 45px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid black;
            border-radius: 50%;
            font-size: 0.8rem;
            margin-top: -6px;
            box-shadow: 0 3px 2px black;
        }
    }
    .combo {
        display: flex;
        justify-content: center;
    }
    p {
        padding: 0.4rem 0 0;
        background: #70707044;
        border-radius: 100px 100px 0 0;
        box-shadow: inset 2px 2px 3px #dddddd40;
        margin-bottom: 0.1rem;
        width: 200px;
        font-weight: bold;
    }
}

span {
    width: 100%;
    font-weight: bold;
    font-size: 1.8rem;
}

button {
    background: #633211;
    padding: 0.8rem 0;
    border-radius: 40%;
    border: 4px solid black;
    font-size: 1.2rem;
    color: white;
    text-shadow: 0px 0px 5px black;
    box-shadow: 1px 2px 3px black;
    transition: all 0.1s ease-in-out;
    width: 100px;
    text-align: center;
    cursor: pointer;

    &:focus {
        box-shadow: none;
    }
}
</style>
