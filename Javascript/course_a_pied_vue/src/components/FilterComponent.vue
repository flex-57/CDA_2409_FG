<template>
    <div id="selectCountries">
        <div v-for="(country, i) in countries" :key="i">
            <label :for="country">
                <input
                    type="checkbox"
                    :name="country"
                    :id="country"
                    :value="country"
                    :checked="selectedCountries.includes(country)"
                    @change="selectCountry(country)"
                />
                {{ country }}
            </label>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    selected: {
        type: Array,
        required: true,
    },
})

const emit = defineEmits(['update:selected'])

const selectedCountries = ref([])

const countries = computed(() => [...new Set(props.data.map((result) => result.pays))].sort((a,b) => a.localeCompare(b)))

const selectCountry = (country) => {
    if (selectedCountries.value.includes(country)) {
        selectedCountries.value = selectedCountries.value.filter((c) => c !== country)
    } else {
        selectedCountries.value.push(country)
    }

    emit('update:selected', selectedCountries.value)
}
</script>
