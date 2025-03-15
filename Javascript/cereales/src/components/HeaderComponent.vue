<template>
    <header>
        <h1>Cereals</h1>
        <fieldset>
            <legend>Rechercher</legend>
            <input
                type="search"
                id="input-search"
                placeholder="Nom de la céréale"
                modelValue="search"
                @input="emit('update:search', search)"
            />
        </fieldset>
        <fieldset>
            <legend>Filtrer</legend>
            <div id="filter">
                <fieldset>
                    <legend>Nutriscore</legend>
                    <label v-for="nutriscore in nutriscores" :for="nutriscore" :key="nutriscore">
                        {{ nutriscore }}
                        <input
                            type="checkbox"
                            name=""
                            :id="'nutriscore-' + nutriscore"
                            :value="nutriscore"
                            @input="emit('update:selectedNs', selectedNs)"
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Catégorie</legend>
                    <select
                        name=""
                        id="select-categorie"
                        @input="emit('update:selectedCat', selectedCat)"
                    >
                        <option v-for="cat in categories" :value="cat" :key="cat">{{ cat }}</option>
                    </select>
                </fieldset>
            </div>
        </fieldset>
    </header>
    <div>
        <div>recherche: {{ search }}</div>
        <div>ns: {{ selectedNs }}</div>
        <div>cat: {{ selectedCat }}</div>
    </div>
</template>

<script setup>
const nutriscores = ['A', 'B', 'C', 'D', 'E']
const categories = ['Tous', 'Sans sucre', 'Pauvre en sel', 'Boost']

defineProps(['search', 'selectedNs', 'selectedCat'])
const emit = defineEmits(['update:search', 'update:selectedNs', 'update:selectedCat'])
</script>
