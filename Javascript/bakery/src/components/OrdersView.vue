<template>
    <section>
        <div class="title-box">
            <h2>Commande</h2>
        </div>
        <table id="table-order">
            <thead>
                <tr>
                    <th @click="() => emit('sort-orders', 'id')">
                        📲
                        <span v-if="state.sortState.col === 'id'">{{
                            state.sortState.direction ? '🔽' : '🔼'
                        }}</span>
                    </th>
                    <th @click="() => emit('sort-orders', 'nbBaguettes')">
                        🥖
                        <span v-if="state.sortState.col === 'nbBaguettes'">{{
                            state.sortState.direction ? '🔽' : '🔼'
                        }}</span>
                    </th>
                    <th @click="() => emit('sort-orders', 'baguetteUnitPrice')">
                        💰/🥖
                        <span v-if="state.sortState.col === 'baguetteUnitPrice'">{{
                            state.sortState.direction ? '🔽' : '🔼'
                        }}</span>
                    </th>
                    <th @click="() => emit('sort-orders', 'totalPrice')">
                        💰💰💰
                        <span v-if="state.sortState.col === 'totalPrice'">{{
                            state.sortState.direction ? '🔽' : '🔼'
                        }}</span>
                    </th>
                    <th @click="() => emit('sort-orders', 'time')">
                        ⌚
                        <span v-if="state.sortState.col === 'time'">{{
                            state.sortState.direction ? '🔽' : '🔼'
                        }}</span>
                    </th>
                    <th>🗣</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in state.orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.nbBaguettes }}</td>
                    <td>{{ order.baguetteUnitPrice }}</td>
                    <td>{{ order.totalPrice.toFixed(2) }}</td>
                    <td>{{ order.time }}</td>
                    <td>
                        <button @click="() => emit('validate-order', order.id)">✅</button>
                        <button @click="() => emit('cancel-order', order.id)">❌</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script setup>
defineProps({
    state: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['validate-order', 'cancel-order', 'sort-orders'])
</script>
