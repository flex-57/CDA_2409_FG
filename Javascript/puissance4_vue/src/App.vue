<template>
    <h1>
        <span
            v-for="(letter, i) in titleGame"
            :key="i"
            :style="{ color: i % 2 === 0 ? 'red' : 'yellow' }"
        >
            {{ letter }}
        </span>
    </h1>
    <RouterView />
</template>

<script setup>
const titleGame = [...'Puissance 4']
</script>
