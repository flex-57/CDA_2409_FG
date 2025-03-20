<template>
    <h1>Ajouter un légume</h1>
    <form @submit.prevent="saveVegetable">
        <div v-if="errorMessage">{{ errorMessage }}</div>
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
                v-model.number="vegetable.price"
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
import { onMounted, ref } from 'vue'
import { fetchVegetables } from '@/utils/fetchVegetables'
import router from '@/router'

const vegetablesLength = ref(0)
const vegetable = ref({
    Id: 0,
    Name: '',
    Variety: '',
    PrimaryColor: '',
    Lifetime: 0,
    Fresh: null,
    Price: 0,
})
const vegetables = ref([])
const errorMessage = ref('')

const getVegetables = async () => {
    try {
        const storedVegetables = JSON.parse(localStorage.getItem('vegetables'))
        vegetablesLength.value = (await fetchVegetables()).length + storedVegetables.length + 1

        errorMessage.value = vegetablesLength
    } catch (e) {
        console.error('Erreur lors du chargement des légumes :', e)
    }
}

const saveVegetable = () => {
    if (!vegetable.value.Name || !vegetable.value.Variety) {
        errorMessage.value = 'veuillez remplir ..........................'
    }
    else {
        vegetable.value.Id = vegetablesLength.value
        vegetables.value.push({ ...vegetable.value })
        localStorage.setItem('vegetables', JSON.stringify(vegetables.value));
        router.push('/legumes')
    }

}

onMounted(getVegetables)
</script>
