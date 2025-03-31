<template>
    <section>
        <PlayerBoxComponent
            :id="'player1-box'"
            :player="player1"
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
                >
                </div>
            </template>
        </div>
        <PlayerBoxComponent
            :id="'player2-box'"
            :player="player2"
            :currentPlayer="currentPlayer"
            :winner="winner"
            :gameOver="gameOver"
        />
    </section>
    <button v-if="gameOver" @click="resetGame">Rejouer</button>
</template>

<script setup>
import PlayerBoxComponent from '@/components/PlayerBoxComponent.vue'
import { ref } from 'vue'

const player1 = ref({
    name: 'rouge',
    color: 'red',
    score: 0,
})

const player2 = ref({
    name: 'jaune',
    color: 'yellow',
    score: 0,
})

const matrix = ref([...Array(6)].map(() => Array(7).fill('')))
const currentPlayer = ref(player1.value)
const winner = ref(null)
const gameOver = ref(false)

const play = (y) => {
    const columnCells = matrix.value.map((row) => row[y])
    const availableCellX = columnCells.lastIndexOf('')
    console.table(columnCells)

    if (availableCellX !== -1) {
        matrix.value[availableCellX][y] = currentPlayer.value.color
        console.table(matrix.value)

        if (checkVictory(availableCellX, y)) {
            gameOver.value = true
            winner.value = currentPlayer.value
            winner.value.score++
        } else if (checkDraw()) {
            gameOver.value = true
        } else {
            currentPlayer.value =
                currentPlayer.value.color === player1.value.color ? player2.value : player1.value
        }
    }
}

const checkDirection = (x, y, dx, dy, player) => {
    let count = 1
    for (let direction of [1, -1]) {
        for (let i = 1; i < 4; i++) {
            const nx = x + dx * i * direction
            const ny = y + dy * i * direction

            if (nx >= 0 && nx < 6 && ny >= 0 && ny < 7 && matrix.value[nx][ny] === player) {
                count++
            } else i = 4
        }
    }
    return count >= 4
}

const checkVictory = (x, y) => {
    const player = matrix.value[x][y]
    return (
        checkDirection(x, y, 1, 0, player) || // Horizontal
        checkDirection(x, y, 0, 1, player) || // Vertical
        checkDirection(x, y, 1, 1, player) || // Diagonale \
        checkDirection(x, y, 1, -1, player) // Diagonale /
    )
}

const checkDraw = () => {
    return matrix.value.every((row) => row.every((cell) => cell !== ''))
}

const resetGame = () => {
    matrix.value = [...Array(6)].map(() => Array(7).fill(''))
    currentPlayer.value = player1.value
    gameOver.value = false
    winner.value = null
}
</script>
