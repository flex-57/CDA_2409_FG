<template>
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal">
            <h2>Confirmation</h2>
            <p>Les données sont déjà enregistrées. Voulez-vous vraiment les écraser ?</p>
            <div class="modal-actions">
                <button @click="confirmSave">Oui, écraser</button>
                <button @click="cancelSave">Annuler</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['confirm', 'cancel'])

const confirmSave = () => {
    emit('confirm')
}

const cancelSave = () => {
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    width: 300px;
}

.modal-actions {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
}

button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
