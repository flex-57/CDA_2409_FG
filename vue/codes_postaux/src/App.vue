<template>
    <h1>Rechercher une ville par son code postal</h1>

    <form>
        <div id="form-grp">
            <label for="search">Code postal</label>
            <input type="search" id="search" list="codes-list" v-model="code" />
            <datalist id="codes-list">
                <option
                    v-for="(c, i) in codes.filter((commune) => commune.codePostal.startsWith(code))"
                    :key="i"
                    :value="`${c.codePostal} - ${c.codeCommune}`"
                >
                    {{ c.nomCommune }}
                </option>
            </datalist>
        </div>
    </form>

    <section v-if="result.nomCommune">
        <h3>{{ result.nomCommune }}</h3>
        <div>
            <label>Code postal:</label>
            <b>{{ result.codePostal }}</b>
        </div>
        <div>
            <label>Code commune:</label>
            <b>{{ result.codeCommune }}</b>
        </div>
        <div>
            <label>Libelle acheminement:</label>
            <b>{{ result.libelleAcheminement }}</b>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

const codes = ref([])
const code = ref('')
const result = ref({})

watch(code, (newVal) => {
    const found = codes.value.find(
        (commune) => `${commune.codePostal} - ${commune.codeCommune}` === newVal
    )
    if (found) {
        result.value = found
    }
})

onMounted(async () => {
    const res = await fetch('https://arfp.github.io/tp/web/javascript/02-zipcodes/zipcodes.json')
    codes.value = await res.json()
})
</script>
