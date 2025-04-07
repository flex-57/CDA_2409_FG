<template>
    <section>
        <div class="title-box">
            <h2>Commande</h2>
        </div>
        <table id="table-order">
            <thead>
                <tr>
                    <th @click="() => emit('sortOrders', 'id')">
                        📲
                        <span v-if="sortState.col === 'id'">{{
                            sortState.direction ? '🔽' : '🔼'
                        }}</span>
                    </th>
                    <th @click="() => emit('sortOrders', 'nbBaguettes')">
                        🥖
                        <span v-if="sortState.col === 'nbBaguettes'">{{
                            sortState.direction ? '🔽' : '🔼'
                        }}</span>
                    </th>
                    <th @click="() => emit('sortOrders', 'baguetteUnitPrice')">
                        💰/🥖
                        <span v-if="sortState.col === 'baguetteUnitPrice'">{{
                            sortState.direction ? '🔽' : '🔼'
                        }}</span>
                    </th>
                    <th @click="() => emit('sortOrders', 'totalPrice')">
                        💰💰💰
                        <span v-if="sortState.col === 'totalPrice'">{{
                            sortState.direction ? '🔽' : '🔼'
                        }}</span>
                    </th>
                    <th @click="() => emit('sortOrders', 'time')">
                        ⌚
                        <span v-if="sortState.col === 'time'">{{
                            sortState.direction ? '🔽' : '🔼'
                        }}</span>
                    </th>
                    <th>🗣</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.nbBaguettes }}</td>
                    <td>{{ order.baguetteUnitPrice }}</td>
                    <td>{{ order.totalPrice.toFixed(2) }}</td>
                    <td>{{ order.time }}</td>
                    <td>
                        <button @click="() => emit('validateOrder', order.id)">✅</button>
                        <button @click="() => emit('cancelOrder', order.id)">❌</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
defineProps({
    orders: {
        type: Array,
        required: true,
    },
    sortState: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['validateOrder', 'cancelOrder', 'sortOrders'])
</script>
