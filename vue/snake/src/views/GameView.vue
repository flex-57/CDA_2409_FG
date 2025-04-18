<template>
    <section id="game">
        <h1>Score: {{ score }}</h1>
        <article>
            <div id="container-canvas">
                <canvas
                    v-if="!isOver"
                    id="board"
                    ref="canvasRef"
                    :width="gameWidth"
                    :height="gameHeight"
                ></canvas>
                <div
                    v-else
                    id="board"
                    :style="{ width: gameWidth + 'px', height: gameHeight + 'px' }"
                >
                    <h2>GAME OVER</h2>
                    <button @click="restart">Réessayer</button>
                </div>
            </div>
        </article>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const config = { width: 30, height: 30, cellSize: 30 }
const directions = [
    { key: 'ArrowUp', forbidenKey: 'ArrowDown', x: 0, y: -1 },
    { key: 'ArrowRight', forbidenKey: 'ArrowLeft', x: 1, y: 0 },
    { key: 'ArrowDown', forbidenKey: 'ArrowUp', x: 0, y: 1 },
    { key: 'ArrowLeft', forbidenKey: 'ArrowRight', x: -1, y: 0 },
]

const canvasRef = ref(null)
const snake = ref([])
const currentDirection = ref(null)
const nextDirection = ref(null)
const food = ref([])
const emptyCells = ref([])
const score = ref(0)
const isOver = ref(false)

let ctx

const gameWidth = computed(() => config.width * config.cellSize)
const gameHeight = computed(() => config.height * config.cellSize)
const centerCellSize = computed(() => (config.cellSize / 5) * 4)

const draw = () => {
    ctx.clearRect(0, 0, gameWidth.value, gameHeight.value)

    snake.value.forEach((elem, index) => {
        const px = elem.x * config.cellSize
        const py = elem.y * config.cellSize

        ctx.beginPath()
        ctx.roundRect(px, py, config.cellSize, config.cellSize, [config.cellSize / 2.5])
        if (index === 0) {
            ctx.roundRect(px - 2, py - 2, config.cellSize + 5, config.cellSize + 5, [
                config.cellSize / 2.5,
            ])
        }
        ctx.shadowColor = '#222'
        ctx.shadowBlur = 12
        ctx.fillStyle = 'black'
        ctx.fill()

        ctx.beginPath()
        ctx.roundRect(
            px - (centerCellSize.value - config.cellSize) / 2.2,
            py - (centerCellSize.value - config.cellSize) / 3,
            centerCellSize.value,
            centerCellSize.value,
            [centerCellSize.value / 2.5],
        )
        if (index === 0) {
            ctx.roundRect(
                px - (centerCellSize.value - config.cellSize + 5) / 2.2,
                py - (centerCellSize.value - config.cellSize + 5) / 3,
                centerCellSize.value + 5,
                centerCellSize.value + 5,
                [centerCellSize.value / 2.5],
            )
        }
        ctx.fillStyle = '#2e8f3e'
        ctx.fill()
    })
    const fx = food.value.x * config.cellSize
    const fy = food.value.y * config.cellSize

    ctx.beginPath()
    ctx.roundRect(fx, fy, config.cellSize, config.cellSize, [config.cellSize / 2])
    ctx.shadowColor = '#222'
    ctx.shadowBlur = 12
    ctx.fillStyle = '#111'
    ctx.fill()

    ctx.beginPath()
    ctx.roundRect(
        fx - (centerCellSize.value - config.cellSize) / 2.2,
        fy - (centerCellSize.value - config.cellSize) / 3,
        centerCellSize.value,
        centerCellSize.value,
        [centerCellSize.value / 2],
    )
    ctx.fillStyle = '#c0392b'
    ctx.fill()
}

const createFood = () => {
    emptyCells.value = []
    for (let x = 0; x < config.width; x++) {
        for (let y = 0; y < config.height; y++) {
            if (!snake.value.some((cell) => cell.x === x && cell.y === y)) {
                emptyCells.value.push({ x, y })
            }
        }
    }
    return emptyCells.value[Math.floor(Math.random() * emptyCells.value.length)]
}

const reset = () => {
    isOver.value = false
    score.value = 0
    currentDirection.value = null
    nextDirection.value = null
    emptyCells.value = []
    snake.value = [
        {
            x: Math.floor(config.width / 2),
            y: Math.floor(config.height / 2),
        },
    ]
    food.value = createFood()
    draw()
}

const restart = async () => {
    clearInterval(interval)
    interval = null
    reset()
    await nextTick()
    ctx = canvasRef.value.getContext('2d')
    draw()
}

let interval
const start = () => {
    if (interval) clearInterval(interval)
    interval = setInterval(() => {
        if (nextDirection.value) {
            currentDirection.value = nextDirection.value

            const head = {
                x: snake.value[0].x + currentDirection.value.x,
                y: snake.value[0].y + currentDirection.value.y,
            }

            if (
                head.x < 0 ||
                head.y < 0 ||
                head.x >= config.width ||
                head.y >= config.height ||
                snake.value.some((cell) => cell.x === head.x && cell.y === head.y)
            ) {
                isOver.value = true
            }
            snake.value.unshift(head)

            const eat = head.x === food.value.x && head.y === food.value.y

            if (!eat) {
                snake.value.pop()
            } else {
                food.value = createFood()
                score.value++
            }
            draw()
        }
    }, 200)
}

const onKeydown = (e) => {
    const dir = directions.find((d) => d.key === e.key)
    if (dir) {
        if (!currentDirection.value) {
            currentDirection.value = dir
            nextDirection.value = dir
            start()
        } else if (dir.key !== currentDirection.value.forbidenKey) {
            nextDirection.value = dir
        }
    }
}

onMounted(() => {
    ctx = canvasRef.value.getContext('2d')
    reset()
    draw()

    window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
})
</script>
