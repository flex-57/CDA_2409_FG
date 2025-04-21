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

const config = { width: 30, height: 30, cellSize: 25 }
const directions = [
    { key: 'ArrowUp', forbidenKey: 'ArrowDown', x: 0, y: -1 },
    { key: 'ArrowRight', forbidenKey: 'ArrowLeft', x: 1, y: 0 },
    { key: 'ArrowDown', forbidenKey: 'ArrowUp', x: 0, y: 1 },
    { key: 'ArrowLeft', forbidenKey: 'ArrowRight', x: -1, y: 0 },
]
const baseLevel = 5
const baseSpeed = 250
const factorSpeed = 0.95

const tickSound = new Audio('./src/assets/sounds/tick.mp3')
const eatSound = new Audio('./src/assets/sounds/eat.mp3')
const levelUpSound = new Audio('./src/assets/sounds/level_up.mp3')
const playPauseSound = new Audio('./src/assets/sounds/play_pause.mp3')
const deathSound = new Audio('./src/assets/sounds/death.mp3')

const canvasRef = ref(null)
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
const centerCellSize = computed(() => (config.cellSize / 5) * 4)
const nextLevel = computed(() => Math.ceil((baseLevel * level.value) / 2))

const playSounds = (audio, vol = 0.5) => {
    audio.currentTime = 0
    audio.volume = vol
    audio.play()
}

const draw = () => {
    ctx.clearRect(0, 0, gameWidth.value, gameHeight.value)

    snake.value.forEach((elem, index) => {
        const px = elem.x * config.cellSize
        const py = elem.y * config.cellSize
        const isHead = index === 0

        drawCell(
            px - (isHead ? 3 : 0),
            py - (isHead ? 3 : 0),
            config.cellSize + (isHead ? 6 : 0),
            'black',
            config.cellSize / (isHead ? 2 : 2.6),
        )

        drawCell(
            px - (centerCellSize.value - config.cellSize + (isHead ? 7 : 0)) / 2.2,
            py - (centerCellSize.value - config.cellSize + (isHead ? 7 : 0)) / 3,
            centerCellSize.value + (isHead ? 5.5 : 0),
            '#2e8f3e',
            centerCellSize.value / (isHead ? 2 : 2.6),
        )
    })

    const fx = food.value.x * config.cellSize
    const fy = food.value.y * config.cellSize

    drawCell(fx, fy, config.cellSize, 'black', config.cellSize / 2)
    drawCell(
        fx - (centerCellSize.value - config.cellSize) / 2.2,
        fy - (centerCellSize.value - config.cellSize) / 3,
        centerCellSize.value,
        '#c0392b',
        centerCellSize.value,
    )

    if (isPaused.value) {
        ctx.beginPath()
        ctx.fillStyle = '#00000050'
        ctx.fillRect(0, 0, gameWidth.value, gameHeight.value)

        ctx.fillStyle = '#ccc'
        ctx.font = 'bold 40px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('PAUSE', gameWidth.value / 2, gameHeight.value / 2)
    }

    if (isOver.value) {
        ctx.beginPath()
        ctx.fillStyle = '#00000050'
        ctx.fillRect(0, 0, gameWidth.value, gameHeight.value)

        ctx.fillStyle = '#c0392b'
        ctx.font = 'bold 90px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('GAME OVER', gameWidth.value / 2, gameHeight.value / 2 - 50)

        ctx.fillStyle = '#ccc'
        ctx.font = '28px Arial'
        ctx.fillText('Push Enter to play again', gameWidth.value / 2, gameHeight.value / 2 + 50)
    }
}

const drawCell = (x, y, size, color, radius) => {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.roundRect(x, y, size, size, [radius])
    ctx.shadowColor = '#222'
    ctx.shadowBlur = 12
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
