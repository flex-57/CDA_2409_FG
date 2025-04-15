<template>
    <h1>Calculator</h1>
    <h2>Pourcentages</h2>

    <section>
        <h2>Convertir un pourcentage en nombre</h2>
        <div class="container">
            <span class="formule false">(N2xN1/100)/N2</span
            ><span class="formule false">(100x10/100)/100</span
            ><span class="formule true">N2xN1/100</span
            ><span class="formule true">100x10/100</span>
            <form>
                <div class="percent-box">
                    <input type="text" class="input-percent" v-model="fields['1_1']" /><span
                        class="percent"
                        >％</span
                    >
                </div>
                <span>de</span>
                <input type="text" v-model="fields['1_2']" />
                <span>=</span>
                <input type="text" v-model="result1" />
            </form>
        </div>
    </section>

    <section>
        <h2>Convertir un nombre en pourcentage</h2>
        <div class="container">
            <span class="formule">(N1x100)/N2</span><span class="formule">(10x100)/100</span>
            <form>
                <input type="text" v-model="fields['2_1']" />
                <span>sur un total de</span>
                <input type="text" v-model="fields['2_2']" />
                <span>=</span>
                <div class="percent-box">
                    <input type="text" class="input-percent" v-model="result2" /><span
                        class="percent"
                        >％</span
                    >
                </div>
            </form>
        </div>
    </section>

    <section>
        <h2>Augmentation / Réduction</h2>
        <div class="container">
            <span class="formule false">N2+(N1/100xN2)</span><span class="formule false">10+(100/100x10)</span>
            <span class="formule true">N1+(N1*N2)/100</span><span class="formule true">100+(100*10)/100</span>
            <form>
                <input type="text" v-model="fields['3_1']" />
                <select v-model="fields['select']">
                    <option value="+">+</option>
                    <option value="-">-</option>
                </select>
                <div class="percent-box">
                    <input type="text" class="input-percent" v-model="fields['3_3']" /><span
                        class="percent"
                        >％</span
                    >
                </div>
                <span>=</span>
                <input type="text" v-model="result3" />
            </form>
        </div>
    </section>

    <section>
        <h2>Variation de pourcentage</h2>
        <div class="container">
            <span class="formule">((N2-N1)/N1)x100</span
            ><span class="formule">((100-10)/100)x100</span>
            <form>
                <input type="text" v-model="fields['4_1']" />
                <span>à</span>
                <input type="text" v-model="fields['4_2']" />
                <span>correspond à</span>
                <div class="percent-box">
                    <input type="text" class="input-percent" v-model="result4" /><span
                        class="percent"
                        >％</span
                    >
                </div>
            </form>
        </div>
    </section>
    <section>
        <p>
            😄😄😄
            <br>
            1 formule / 2 est fausse !!!
            <br>
            Conception bâclée, mais révision de math niveau <span class="false">CRM</span> <span class="true">CM1</span> !!!
            <br>
            😄😄😄
        </p>
    </section>
</template>

<script setup>
import { computed, reactive } from 'vue'

const fields = reactive({
    '1_1': '',
    '1_2': '',
    '2_1': '',
    '2_2': '',
    '3_1': '',
    '3_3': '',
    '4_1': '',
    '4_2': '',
    'select': '+',
})

const formatNumber = (val) => {
    const cleanNumber = Number(val)
    return isNaN(cleanNumber) ? 0 : cleanNumber
}

const result1 = computed(() => {
    const N1 = formatNumber(fields['1_1'])
    const N2 = formatNumber(fields['1_2'])
    return ((N2 * N1) / 100).toFixed(4)
})

const result2 = computed(() => {
    const N1 = formatNumber(fields['2_1'])
    const N2 = formatNumber(fields['2_2'])
    if (N2 === 0) return '0.0000'
    else return ((N1 * 100) / N2).toFixed(4)
})

const result3 = computed(() => {
    const N1 = formatNumber(fields['3_1'])
    const N2 = formatNumber(fields['3_3'])
    return fields['operator'] === '+'
        ? (N1 + (N1 * N2) / 100).toFixed(4)
        : (N1 - (N1 * N2) / 100).toFixed(4)
})

const result4 = computed(() => {
    const N1 = formatNumber(fields['4_1'])
    const N2 = formatNumber(fields['4_2'])
    if (N1 === 0) return '0.0000'
    else return (((N2 - N1) / N1) * 100).toFixed(4)
})
</script>
