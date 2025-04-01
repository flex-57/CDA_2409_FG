<template>
    <fieldset :style="{ border: `1px solid ${player.color}` }">
        <h2
            :style="{
                color: player.color,
                borderBottom: `1px solid ${player.color}`,
            }"
        >
            {{ title }}
        </h2>
        <div>
            <label :for="`${prefix}-name`" :style="{ color: player.color }">Nom</label>
            <input type="text" :id="`${prefix}-name`" v-model.trim="player.name" />
        </div>
        <div>
            <label :for="`${prefix}-color`" :style="{ color: player.color }">Couleur</label>
            <select :id="`${prefix}-color`" v-model.trim="player.color">
                <option v-for="(color, k) in colors" :key="k" :value="k">
                    {{ color.charAt(0).toUpperCase() + color.slice(1).toLowerCase() }}
                </option>
            </select>
        </div>
    </fieldset>
</template>

<script setup>
defineProps({
    player: {
        type: Object,
        required: true,
    },
    colors: {
        type: Object,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
    },
})
</script>
