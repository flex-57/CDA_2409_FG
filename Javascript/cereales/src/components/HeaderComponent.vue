<template>
    <header>
        <h1>Cereals</h1>
        <div>
            <fieldset id="search-fieldset">
                <legend>Rechercher</legend>
                <div id="search-box">
                    <input
                        type="search"
                        id="input-search"
                        placeholder="Nom de la céréale"
                        :value="search"
                        @input="updateSearch"
                    />
                </div>
            </fieldset>
            <fieldset id="filter-fieldset">
                <legend>Filtrer</legend>
                <div id="filter-box">
                    <fieldset id="ns-fieldset">
                        <legend>Nutriscore</legend>
                        <label
                            v-for="nutriscore in nutriscores"
                            :for="'nutriscore-' + nutriscore"
                            :key="nutriscore"
                        >
                            {{ nutriscore }}
                            <input
                                type="checkbox"
                                :id="'nutriscore-' + nutriscore"
                                :value="nutriscore"
                                :checked="selectedNs.includes(nutriscore)"
                                @change="updateNutriscore(nutriscore)"
                            />
                        </label>
                    </fieldset>
                    <fieldset>
                        <legend>Catégorie</legend>
                        <select id="select-categorie" :value="selectedCat" @change="updateCategory">
                            <option v-for="cat in categories" :value="cat" :key="cat">
                                {{ cat }}
                            </option>
                        </select>
                    </fieldset>
                </div>
            </fieldset>
        </div>
    </header>
</template>

<script setup>
const props = defineProps({
    search: {
        type: String,
        default: '',
    },
    selectedNs: {
        type: Array,
        default: () => [],
    },
    selectedCat: {
        type: String,
        default: 'Tous',
    },
})

const emit = defineEmits(['update:search', 'update:selectedNs', 'update:selectedCat'])

const nutriscores = ['A', 'B', 'C', 'D', 'E']
const categories = ['Tous', 'Sans sucre', 'Pauvre en sel', 'Boost']

const updateSearch = (event) => {
    emit('update:search', event.target.value)
}

const updateNutriscore = (nutriscore) => {
    const index = props.selectedNs.indexOf(nutriscore)
    if (index === -1) {
        emit('update:selectedNs', [...props.selectedNs, nutriscore])
    } else {
        const updatedNs = [...props.selectedNs]
        updatedNs.splice(index, 1)
        emit('update:selectedNs', updatedNs)
    }
}

const updateCategory = (event) => {
    emit('update:selectedCat', event.target.value)
}
</script>

<style scoped>
header {
    display: flex;
    flex-wrap: wrap;
}

header div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
}

h1 {
    color: var(--title);
    font-size: 2.2rem;
    font-family: 'Comic Sans MS';
    margin: auto;
}

fieldset {
    background: var(--fieldset);
    border-radius: 0.3rem;
}

#search-box {
    display: flex;
    align-items: center;
    height: 100%;
}

#input-search {
    padding: 0.7rem 0.5rem;
    background: var(--fieldset);
    font-size: 1.3rem;
    color: white;
    border: none;
}

#input-search:focus {
    border: none;
}

#filter-box {
    display: flex;
    flex-wrap: wrap;
}

#ns-fieldset {
    display: flex;
    align-items: flex-end;
    gap: 0.6rem;
}

#ns-fieldset label {
    margin: 0;
}

#ns-fieldset input {
    margin: 0;
}
</style>
