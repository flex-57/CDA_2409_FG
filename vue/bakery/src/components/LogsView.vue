<template>
    <section>
        <div class="title-box">
            <h2>Log</h2>
        </div>
        <div class="log">
            <p v-for="(log, i) in state" :key="i">
                {{ log }}
            </p>
        </div>
    </section>
</template>

<script setup>
defineProps({
    state: {
        type: Array,
        required: true,
    },
})
</script>
