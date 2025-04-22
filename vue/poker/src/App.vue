<template>
    <h1>Poker</h1>
    <section id="table">
        <h2 v-if="currentState === 'preflop'">
            Préflop
            <button type="button" @click="flop">Flop</button>
        </h2>
        <h2 v-else-if="currentState === 'flop'">
            Flop
            <button type="button" @click="turn">Turn</button>
        </h2>
        <h2 v-else-if="currentState === 'turn'">
            Turn
            <button type="button" @click="river">River</button>
        </h2>
        <h2 v-else-if="currentState === 'river'">
            River
            <button type="button" @click="showdown">Next</button>
        </h2>
        <h2 v-else-if="currentState === 'showdown'">
            Joueur x gagne 100 $
            <button type="button" @click="start">Restart</button>
        </h2>
        <div id="cards-location">
            <CardComponent :cards="table" />
        </div>
        <div>
            <p>(SB: {{ smallBlind }}$ | BB: {{ bigBlind }}$)</p>
            <span>Pot: {{ pot }}$</span>
        </div>
    </section>
    <section id="players">
        <div v-for="player in players" :key="player.position">
            {{ result }}
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
                <span>{{ player.stack }} $</span>
                <span>Mise : {{ player.currentBet }} $</span>
            </div>
            <button v-if="player.isCurrent" @click="bet(50)">Miser 50 $</button>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getDeck } from './utils/deck'
import { combinations } from './utils/combinations'
import { Player } from './utils/player'
import CardComponent from './components/CardComponent.vue'

const { check, result } = combinations()
const deck = ref(getDeck().shuffle())

const nbPlayer = ref(4)
const baseStack = ref(1000)
const table = ref([])
const players = ref([])
const combi = ref([])
const dealerIndex = ref(0)
const pot = ref(0)
const currentState = ref('river')
const newGame = ref(true)
const smallBlind = ref(10)
const bigBlind = ref(20)

const bet = (val) => {
    const player = players.value.find((p) => p.isCurrent)
    if (player.stack >= val) {
        player.stack -= val
        player.currentBet += val
        pot.value += val
        nextPlayer()
    } else {
        // actions
    }
}

const nextPlayer = () => {
    const currentIndex = players.value.findIndex((p) => p.isCurrent)
    players.value[currentIndex].isCurrent = false
    const nextIndex = (currentIndex + 1) % nbPlayer.value
    players.value[nextIndex].isCurrent = true
}

const resetBet = () => {
    players.value.forEach((p) => (p.currentBet = 0))
}

const flop = () => {
    resetBet()
    burnAndDeal(3)
    currentState.value = 'flop'
}
const turn = () => {
    resetBet()
    burnAndDeal(1)
    currentState.value = 'turn'
}
const river = () => {
    resetBet()
    burnAndDeal(1)
    currentState.value = 'river'
}

const showdown = () => {
    currentState.value = 'showdown'
}

const burnAndDeal = (nbCards) => {
    deck.value.splice(0, 1)
    table.value.push(...deck.value.splice(0, nbCards))
    players.value.forEach((player) => combi.value.push(check([...player.hand, ...table.value])))
}

const start = () => {
    deck.value = getDeck().shuffle()
    table.value = []
    dealerIndex.value = (dealerIndex.value + 1) % nbPlayer.value

    for (let n = 1; n <= nbPlayer.value; n++) {
        if (newGame.value) {
            players.value.push(
                new Player(
                    deck.value.splice(0, 2),
                    n,
                    baseStack.value,
                    n - 1 === dealerIndex.value,
                ),
            )
        } else {
            players.value = players.value.map((p, index) => {
                return new Player(
                    deck.value.splice(0, 2),
                    p.position,
                    p.stack,
                    index === dealerIndex.value,
                )
            })
        }
    }
    newGame.value = false

    const smallBlindIndex = (dealerIndex.value + 1) % nbPlayer.value
    const bigBlindIndex = (dealerIndex.value + 2) % nbPlayer.value

    players.value[smallBlindIndex].isSmallblind = true
    players.value[bigBlindIndex].isBigBlind = true

    players.value[smallBlindIndex].stack -= smallBlind.value
    players.value[smallBlindIndex].currentBet = smallBlind.value

    players.value[bigBlindIndex].stack -= bigBlind.value
    players.value[bigBlindIndex].currentBet = bigBlind.value

    pot.value = smallBlind.value + bigBlind.value

    const playerToBetIndex = (bigBlindIndex + 1) % nbPlayer.value
    players.value[playerToBetIndex].isCurrent = true

    currentState.value = 'preflop'
    players.value.forEach((player) => combi.value.push(check([...player.hand, ...table.value])))
    /*
    console.log(players.value)
    console.log(table.value)
    */
}

onMounted(start)
</script>

<style scoped>
h1 {
    font-size: 4rem;
    margin-bottom: 2rem;
}
#table {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border: 3px solid #633211;
    border-radius: 3rem;
    background: linear-gradient(#70707044);
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
        align-items: end;
    }
}

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
        border: 3px solid #633211;
        border-radius: 3.2rem;
        background: linear-gradient(#70707044);
        width: 280px;
        margin-bottom: 0.5rem;

        &.current {
            scale: 1.04;
        }
    }
    h2 {
        padding: 1.1rem 2rem 0.3rem;
    }
}

h2 {
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
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid black;
        border-radius: 50%;
        font-size: 0.85rem;
        padding: 0.5rem;
        box-shadow: 0 3px 2px black;
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
