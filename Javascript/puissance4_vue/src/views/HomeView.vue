<template>
    <form action="" @submit.prevent="start">
        <div id="form">
            <div>
                <fieldset>
                    <h3>Joueur 1</h3>
                    <div>
                        <label for="player1-name">Nom</label>
                        <input type="text" id="player1-name" v-model="player1.name" />
                    </div>
                    <div>
                        <label for="player1-color">Couleur</label>
                        <select id="player1-color" v-model="player1.color">
                            <option v-for="color in colors" :key="color" :value="color">
                                {{ color.charAt(0).toUpperCase() + color.slice(1).toLowerCase() }}
                            </option>
                        </select>
                    </div>
                </fieldset>
            </div>
            <div>
                <fieldset>
                    <h3>Joueur 2</h3>
                    <div>
                        <label for="player2-name">Nom</label>
                        <input type="text" id="player2-name" v-model="player2.name" />
                    </div>
                    <div>
                        <label for="player2-color">Couleur</label>
                        <select id="player2-color" v-model="player2.color">
                            <option v-for="color in colors" :key="color" :value="color">
                                {{ color.charAt(0).toUpperCase() + color.slice(1).toLowerCase() }}
                            </option>
                        </select>
                    </div>
                </fieldset>
            </div>
        </div>
        <div v-show="errors.length" v-for="(error, i) of errors" :key="i">{{ error }}</div>
        <input
            type="submit"
            value="Commencer"
            :disabled="!checkErrors()"
        />
    </form>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'

const colors = ['red', 'yellow', 'green', 'orange', 'purple', 'white']

const player1 = ref({
    name: '',
    color: colors[0],
    score: 0,
})

const player2 = ref({
    name: '',
    color: colors[1],
    score: 0,
})

const errors = ref([])

const checkErrors = () => {
    errors.value = []

    if (!player1.value.name || !player2.value.name)
        errors.value.push('Veuillez entrer un nom pour chaque joueur!')
    if (!colors.includes(player1.value.color) || !colors.includes(player2.value.color))
        errors.value.push('Veuillez choisir une couleur valide!')
    if (player1.value.color === player2.value.color)
        errors.value.push('Les deux joueurs ne peuvent pas avoir la même couleur!')

    return errors.value.length === 0
}

const start = () => {
    if (errors.value.length) router.push('/game')
}
</script>
