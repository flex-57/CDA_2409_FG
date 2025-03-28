<template>
    <div v-if="!isOver" id="board">
        <template v-for="(row, x) in matrix" :key="row">
            <div v-for="(cell, y) in row" :key="cell" class="cell" :style="'background: black'" :data-x="x" :data-y="y" @click="setBg">{{ x }};{{ y }}</div>
        </template>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const player1 = reactive({
    name: '',
    color: 'red',
    score: 0
})
const player2 = reactive({
    name: '',
    color: 'yellow',
    score: 0
})


let currentPlayer = reactive(player1)

const matrix = reactive([...Array(6)].map(() => Array(7).fill('')))

const isOver = ref(false)

const setBg = (cell) => {

    if(availableCell(cell)) {
        availableCell(cell).style.background = currentPlayer.color
        matrix[parseInt(availableCell(cell).dataset.x)][parseInt(availableCell(cell).dataset.y)] = currentPlayer

        console.log(availableCell(cell));
        console.table(matrix);

        if(checkVictory(parseInt(availableCell(cell).dataset.x), parseInt(availableCell(cell).dataset.y))) {
            isOver.value = true
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1
    }
}

const availableCell = (cell) => {
    const columnCells = [...document.querySelectorAll(`.cell[data-y="${cell.target.dataset.y}"]`)]

    return columnCells.reverse().find(s => s.style.background === 'black')
}

const checkDirection = (x, y, dx, dy, player) => {
    let count = 1
    for (let direction of [1, -1]) {
        for (let i = 1; i < 4; i++) {
            const nx = x + dx * i * direction
            const ny = y + dy * i * direction

            if (nx >= 0 && nx < 6 && ny >= 0 && ny < 7 && matrix[nx][ny] === player) {
                count++
            }
            else i = 4
        }
    }
    return count >= 4
}

const checkVictory = (x, y) => {
    const player = matrix[x][y]
    return (
        checkDirection(x, y, 1, 0, player) || // Horizontal
        checkDirection(x, y, 0, 1, player) || // Vertical
        checkDirection(x, y, 1, 1, player) || // Diagonale \
        checkDirection(x, y, 1, -1, player) // Diagonale /
    )
}


</script>

<style scoped>
#board {
    height: 80vh;
    width: calc(80vh / 6 * 7);
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(7, 1fr);
    gap: 1rem;
    padding: 1rem;
    background: var(--color1);
    border-radius: var(--radius);
    box-shadow: 0 5px 12px var(--color3);
}

.cell {
    border: 3px solid #000;
    border-radius: 50%;
    background: #000;
    box-shadow: 0 4px 5px var(--color2);
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .5s;
    color:red;
}

</style>
