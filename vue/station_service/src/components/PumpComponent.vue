<template>
    <div id="gas-pump1">
        <h2>Pompe n°{{ id }}</h2>
        <select id="" :disabled="isStarted" v-model="selectedFuel">
            <option v-for="(f, i) in fuels" :key="i" :value="f">{{ f.name }}</option>
        </select>
        <form>
            <div class="form-inline">
                <div class="form-grp limit">
                    <label :for="`limit${id}`">Limite</label>
                    <input
                        type="number"
                        min="0"
                        step=".1"
                        :id="`limit${id}`"
                        :disabled="!selectedFuel || isStarted"
                        v-model="limit"
                    />
                </div>
                <div class="form-grp limit-radios">
                    <input
                        type="radio"
                        :id="`radio-liters${id}`"
                        :name="`unit${id}`"
                        :disabled="!selectedFuel || isStarted"
                        value="liters"
                        v-model="unit"
                    />
                    <label :for="`radio-liters${id}`">litres</label>
                    <input
                        type="radio"
                        :id="`radio-euros${id}`"
                        :name="`unit${id}`"
                        :disabled="!selectedFuel || isStarted"
                        value="euros"
                        v-model="unit"
                    />
                    <label :for="`radio-euros${id}`">€</label>
                </div>
            </div>
            <hr />
            <div class="form-grp">
                <label :for="`price${id}`">Prix du litre</label>
                <input type="number" :id="`price${id}`" disabled :value="selectedFuel.price" />
                <label>€</label>
            </div>
            <div class="form-grp">
                <label :for="`quantity${id}`">Quantité</label>
                <input
                    type="number"
                    :id="`quantity${id}`"
                    disabled
                    :value="progressQuantity"
                /><label>litres</label>
            </div>
            <div class="form-grp">
                <label :for="`topay${id}`">À payer</label>
                <input type="number" :id="`topay${id}`" disabled v-model="progressTopay" />
                <label>€</label>
            </div>
            <div class="form-grp">
                <div class="progress">
                    <div class="bar">
                        <div
                            class="progress-value"
                            :style="{
                                width: ((progressQuantity / quantity) * 100).toFixed(1) + '%',
                            }"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="form-grp">
                <button
                    @click="start"
                    type="button"
                    :disabled="!selectedFuel || limit === 0 || isStarted"
                >
                    Lancer la distribution
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const selectedFuel = ref('')
const unit = ref('liters')
const limit = ref(0)
const progressQuantity = ref(0)
const progressTopay = ref(0)
const isStarted = ref(false)

const props = defineProps({
    fuels: {
        type: Array,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
})

const emits = defineEmits(['bill'])

const quantity = computed(() =>
    unit.value === 'liters' ? limit.value : (limit.value / selectedFuel.value.price).toFixed(3),
)
const toPay = computed(() => (selectedFuel.value.price * limit.value).toFixed(3))

const speed = 50

let interval
const start = () => {
    if (selectedFuel.value && limit.value > 0) {
        isStarted.value = true
        progressQuantity.value = 0
        progressTopay.value = 0
        let step = 0.1
        let max = quantity.value

        clearInterval(interval)
        interval = setInterval(() => {
            if (progressQuantity.value < max) {
                progressQuantity.value = Number(
                    Math.min(progressQuantity.value + step, max).toFixed(3),
                )
                progressTopay.value = (progressQuantity.value * selectedFuel.value.price).toFixed(3)
            } else {
                clearInterval(interval)
                isStarted.value = false
                emits('bill', {
                    pump: props.id,
                    fuel: selectedFuel.value,
                    quantity: quantity.value,
                    topay: toPay.value,
                    date: new Date(),
                })
            }
        }, speed)
    }
}
</script>
