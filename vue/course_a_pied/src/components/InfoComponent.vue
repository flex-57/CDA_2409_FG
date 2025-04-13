<template>
    <div id="info">
        <span>{{ data.length }} participants</span>
        <span>Gagnant : {{ winner.nom }}</span>
        <span
            >Temps moyen :
            {{
                `${formatTimeInMinutesSeconds(avg)[0]} minutes et ${formatTimeInMinutesSeconds(avg)[1]} secondes`
            }}</span
        >
    </div>
</template>

<script setup>
import { formatTimeInMinutesSeconds } from '@/utils/time'
import { computed } from 'vue'

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    winner: {
        type: Object,
        required: true,
    },
})

const avg = computed(() =>
    props.data.length
        ? Number(props.data.reduce((sum, e) => sum + e.temps, 0) / props.data.length)
        : 0,
)
</script>
