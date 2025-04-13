<template>
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal">
            <h2>Confirmation</h2>
            <slot></slot>
            <div class="modal-actions">
                <button @click="confirm">Oui</button>
                <button @click="cancel">Annuler</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => {
    emit('confirm')
}

const cancel = () => {
    emit('cancel')
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000000dd;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: var(--fieldset);
    padding: 1.5rem;
    border-radius: 0.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 300px;
}

.modal-actions {
    display: flex;
    justify-content: space-around;
}

button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background-color: #0056b3;
}
</style>
