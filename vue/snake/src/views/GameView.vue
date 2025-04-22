<template>
    <section id="game">
        <header>
            <h1>
                Level: <b>{{ level }}</b> | Score: <b>{{ score }}</b> / <b>{{ nextLevel }}</b>
            </h1>
            <p>Pause on/off: <b>Esc</b></p>
        </header>
        <article>
            <div id="container-canvas">
                <canvas id="board" ref="canvasRef" :width="gameWidth" :height="gameHeight"></canvas>
            </div>
        </article>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { drawCanvas } from '@/utils/draw'

const config = { width: 30, height: 20, cellSize: 25 }
const directions = [
    { key: 'ArrowUp', forbidenKey: 'ArrowDown', x: 0, y: -1 },
    { key: 'ArrowRight', forbidenKey: 'ArrowLeft', x: 1, y: 0 },
    { key: 'ArrowDown', forbidenKey: 'ArrowUp', x: 0, y: 1 },
    { key: 'ArrowLeft', forbidenKey: 'ArrowRight', x: -1, y: 0 },
]
const baseLevel = 5
const baseSpeed = 200
const factorSpeed = 0.95

const tickSound = new Audio('./src/assets/sounds/tick.mp3')
const eatSound = new Audio('./src/assets/sounds/eat.mp3')
const levelUpSound = new Audio('./src/assets/sounds/level_up.mp3')
const playPauseSound = new Audio('./src/assets/sounds/play_pause.mp3')
const deathSound = new Audio('./src/assets/sounds/death.mp3')

const canvasRef = ref(null)

const { drawCell, drawText, drawBg } = drawCanvas()

const direction = ref({
    current: null,
    next: null,
})
const snake = ref([])
const food = ref([])
const emptyCells = ref([])

const score = ref(0)
const level = ref(1)
const speed = ref(baseSpeed)

const isOver = ref(false)
const isStarted = ref(false)
const isPaused = ref(false)

let ctx

const gameWidth = computed(() => config.width * config.cellSize)
const gameHeight = computed(() => config.height * config.cellSize)
const nextLevel = computed(() => Math.ceil((baseLevel * level.value) / 2))

const playSounds = (audio, vol = 0.5) => {
    audio.currentTime = 0
    audio.volume = vol
    audio.play()
}

const draw = () => {
    ctx.clearRect(0, 0, gameWidth.value, gameHeight.value)

    const cellSize = config.cellSize
    const innerCellSize = cellSize * 0.8

    snake.value.forEach((elem, index) => {
        const px = elem.x * cellSize
        const py = elem.y * cellSize
        const isHead = index === 0

        /** Shadow */
        drawCell(
            ctx,
            px - (isHead ? 1 : -1),
            py - (isHead ? 1 : -1),
            cellSize + (isHead ? 2 : -2),
            '#000',
            cellSize / (isHead ? 2.4 : 2.8),
        )
        /** Colored parts */
        drawCell(
            ctx,
            px - (isHead ? -1 : -3),
            py - (isHead ? -1 : -3),
            innerCellSize + (isHead ? 1.4 : -2.2),
            index % 2 === 0 ? '#2e8f3e' : '#34a347',
            innerCellSize / (isHead ? 2.6 : 3),
        )

        if (isHead) {
            if (direction.value.current) {
                if (direction.value.current.key === 'ArrowUp') {
                    drawCell(ctx, px, py, 8, '#000', 5)
                    drawCell(ctx, px + 1, py + 1, 6, '#c0392b', 5)

                    drawCell(ctx, px + innerCellSize - 4, py, 8, '#000', 5)
                    drawCell(ctx, px + innerCellSize - 3, py + 1, 6, '#c0392b', 5)
                }

                if (direction.value.current.key === 'ArrowDown') {
                    drawCell(ctx, px, py + innerCellSize - 5, 8, '#000', 5)
                    drawCell(ctx, px + 1, py + innerCellSize - 4, 6, '#c0392b', 5)

                    drawCell(ctx, px + innerCellSize - 4, py + innerCellSize - 5, 8, '#000', 5)
                    drawCell(ctx, px + innerCellSize - 3, py + innerCellSize - 4, 6, '#c0392b', 5)
                }
                if (direction.value.current.key === 'ArrowRight') {
                    drawCell(ctx, px + innerCellSize - 4, py, 8, '#000', 5)
                    drawCell(ctx, px + innerCellSize - 3, py + 1, 6, '#c0392b', 5)

                    drawCell(ctx, px + innerCellSize - 4, py + innerCellSize - 5, 8, '#000', 5)
                    drawCell(ctx, px + innerCellSize - 3, py + innerCellSize - 4, 6, '#c0392b', 5)
                }

                if (direction.value.current.key === 'ArrowLeft') {
                    drawCell(ctx, px, py, 8, '#000', 5)
                    drawCell(ctx, px + 1, py + 1, 6, '#c0392b', 5)

                    drawCell(ctx, px, py + innerCellSize - 5, 8, '#000', 5)
                    drawCell(ctx, px + 1, py + innerCellSize - 4, 6, '#c0392b', 5)
                }
            } else {
                drawCell(ctx, px, py, 8, '#000', 5)
                drawCell(ctx, px + 1, py + 1, 6, '#c0392b', 5)

                drawCell(ctx, px + innerCellSize - 4, py, 8, '#000', 5)
                drawCell(ctx, px + innerCellSize - 3, py + 1, 6, '#c0392b', 5)
            }
        }
    })

    /** Piece of fruit */
    const fx = food.value.x * cellSize
    const fy = food.value.y * cellSize

    drawCell(ctx, fx, fy, cellSize, '#000', cellSize / 2)
    drawCell(ctx, fx + 2, fy + 2, innerCellSize, '#c0392b', innerCellSize)

    /** StatePages */
    if (isPaused.value) {
        drawBg(ctx, gameWidth.value, gameHeight.value)
        drawText(ctx, gameWidth.value / 2, gameHeight.value / 2, 'PAUSE', '#ccc', 'bold 40px Arial')
    }

    if (isOver.value) {
        drawBg(ctx, gameWidth.value, gameHeight.value)
        drawText(
            ctx,
            gameWidth.value / 2,
            gameHeight.value / 2 - 50,
            'GAME OVER',
            '#c0392b',
            'bold 90px Arial',
        )
        drawText(
            ctx,
            gameWidth.value / 2,
            gameHeight.value / 2 + 50,
            'Push Enter to play again',
            '#ccc',
            '28px Arial',
        )
    }
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

let interval = null
const start = () => {
    isStarted.value = true
    if (interval) clearInterval(interval)
    interval = setInterval(() => {
        if (direction.value.next) {
            direction.value.current = direction.value.next

            const head = {
                x: snake.value[0].x + direction.value.current.x,
                y: snake.value[0].y + direction.value.current.y,
            }

            if (
                head.x < 0 ||
                head.y < 0 ||
                head.x >= config.width ||
                head.y >= config.height ||
                snake.value.some((cell) => cell.x === head.x && cell.y === head.y)
            ) {
                playSounds(deathSound, 0.2)
                if (interval) clearInterval(interval)
                interval = null
                isOver.value = true
            }
            snake.value.unshift(head)

            const eat = head.x === food.value.x && head.y === food.value.y

            if (!eat) {
                snake.value.pop()
            } else {
                food.value = createFood()
                playSounds(eatSound, 0.4)
                score.value++
            }
            playSounds(tickSound, 0.6)
            draw()
        }
    }, speed.value)
}

const reset = () => {
    if (isOver.value) {
        level.value = 1
        speed.value = 250
        isOver.value = false
    }
    score.value = 0
    isStarted.value = false
    direction.value.current = null
    direction.value.next = null
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
    if (interval) clearInterval(interval)
    interval = null
    reset()
    await nextTick()
    ctx = canvasRef.value.getContext('2d')
    draw()
}

const pause = () => {
    if (isStarted.value && !isOver.value) {
        playSounds(playPauseSound, 0.2)
        isPaused.value = !isPaused.value
        if (isPaused.value) {
            if (interval) clearInterval(interval)
            interval = null
            draw()
        } else {
            start()
        }
    }
}

const onKeydown = (e) => {
    if (!isPaused.value) {
        const dir = directions.find((d) => d.key === e.key)
        if (dir) {
            if (!isStarted.value) {
                direction.value.current = dir
                direction.value.next = dir
                start()
            } else if (dir.key !== direction.value.current.forbidenKey) {
                direction.value.next = dir
            }
        }
    }

    if (isOver.value && e.key === 'Enter') {
        restart()
    }

    if (e.key === 'Escape') {
        pause()
    }
}

watch(score, (newScore) => {
    if (newScore === nextLevel.value) {
        playSounds(levelUpSound)
        level.value++
        speed.value = Math.ceil(speed.value * factorSpeed)
        isStarted.value = false
        restart()
    }
})

onMounted(() => {
    ctx = canvasRef.value.getContext('2d')
    reset()
    draw()

    window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
    if (interval) clearInterval(interval)
    window.removeEventListener('keydown', onKeydown)
})
</script>
