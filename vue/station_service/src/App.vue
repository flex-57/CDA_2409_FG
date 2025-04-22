<template>
    <main>
        <section id="appli">
            <h1>Station service</h1>
            <article id="fuels">
                <h2>Carburants</h2>
                <div id="fuels-box">
                    <div v-for="(f, i) in fuels" :key="i" class="fuel-card">
                        <h5>{{ f.name }}</h5>
                        <span>{{ f.content.toFixed(1) }} litres</span>
                        <input type="number" id="" min="0" step="0.001" v-model="f.price" />
                    </div>
                </div>
            </article>
            <article id="pumps">
                <PumpComponent :fuels="fuels" :id="1" @bill="addbill" />
                <PumpComponent :fuels="fuels" :id="2" @bill="addbill" />
            </article>
            <article v-if="billsList.length" id="bills">
                <hr />
                <h2>Factures</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Date/Heure</th>
                            <th>Carburant</th>
                            <th>Prix/litre</th>
                            <th>Quantité</th>
                            <th>Prix payé</th>
                            <th>Pompe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(bill, i) in billsList" :key="i">
                            <td>{{ formatDate(bill.date) }}</td>
                            <td>{{ bill.fuel.name }}</td>
                            <td>{{ bill.fuel.price }}</td>
                            <td>{{ bill.quantity }}</td>
                            <td>{{ bill.topay }}</td>
                            <td>{{ bill.pump }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3">Totaux:</td>
                            <td>{{ totalQuantity }} litres</td>
                            <td>{{ totalPaid }} €</td>
                        </tr>
                    </tfoot>
                </table>
            </article>
        </section>
        <section>
            <img src="./assets/old_gas_station.png" alt="" />
        </section>
    </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { fuels } from './js/fuels'
import { formatDate } from './js/dateFormat'
import PumpComponent from './components/PumpComponent.vue'

const billsList = ref([])

const totalPaid = computed(
    () =>
        billsList.value.reduce((a, b) => a + Number(b.topay), 0).toFixed(3) || Number(0).toFixed(1),
)
const totalQuantity = computed(() =>
    billsList.value.reduce((a, b) => a + Number(b.quantity), 0).toFixed(1),
)

const addbill = (bill) => {
    const fuel = fuels.find((f) => f.name === bill.fuel.name)
    if (fuel) {
        fuel.content -= bill.quantity
    }
    billsList.value.push(bill)
}
</script>
