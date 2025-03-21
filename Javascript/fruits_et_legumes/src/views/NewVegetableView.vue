<template>
    <h1>Ajouter un légume {{ vegetablesLength }}</h1>
    <form @submit.prevent="saveVegetable">
        <div v-if="message">{{ message }}</div>
        <div class="form-grp">
            <label for="input-name">Nom</label>
            <input type="text" id="input-name" v-model="vegetable.Name" />
        </div>

        <div class="form-grp">
            <label for="input-variety">Variété</label>
            <input type="text" id="input-variety" v-model="vegetable.Variety" />
        </div>

        <div class="form-grp">
            <label for="input-primary-color">Couleur</label>
            <input type="text" id="input-primary-color" v-model="vegetable.PrimaryColor" />
        </div>

        <div class="form-grp">
            <label for="input-lifetime">Durée de conservation (jours)</label>
            <input type="number" id="input-lifetime" v-model.number="vegetable.Lifetime" />
        </div>

        <div class="form-grp">
            <label id="label-box-radio">Frais</label>
            <div id="box-radio">
                <input type="radio" id="input-fresh" :value="true" v-model="vegetable.Fresh" />
                <label for="input-fresh" class="label-radio">Oui</label>

                <input type="radio" id="input-not-fresh" :value="false" v-model="vegetable.Fresh" />
                <label for="input-not-fresh" class="label-radio">Non</label>
            </div>
        </div>

        <div class="form-grp">
            <label for="input-price">Prix (€)</label>
            <input
                type="number"
                id="input-price"
                v-model.number="vegetable.Price"
                step=".01"
                min="0"
            />
        </div>

        <div class="form-grp">
            <label></label>
            <input type="submit" id="btn-submit" value="Ajouter" />
        </div>
    </form>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { fetchVegetables } from '@/utils/fetchVegetables'
import router from '@/router'

const vegetables = ref([])
const vegetable = ref({
    Name: '',
    Variety: '',
    PrimaryColor: '',
    Lifetime: 0,
    Fresh: true,
    Price: 0,
})

const message = ref('')

const vegetablesLength = computed(() => {
    return Math.max(...vegetables.value.map(v => v.Id)) + 1
})

const getVegetables = async () => {
    try {
        vegetables.value = await fetchVegetables()

    } catch (e) {
        console.error('Erreur lors du chargement des légumes :', e)
    }
}

const saveVegetable = () => {
    if (!vegetable.value.Name || !vegetable.value.Variety) {
        message.value = 'veuillez remplir ..........................'
    }
    else {
        vegetable.value.Id = vegetablesLength
        vegetables.value.push({ ...vegetable.value })
        localStorage.setItem('vegetables', JSON.stringify(vegetables.value));
        router.push('/legumes')
    }

}

onMounted(getVegetables)
</script>
