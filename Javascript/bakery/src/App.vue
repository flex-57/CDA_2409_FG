<template>
    <HeaderView :state="stateBakery" />
    <BakeryView
        :state="stateBakery"
        @bakeryLvlUp="bakeryLvlUp"
        @millsLvlUp="millsLvlUp"
        @openCloseBakery="openCloseBakery"
    />
    <OrdersView
        :state="stateOrders"
        @validateOrder="validateOrder"
        @cancelOrder="cancelOrder"
        @sortOrders="sortOrders"
    />
    <LogsView :state="stateLogs.logs" />
</template>

<script setup>
import HeaderView from './components/HeaderView.vue'
import BakeryView from './components/BakeryView.vue'
import OrdersView from './components/OrdersView.vue'
import LogsView from './components/LogsView.vue'
/*
 */

import { useLogsStore } from './stores/logsStore'
import { useBakeryStore } from './stores/bakeryStore'
import { useOrdersStore } from './stores/ordersStore'
import { onMounted, onUnmounted } from 'vue'

const { stateLogs, addLogs } = useLogsStore()
const { stateBakery, bakeryLvlUp, millsLvlUp, openCloseBakery, startProduction } =
    useBakeryStore(addLogs)
const { stateOrders, validateOrder, cancelOrder, sortOrders } = useOrdersStore(stateBakery, addLogs)

let maintenanceInterval
onMounted(() => {
    maintenanceInterval = setInterval(() => {
        startProduction()
    }, 1000)
})

onUnmounted(() => {
    clearInterval(maintenanceInterval)
})
</script>
