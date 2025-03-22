<template>
    <div class="form-grp">
        <label :for="id">{{ label }}</label>
        <input :type="type" :id="id" :value="name" v-model="inputValue"  />
    </div>
</template>

<script setup>
import { ref } from 'vue';


const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    }
    
})

const inputValue = ref(props.name)
</script>
