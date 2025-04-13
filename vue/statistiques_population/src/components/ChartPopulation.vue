<template>
    <div>
        <h3>Population</h3>
        <canvas ref="chartRef"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Chart } from 'chart.js/auto'

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
})

const chartRef = ref(null)
let chartInstance = null

const renderChart = () => {
    if (chartInstance) {
        chartInstance.destroy()
    }

    const labels = props.data.map((d) => d.annee)
    const population = props.data.map((d) => d.population)

    chartInstance = new Chart(chartRef.value, {
        data: {
            labels: labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Population',
                    data: population,
                    borderWidth: 1,
                    borderRadius: 3,
                    hoverBorderWidth: 2,
                },
                {
                    type: 'line',
                    label: 'Population',
                    data: population,
                    tension: 0.1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
