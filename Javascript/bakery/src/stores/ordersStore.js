import { onMounted, onUnmounted, reactive, watch } from 'vue'
import { Order } from '@/class/Order'

export const useOrdersStore = (bakery, addLogs) => {
    const stateOrders = reactive({
        orders: [],
        nextIndex: 1,
        sortState: {
            col: null,
            direction: true,
        },
    })

    const addOrder = () => {
        if (stateOrders.orders.length < 10) {
            const newOrder = new Order(bakery.bakeryLvl)
            newOrder.id = stateOrders.nextIndex++
            addCountDown(newOrder)
            stateOrders.orders.push(newOrder)
            sortOrders(stateOrders.sortState.col, false)
        }
    }

    const addCountDown = (order) => {
        order.interval = setInterval(() => {
            if (bakery.isOpen) {
                if (order.time > 0) {
                    order.time--
                } else {
                    clearInterval(order.interval)
                    stateOrders.orders = stateOrders.orders.filter((o) => o.id !== order.id)
                    addLogs(`Commande #${order.id} expirée`)
                }
            }
        }, 1000)
    }

    const cancelOrder = (index) => {
        const order = stateOrders.orders.find((o) => o.id === index)
        if (order) {
            clearInterval(order.interval)
            stateOrders.orders = stateOrders.orders.filter((o) => o.id !== index)
            addLogs(`Commande #${index} annulée`)
        }
    }

    const validateOrder = (index) => {
        const order = stateOrders.orders.find((o) => o.id === index)

        if (order.nbBaguettes <= bakery.baguettesStock) {
            bakery.baguettesStock -= order.nbBaguettes
            bakery.goldStock += order.totalPrice
            bakery.goldCollected += order.totalPrice
            stateOrders.orders = stateOrders.orders.filter((o) => o.id !== index)

            addLogs(
                `Commande #${index} validée : ${order.nbBaguettes} baguettes 🥖 vendues pour ${Number(order.totalPrice).toFixed(2)} 💰`,
            )
        } else {
            addLogs(`Pas assez de baguettes 🥖 pour valider la commande`)
        }
    }

    const sortOrders = (col, changeDir = true) => {
        if (stateOrders.sortState.col === col) {
            if (changeDir) stateOrders.sortState.direction = !stateOrders.sortState.direction
        } else {
            stateOrders.sortState.col = col
            stateOrders.sortState.direction = true
        }
        stateOrders.orders.sort((a, b) =>
            stateOrders.sortState.direction ? b[col] - a[col] : a[col] - b[col],
        )
    }

    watch(
        () => stateOrders,
        (val) => {
            localStorage.setItem('orders', JSON.stringify(val))
        },
        { deep: true },
    )

    let addOrderInterval
    onMounted(() => {
        const saveOrders = JSON.parse(localStorage.getItem('orders'))
        if (saveOrders) {
            Object.assign(stateOrders, saveOrders)
            stateOrders.orders.forEach((order) => {
                addCountDown(order)
            })
        }

        addOrderInterval = setInterval(() => {
            addOrder()
        }, 100)
    })

    onUnmounted(() => {
        clearInterval(addOrderInterval)
        stateOrders.orders.forEach((order) => {
            clearInterval(order.interval)
        })
    })

    return { stateOrders, validateOrder, cancelOrder, sortOrders }
}
