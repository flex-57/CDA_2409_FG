<template>
    <section>
        <div class="title-box">
            <h2>Boulangerie</h2>
            <button @click="emit('openCloseBakery')">
                {{ state.isOpen ? 'Fermer la boulangerie' : 'Ouvrir la boulangerie' }}
            </button>
        </div>
        <div class="bakery">
            <img src="../assets/boulangerie.jpg" alt="Dessin d'une boulangerie" title="" />
            <table>
                <tbody>
                    <tr>
                        <td>Niveau</td>
                        <td>{{ state.bakeryLvl }} ⚡</td>
                        <td><button @click="emit('bakeryLvlUp')">+</button></td>
                        <td>{{ state.bakeryImprovementPrice.toFixed(2) }} 💰</td>
                    </tr>
                    <tr>
                        <td>Moulins</td>
                        <td>{{ state.millsLvl }} ⚙️</td>
                        <td><button @click="emit('millsLvlUp')">+</button></td>
                        <td>{{ state.millsImprovementPrice.toFixed(2) }} 💰</td>
                    </tr>
                    <tr>
                        <td>Or</td>
                        <td>{{ state.goldStock.toFixed(2) }} 💰</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Farine</td>
                        <td>{{ state.flourStock }} 🌾</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Baguettes</td>
                        <td>{{ state.baguettesStock }} 🥖</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script setup>
defineProps({
    state: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['bakeryLvlUp', 'millsLvlUp', 'openCloseBakery'])
</script>
