<template>
    <header>
        <h1>Distributeur</h1>
        <span v-if="isPaid"
            ><b>Remboursé : {{ caddie.refund.toFixed(2) }} €</b></span
        >
    </header>
    <nav>
        <h2>Boissons</h2>
        <h2>Votre sélection {{ !isSelected ? '?' : '' }}</h2>
    </nav>
    <main>
        <section id="drinks-box">
            <div v-for="(drink, i) in drinksList" :key="i" class="drink-card">
                <h3>{{ drink.name }}</h3>
                <p>Tarif: {{ drink.price }} €</p>
                <p>Stock: {{ drink.stock }}</p>
                <button
                    @click="drink.stock > 0 ? selection(drink) : null"
                    :disabled="drink.stock === 0"
                    :class="{ selected: drink.id === current.id }"
                >
                    {{
                        drink.stock > 0
                            ? `Sélectionn${drink.id === current.id ? 'é' : 'er'}`
                            : 'Rupture de stock'
                    }}
                </button>
            </div>
        </section>
        <section v-show="isSelected" id="payment-box">
            <article>
                <h3>{{ current.name }}</h3>
                <div id="payment">
                    <p>
                        <span>Tarif:</span><span>{{ current.price }} €</span>
                    </p>
                    <p>
                        <span>Payé:</span><span>{{ caddie.payed.toFixed(2) }} €</span>
                    </p>
                    <p>
                        <span>Restant dû:</span><span>{{ caddie.remaining.toFixed(2) }} €</span>
                    </p>
                    <p>
                        <span>Retour monnaie:</span><span>{{ caddie.refund.toFixed(2) }} €</span>
                    </p>
                    <button v-if="!isPaying">Attente de paiement...</button>
                    <button v-if="isPaying" @click="selection(current)">Annuler</button>
                    <button v-if="isPaying" @click="getDrink(current)">
                        Récupérer {{ current.name }}
                    </button>
                </div>
            </article>
            <article>
                <h2>Paiement</h2>
                <div id="coins-box">
                    <div v-for="(c, i) in coins" :key="i" class="coin" @click="paying(c.value)">
                        Pièce de <br />
                        {{ c.label }}
                    </div>
                </div>
            </article>
        </section>
    </main>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'
import { drinksList } from './assets/drinksList'
import { coins } from './assets/coinsList'

const current = ref({})
const isSelected = ref(false)
const isPaying = ref(false)
const isPaid = ref(false)
const isRefunded = ref(false)

const coinSound = new Audio('./src/assets/coinSound.mp3')

const caddie = ref({
    payed: 0,
    remaining: 0,
    refund: 0,
})

let timeout

const resetCaddie = () =>
    (caddie.value = {
        payed: 0,
        remaining: 0,
        refund: 0,
    })

const reset = () => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
        resetCaddie()
        current.value = {}
        isPaid.value = false
        isRefunded.value = false
        isSelected.value = false
        isPaying.value = false
    }, 1000)
}

const getDrink = () => {
    if (timeout) clearTimeout(timeout)
    current.value.stock--
    isSelected.value = false
    isPaid.value = true
    reset()
}

const paying = (val) => {
    if (caddie.value.remaining > 0) {
        coinSound.currentTime = 0
        coinSound.play()
        isPaying.value = true
        if (val < caddie.value.remaining) {
            caddie.value.payed += val
            caddie.value.remaining -= val
        } else {
            const surplus = val - caddie.value.remaining
            caddie.value.payed += caddie.value.remaining
            caddie.value.remaining = 0
            caddie.value.refund += surplus
        }
    }
}

const selection = (obj) => {
    if (timeout) clearTimeout(timeout)
    if (isSelected.value) {
        isPaid.value = true
        isRefunded.value = true
        caddie.value.refund += caddie.value.payed
        reset()
    } else {
        resetCaddie()
        current.value = obj
        caddie.value.remaining = obj.price
        isSelected.value = true
        isPaying.value = false
        isPaid.value = false
        isRefunded.value = false
    }
}

onUnmounted(() => {
    if (timeout) clearTimeout(timeout)
})
</script>
