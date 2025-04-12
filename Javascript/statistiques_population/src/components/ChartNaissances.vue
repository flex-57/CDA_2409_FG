<template>
    <div>
        <h3>Naissances</h3>
        <canvas ref="chartRef"></canvas>
    </div>
    <div id="stats" v-if="showStats">
        <h3>Statistiques 2012 - 2022</h3>
        <p>
            Année avec le moins de naissances :
            <b>{{ birthStats[0].annee }}</b>
            avec <b>{{ birthStats[0].naissances }}</b> naissances enregistrées
        </p>
        <p>
            Année avec le plus de naissances :
            <b>{{ birthStats[1].annee }}</b>
            avec <b>{{ birthStats[1].naissances }}</b> naissances enregistrées
        </p>
        <p>
            Année avec la plus faible progression de population :
            <b>{{ populationStats[0].annee }}</b>
            avec <b>{{ populationStats[0].difference }}</b> habitants
        </p>
        <p>
            Année avec la plus forte progression de population :
            <b>{{ populationStats[1].annee }}</b>
            avec <b>{{ populationStats[1].difference }}</b> habitants
        </p>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { Chart } from 'chart.js/auto'

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    previousPopulation: {
        type: Number,
        default: null,
    },
    showStats: {
        type: Boolean,
        default: false,
    },
})

const chartRef = ref(null)

const birthStats = computed(() => {
    const naissances = [...props.data].sort((a, b) => a.naissances - b.naissances)

    return [naissances[0], naissances[naissances.length - 1]]
})

const populationStats = computed(() => {
    const differencePopulation = props.data.map((d, i) => {
        return {
            annee: d.annee,
            difference:
                d.population -
                (i === 0
                    ? (props.previousPopulation ?? d.population)
                    : props.data[i - 1].population),
        }
    })

    const differences = [...differencePopulation].sort((a, b) => a.difference - b.difference)

    return [differences[0], differences[differences.length - 1]]
})

let chartInstance = null

const renderChart = () => {
    if (chartInstance) {
        chartInstance.destroy()
    }

    const labels = props.data.map((d) => d.annee)
    const naissances = props.data.map((d) => d.naissances)
    const differencePopulation = props.data.map(
        (d, i) =>
            d.population -
            (i === 0 ? (props.previousPopulation ?? d.population) : props.data[i - 1].population),
    )

    chartInstance = new Chart(chartRef.value, {
        data: {
            labels: labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Naissances',
                    data: naissances,
                },
                {
                    type: 'line',
                    label: 'Différence de population',
                    data: differencePopulation,
                    tension: 0.1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (context) =>
                            `${context.dataset.label || ''}: ${context.raw} personnes`,
                    },
                },
            },
        },
    })
}

onMounted(() => {
    renderChart()
})

watch(
    () => props.data,
    () => {
        renderChart()
    },
)
</script>
