import { onMounted, onUnmounted, reactive, watch } from 'vue'
import { Order } from '@/class/Order'

export const useOrderStore = () => {
    const state = reactive({
        orders: [],
        nextOrderId: 1,

    })

    const create = (bakeryLvl, addLogs) => {
        if (state.orders.length < 10) {
            const newOrder = new Order(bakeryLvl)
            newOrder.id = state.nextOrderId++
            newOrder.interval = setInterval(() => {
                if (newOrder.time > 0) {
                    newOrder.time--
                } else {
                    clearInterval(newOrder.interval)
                    state.orders = state.orders.filter((o) => o.id !== newOrder.id)
                    addLogs(`Commande #${newOrder.id} expirée`)
                }
            }, 1000)
            state.orders.push(newOrder)
        }
    }

    onMounted(() => {
        const savedOrders = localStorage.getItem('orders-state')
        if (savedOrders) {
            Object.assign(state, JSON.parse(savedOrders))

            state.orders.forEach((order) => {
                order.interval = setInterval(() => {
                    if (order.time > 0) {
                        order.time--
                    } else {
                        clearInterval(order.interval)
                        state.orders = state.orders.filter((o) => o.id !== order.id)
                    }
                }, 1000)

            })
        }
    })

    watch(
        () => state,
        (val) => {
            localStorage.setItem('orders-state', JSON.stringify(val))
        },
        { deep: true },
    )

    onUnmounted(() => {
        state.orders.forEach((order) => {
            clearInterval(order.interval)
        })
    })

    const cancelOrder = (index, addLogs) => {
        state.orders = state.orders.filter((o) => o.id !== index)
        addLogs(`Commande #${index} annulée`)
    }

    const validateOrder = (index, bakeryState, addLogs) => {
        const order = state.orders.find((o) => o.id === index)

        if (order.nbBaguettes <= bakeryState.baguettesStock) {
            bakeryState.baguettesStock -= order.nbBaguettes
            bakeryState.goldStock += order.totalPrice
            bakeryState.goldProd += order.totalPrice
            state.orders = state.orders.filter((o) => o.id !== index)

            addLogs(
                `Commande #${index} validée : ${order.nbBaguettes} baguettes 🥖 vendues pour ${Number(order.totalPrice).toFixed(2)} 💰`,
            )
        } else {
            addLogs(`Pas assez de baguettes 🥖 pour valider la commande`)
        }
    }

    return { state, create, cancelOrder, validateOrder }
}
