<template>
    <header>
        <h1>Le Boulanger</h1>
        <table>
            <thead>
                <tr>
                    <th>Or gagné</th>
                    <th>Or dépensé</th>
                    <th>Farine produite</th>
                    <th>Baguettes produites</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ bakeryState.goldProd.toFixed(2) }}</td>
                    <td>{{ bakeryState.goldSpent.toFixed(2) }}</td>
                    <td>{{ bakeryState.flourProd }}</td>
                    <td>{{ bakeryState.baguettesProd }}</td>
                </tr>
            </tbody>
        </table>
    </header>
    <section>
        <div class="title-box">
            <h2>Boulangerie</h2>
            <button @click="toggleOpenClose">Fermer la boulangerie</button>
        </div>
        <div class="bakery">
            <img src="./assets/boulangerie.jpg" alt="Dessin d'une boulangerie" title="" />
            <table>
                <tbody>
                    <tr>
                        <td>Niveau</td>
                        <td>{{ bakeryState.bakeryLvl }} ⚡</td>
                        <td><button @click="bakeryLvlUp(addLogs)">+</button></td>
                        <td>{{ bakeryState.bakeryImprovementPrice.toFixed(2) }} 💰</td>
                    </tr>
                    <tr>
                        <td>Moulins</td>
                        <td>{{ bakeryState.mills }} ⚙️</td>
                        <td><button @click="millsLvlUp(addLogs)">+</button></td>
                        <td>{{ bakeryState.millsImprovementPrice.toFixed(2) }} 💰</td>
                    </tr>
                    <tr>
                        <td>Or</td>
                        <td>{{ bakeryState.goldStock.toFixed(2) }} 💰</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Farine</td>
                        <td>{{ bakeryState.flourStock }} 🌾</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Baguettes</td>
                        <td>{{ bakeryState.baguettesStock }} 🥖</td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <section>
        <div class="title-box">
            <h2>Commandes</h2>
        </div>
        <table id="table-order">
            <thead>
                <tr>
                    <th @click="sortOrders('id')">📲</th>
                    <th @click="sortOrders('nbBaguettes')">🥖</th>
                    <th @click="sortOrders('baguetteUnitPrice')">💰/🥖</th>
                    <th @click="sortOrders('totalPrice')">💰💰💰</th>
                    <th @click="sortOrders('time')">⌚</th>
                    <th>🗣</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orderState.orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.nbBaguettes }}</td>
                    <td>{{ order.baguetteUnitPrice }}</td>
                    <td>{{ order.totalPrice.toFixed(2) }}</td>
                    <td>{{ order.time }}</td>
                    <td>
                        <button @click="validateOrder(order.id, bakeryState, addLogs)">✅</button>
                        <button @click="cancelOrder(order.id, addLogs)">❌</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
    <section>
        <div class="title-box">
            <h2>Log</h2>
        </div>
        <div class="log">
            <p v-for="(log, i) in logsState.logs" :key="i">
                {{ log }}
            </p>
        </div>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useBakeryStore } from './stores/bakeryStore'
import { useOrderStore } from './stores/orderStore'
import { useLogsStore } from './stores/logsStore'

const { state: bakeryState, bakeryLvlUp, millsLvlUp, start } = useBakeryStore()
const { state: orderState, create, cancelOrder, validateOrder } = useOrderStore()
const { state: logsState, addLogs } = useLogsStore()

const sortState = ref({
    id: false,
    nbBaguettes: false,
    baguetteUnitPrice: false,
    totalPrice: false,
    time: false,
})

const sortOrders = (col, isNum = true) => {
    sortState.value[col] = !sortState.value[col]
    orderState.orders.sort((a, b) =>
        sortState.value[col]
            ? isNum
                ? b[col] - a[col]
                : b[col].localeCompare(a[col])
            : isNum
              ? a[col] - b[col]
              : a[col].localeCompare(b[col]),
    )
}

watch(
    () => bakeryState,
    (val) => {
        localStorage.setItem('bakery-state', JSON.stringify(val))
    },
    { deep: true },
)

watch(
    () => logsState,
    (val) => {
        localStorage.setItem('logs-state', JSON.stringify(val))
    },
    { deep: true },
)



let maintenanceInterval
let orderInterval
onMounted(() => {
    const savedBakery = localStorage.getItem('bakery-state')
    const savedLogs = localStorage.getItem('logs-state')

    if (savedBakery) {
        Object.assign(bakeryState, JSON.parse(savedBakery))
    }
    if (savedLogs) {
        Object.assign(logsState, JSON.parse(savedLogs))
    }


    maintenanceInterval = setInterval(() => {
        start()
    }, 1000)
    orderInterval = setInterval(() => {
        create(bakeryState.bakeryLvl, addLogs)
    }, 100)
})

onUnmounted(() => {
    clearInterval(maintenanceInterval)
    clearInterval(orderInterval)
})
</script>
