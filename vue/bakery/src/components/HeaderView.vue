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
                    <td>{{ state.goldCollected.toFixed(2) }}</td>
                    <td>{{ state.goldSpent.toFixed(2) }}</td>
                    <td>{{ state.flourCollected }}</td>
                    <td>{{ state.baguettesCollected }}</td>
                </tr>
            </tbody>
        </table>
    </header>
</template>

<script setup>
defineProps({
    state: {
        type: Object,
        required: true,
    },
})
</script>
