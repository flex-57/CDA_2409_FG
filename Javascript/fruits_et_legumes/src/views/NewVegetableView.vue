<template>
    <h1>Ajouter un légume {{ vegetableId }}</h1>
    <form @submit.prevent="saveVegetable">
        <div v-if="message">{{ message }}</div>
        <FormField :name="vegetable.Name" :type="'text'" :id="'input-name'" :label="'Nom'" v-model="vegetable.Name" />
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
            <input type="number" id="input-lifetime" v-model.number="vegetable.LifeTime" />
        </div>

        <div class="form-grp">
            <label id="label-box-radio">Frais</label>
            <div id="box-radio">
                <input type="radio" id="input-fresh" :value="1" v-model="vegetable.Fresh" />
                <label for="input-fresh" class="label-radio">Oui</label>

                <input type="radio" id="input-not-fresh" :value="0" v-model="vegetable.Fresh" />
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
import FormField from '@/components/FormField.vue'

const vegetables = ref([])
const vegetable = ref({
    Id: 0,
    Name: '',
    Variety: '',
    PrimaryColor: '',
    LifeTime: 0,
    Fresh: 1,
    Price: 0,
})

const message = ref('')
const storage = ref(
    localStorage.getItem('vegetables') ? JSON.parse(localStorage.getItem('vegetables')) : [],
)

const getVegetables = async () => {
    try {
        vegetables.value = await fetchVegetables()
    } catch (e) {
        console.error('Erreur lors du chargement des légumes :', e)
    }
}

const vegetableId = computed(() => {
    return Math.max(...[...vegetables.value, ...storage.value].map((v) => v.Id)) + 1
})

const saveVegetable = () => {
    if (!vegetable.value.Name || !vegetable.value.Variety) {
        message.value = 'veuillez remplir ..........................'
    } else {
        vegetable.value.Id = vegetableId
        storage.value.push({ ...vegetable.value })
        localStorage.setItem('vegetables', JSON.stringify(storage.value))
        router.push('/legumes')
    }
}

onMounted(getVegetables)
</script>
