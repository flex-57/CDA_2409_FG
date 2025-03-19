<template>
    <header></header>
    <nav>
        <div class="container">
            <ul>
                <li><RouterLink to="/ventes">ventes</RouterLink></li>
                <li><RouterLink to="/ajouter_une_vente">nouvelle vente</RouterLink></li>
            </ul>
            <ul>
                <li><RouterLink to="/legumes">légumes</RouterLink></li>
                <li><RouterLink to="/ajouter_un_legume">nouveau légume</RouterLink></li>
            </ul>
        </div>
    </nav>
    <main>
        <RouterView />
    </main>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
