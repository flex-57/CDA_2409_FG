<template>
    <header>
        <h2>Population française</h2>

        <nav>
            <span>Sélectionnez une période : </span>
            <button @click="periode = '1950-2000'">1950 - 2000</button>
            <button @click="periode = '2012-2022'">2012 - 2022</button>
        </nav>
    </header>
    <main>
        <h1>{{ periode }}</h1>

        <section v-if="periode === '1950-2000'">
            <ChartPopulation :data="data1950" />
            <ChartNaissances :data="data1950" />
        </section>

        <section v-else>
            <ChartPopulation :data="data2012" />
            <ChartNaissances
                :data="data2012"
                :previousPopulation="data.filter((entry) => entry.annee < 2012).at(-1).population"
                :showStats="true"
            />
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ChartPopulation from './components/ChartPopulation.vue'
import ChartNaissances from '@/components/ChartNaissances.vue'

const periode = ref('1950-2000')
const data = ref([])
const data1950 = ref([])
const data2012 = ref([])

onMounted(async () => {
    const res = await fetch(
        'https://arfp.github.io/tp/web/javascript2/40-population/fr_population.json',
    )
    data.value = await res.json()

    data1950.value = data.value.filter((entry) => entry.annee <= 2000)
    data2012.value = data.value.filter((entry) => entry.annee >= 2012)
})
</script>
