<template>
    <header>
        <h1>Céréals</h1>
        <fieldset>
            <legend>Rechercher</legend>
            <input type="search" id="input-search" placeholder="Nom de la céréale" />
        </fieldset>
        <fieldset>
            <legend>Filtrer</legend>
            <div id="filter">
                <fieldset>
                    <legend>Nutriscore</legend>
                    <label v-for="nutriscore in nutriscores" :for="nutriscore" :key="nutriscore">
                        {{ nutriscore }}
                        <input type="checkbox" name="" :id="nutriscore">
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Catégorie</legend>
                    <select name="" id="select-categorie">
                        <option v-for="cat in categories" :value="cat" :key="cat">{{ cat }}</option>
                    </select>
                </fieldset>
            </div>
        </fieldset>
    </header>
</template>

<script setup>
    const nutriscores = ['A', 'B', 'C', 'D', 'E']
    const categories = ['Tous', 'Sans sucre', 'Pauvre en sel', 'Boost']
</script>
