<template>
    <h1>Poker</h1>
    <TableComponent
        :currentState="currentState"
        :table="table"
        :smallBlind="smallBlind"
        :bigBlind="bigBlind"
        :pot="pot"
        @flop="flop"
        @turn="turn"
        @river="river"
        @showdown="showdown"
        @start="start"
    />
    <PlayersComponent :players="players" :combo="combo" @bet="bet" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getDeck } from './utils/deck'
import { combinations } from './utils/combinations'
import { Player } from './utils/Player'
import TableComponent from './components/TableComponent.vue'
import PlayersComponent from './components/PlayersComponent.vue'

const { check } = combinations()
const deck = ref(getDeck().shuffle())

const nbPlayer = ref(4)
const baseStack = ref(1000)
const smallBlind = ref(10)
const bigBlind = ref(20)
const table = ref([])
const players = ref([])
const combo = ref([])
const dealerIndex = ref(0)
const pot = ref(0)
const currentState = ref('')
const newGame = ref(true)

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
    combo.value = players.value.map((player) => check([...player.hand, ...table.value]))
    console.log(combo.value)
}

const start = () => {
    deck.value = getDeck().shuffle()
    table.value = []
    dealerIndex.value = newGame.value
        ? Math.floor(Math.random() * nbPlayer.value)
        : (dealerIndex.value + 1) % nbPlayer.value

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
            players.value.forEach((player, index) => {
                player.hand = deck.value.splice(0, 2)
                player.isDealer = index === dealerIndex.value
                player.isSmallblind = false
                player.isBigBlind = false
                player.isCurrent = false
                player.currentBet = 0
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
    combo.value = players.value.map((player) => check([...player.hand, ...table.value]))

    console.log(combo.value)

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
</style>
