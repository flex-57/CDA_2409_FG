<template>
    <section id="game">
        <h1>Score: {{ score }}</h1>
        <article>
            <div id="container-canvas">
                <div id="board" :style="{ width: width + 'px', height: height + 'px' }">
                    <h2>Game Over</h2>
                    <button type="button" @click="restart">Réessayer</button>
                </div>
            </div>
        </article>
    </section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const score = Number(route.query.score)
const width = Number(route.query.width)
const height = Number(route.query.height)

const restart = () => {
    router.replace('/refresh')
    setTimeout(() => {
        router.replace({
            path: '/game',
            query: {
                score,
                width,
                height,
            },
        })
    }, 50)
}
</script>
