<template>
    <header>
        <h1>
            <span v-for="letter in titleGame" :key="letter">{{ letter }}</span>
        </h1>
    </header>
    <main>
        <RouterView />
    </main>
</template>

<script setup>
const titleGame = [...'Puissance 4']
</script>
