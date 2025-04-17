<template>
    <section id="home">
        <h1>Le jeu du serpent</h1>
        <div>
            <p>
                Dirigez le serpent avec les flèches du clavier pour lui faire manger les petits
                carrés et le faire grandir.
                <br />
                Si le serpent touche sa propre queue, c'est perdu.
            </p>
        </div>
        <button @click="router.replace('/game')" type="button">Commencer</button>
    </section>
</template>

<script setup>
import router from '@/router'
</script>
