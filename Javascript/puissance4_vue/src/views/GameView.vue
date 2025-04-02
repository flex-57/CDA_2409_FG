<template>
    <section>
        <PlayerBoxComponent
            prefix="player1"
            :player="playerStore.player1"
            :currentPlayer="currentPlayer"
            :winner="winner"
            :gameOver="gameOver"
        />
        <div v-if="!gameOver" id="board">
            <template v-for="(row, x) in matrix" :key="x">
                <div
                    v-for="(cell, y) in row"
                    :key="y"
                    class="cell"
                    :style="{ background: cell }"
                    @click="play(y)"
                ></div>
            </template>
        </div>
        <PlayerBoxComponent
            prefix="player2"
            :player="playerStore.player2"
            :currentPlayer="currentPlayer"
            :winner="winner"
            :gameOver="gameOver"
        />
    </section>
    <button v-if="gameOver" @click="restartGame">Rejouer</button>
    <button v-if="gameOver" @click="homePage">Accueil</button>
</template>

<script setup>
import PlayerBoxComponent from '@/components/PlayerBoxComponent.vue'
import { usePlayerStore } from '@/stores/playerStore'
import { ref } from 'vue'
import router from '@/router'

const playerStore = usePlayerStore()
playerStore.loadPlayers()
const matrix = ref([...Array(6)].map(() => Array(7).fill('')))
const currentPlayer = ref(playerStore.player1)
const winner = ref(null)
const gameOver = ref(false)

const play = (y) => {
    const columnCells = matrix.value.map((row) => row[y])
    const availableCellX = columnCells.lastIndexOf('')

    if (availableCellX !== -1) {
        matrix.value[availableCellX][y] = currentPlayer.value.color
        console.table(matrix.value)

        if (checkVictory(availableCellX, y)) {
            gameOver.value = true
            winner.value = currentPlayer.value
            winner.value.score++
            playerStore.savePlayers()
        } else if (checkDraw()) {
            gameOver.value = true
        } else {
            currentPlayer.value =
                currentPlayer.value.color === playerStore.player1.color
                    ? playerStore.player2
                    : playerStore.player1
        }
    }
}

const checkDirection = (x, y, dx, dy) => {
    let count = 1
    for (let direction of [1, -1]) {
        for (let i = 1; i < 4; i++) {
            const nx = x + dx * i * direction
            const ny = y + dy * i * direction

            if (
                nx >= 0 &&
                nx < 6 &&
                ny >= 0 &&
                ny < 7 &&
                matrix.value[nx][ny] === currentPlayer.value.color
            ) {
                count++
            } else i = 4
        }
    }
    return count >= 4
}

const checkVictory = (x, y) => {
    return (
        checkDirection(x, y, 1, 0) || // Horizontal
        checkDirection(x, y, 0, 1) || // Vertical
        checkDirection(x, y, 1, 1) || // Diagonale \
        checkDirection(x, y, 1, -1) // Diagonale /
    )
}

const checkDraw = () => matrix.value.every((row) => row.every((cell) => cell !== ''))

const restartGame = () => {
    matrix.value = [...Array(6)].map(() => Array(7).fill(''))
    currentPlayer.value = playerStore.player1
    gameOver.value = false
    winner.value = null
}

const homePage = () => router.replace('/')
</script>
