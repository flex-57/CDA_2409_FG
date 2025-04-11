<template>
    <table>
        <thead>
            <tr>
                <th>Pays</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Temps final</th>
                <th>Écart gagnant</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(result, i) in data" :key="i">
                <td>{{ result.pays }}</td>
                <td>{{ result.nom.split(' ')[0] }}</td>
                <td>{{ result.nom.split(' ')[1] }}</td>
                <td>
                    {{
                        `${formatTimeInMinutesSeconds(result.temps)[0]}min${formatTimeInMinutesSeconds(result.temps)[1]}s`
                    }}
                </td>
                <td>
                    {{
                        JSON.stringify(result) !== JSON.stringify(winner)
                            ? `+${result.temps - winner.temps}s`
                            : ';)'
                    }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { formatTimeInMinutesSeconds } from './utils/time'

defineProps({
    data: {
        type: Array,
        required: true,
    },
    winner: {
        type: Object,
        required: true,
    },
})
</script>
