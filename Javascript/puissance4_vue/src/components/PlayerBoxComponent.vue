<template>
    <div
        :id="`${prefix}-box`"
        class="player-box"
        :style="{
            color: player.color,
            boxShadow:
                gameOver && !winner
                    ? '0 6px 12px #313158'
                    : currentPlayer.color === player.color
                      ? `0 6px 12px ${player.color}`
                      : '0 6px 12px #313158',
            scale: winner && winner.color === player.color ? '1.2' : winner ? '.8' : '1',
        }"
    >
        <h2 :style="{ borderBottom: `2px solid ${player.color}` }">
            Joueur {{ player.name.charAt(0).toUpperCase() }}{{ player.name.slice(1).toLowerCase() }}
        </h2>
        <div>
            <h3>Score</h3>
            <p class="score">{{ player.score }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    id: {
        type: String,
        required: true,
    },
    player: {
        type: Object,
        required: true,
    },
    currentPlayer: {
        type: Object,
        required: true,
    },
    winner: {
        type: Object,
        required: true,
    },
    gameOver: {
        type: Boolean,
        required: true,
    },
})
</script>
