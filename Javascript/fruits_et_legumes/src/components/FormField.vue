<template>
    <div class="form-grp">
        <label :for="id">{{ label }}</label>

        <template v-if="type === 'radio'">
            <div v-for="option in options" :key="option.value" class="radio-group">
                <input
                    :id="`${id}-${option.value}`"
                    :name="name"
                    :type="type"
                    :value="option.value"
                    v-model="modelValue"
                />
                <label :for="`${id}-${option.value}`">{{ option.label }}</label>
            </div>
        </template>

        <input
            v-else
            :id="id"
            :type="type"
            v-model="modelValue"
            :step="type === 'number' ? step : undefined"
            :min="type === 'number' ? min : undefined"
        />
    </div>
</template>

<script setup>
defineProps({
    label: String,
    id: String,
    name: String,
    type: String,
    step: Number,
    min: Number,
    options: Array, // Pour les radios : [{ value: 1, label: 'Oui' }, { value: 0, label: 'Non' }]
})

const modelValue = defineModel()
</script>
