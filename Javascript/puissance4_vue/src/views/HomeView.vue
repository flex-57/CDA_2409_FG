<template>
    <form action="" @submit.prevent="start">
        <div id="form">
            <div>
                <PlayerFormComponent
                    title="Joueur 1"
                    prefix="player1"
                    :player="playerStore.player1"
                    :colors="colors"
                />
            </div>
            <div>
                <PlayerFormComponent
                    title="Joueur 2"
                    prefix="player2"
                    :player="playerStore.player2"
                    :colors="colors"
                />
            </div>
        </div>
        <div v-show="errors.length" class="error">
            <p v-for="(error, i) of errors" :key="i">{{ error }}</p>
        </div>
        <input type="submit" value="Commencer" />
    </form>
</template>

<script setup>
import PlayerFormComponent from '@/components/PlayerFormComponent.vue'
import { usePlayerStore } from '@/stores/playerStore'
import { ref } from 'vue'
import router from '@/router'

const playerStore = usePlayerStore()

const colors = {
    red: 'Rouge',
    yellow: 'Jaune',
    green: 'Vert',
    orange: 'Orange',
    purple: 'Violet',
    white: 'Blanc',
}

const errors = ref([])
/*
const checkErrors = () => {
    errors.value = []

    if (!player1.value.name || !player2.value.name)
        addError('Veuillez entrer un nom pour chaque joueur!')
    if (
        !Object.keys(colors).includes(player1.value.color) ||
        !Object.keys(colors).includes(player2.value.color)
    )
        addError('Veuillez choisir une couleur valide!')
    if (player1.value.color === player2.value.color)
        addError('Les deux joueurs ne peuvent pas avoir la même couleur!')
}

const addError = (msg) => {
    errors.value.push(msg)
}
*/
const start = () => {
    errors.value = [
        ...playerStore.player1.validate(Object.keys(colors)),
        ...playerStore.player2.validate(Object.keys(colors)),
    ]

    if (errors.value.length === 0) {
        playerStore.savePlayers()
        router.replace('/game')
    }
}
</script>
