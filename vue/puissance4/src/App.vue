<template>
    <h1>
        <span
            v-for="(letter, i) in titleGame"
            :key="i"
            :style="{ color: i % 2 === 0 ? playerStore.player1.color : playerStore.player2.color }"
        >
            {{ letter }}
        </span>
    </h1>
    <RouterView />
</template>

<script setup>
import { usePlayerStore } from '@/stores/playerStore'

const playerStore = usePlayerStore()

const titleGame = [...'Puissance 4']
</script>
