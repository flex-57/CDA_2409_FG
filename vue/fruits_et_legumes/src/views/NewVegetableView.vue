<template>
    <div id="title">
        <h1>Ajouter un légume</h1>
    </div>
    <form @submit.prevent="save">
        <div v-if="message" id="error-form">{{ message }}</div>

        <div class="form-grp">
            <label for="name">Nom</label>
            <input type="text" id="name" v-model.trim="vegetable.Name" />
        </div>

        <div class="form-grp">
            <label for="variety">Variété</label>
            <input type="text" id="variety" v-model.trim="vegetable.Variety" />
        </div>

        <div class="form-grp">
            <label for="primary-color">Couleur</label>
            <input type="text" id="primary-color" v-model.trim="vegetable.PrimaryColor" />
        </div>

        <div class="form-grp">
            <label for="lifetime">Durée de conservation (jours)</label>
            <input type="number" id="lifetime" v-model.number="vegetable.LifeTime" min="0" />
        </div>

        <div class="form-grp">
            <label id="label-box-radio">Frais</label>
            <div id="box-radio">
                <input type="radio" id="fresh" :value="1" v-model="vegetable.Fresh" />
                <label for="fresh" class="label-radio">Oui</label>

                <input type="radio" id="not-fresh" :value="0" v-model="vegetable.Fresh" />
                <label for="not-fresh" class="label-radio">Non</label>
            </div>
        </div>

        <div class="form-grp">
            <label for="price">Prix ($)</label>
            <input type="number" id="price" v-model.number="vegetable.Price" step=".01" min="0" />
        </div>

        <div class="form-grp">
            <label></label>
            <input type="submit" id="btn-submit" value="Ajouter" :disabled="!isFormOk" />
        </div>
    </form>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { fetchVegetables } from '@/utils/fetchVegetables'
import router from '@/router'

const vegetables = ref([])
const vegetable = ref({
    Id: 0,
    Name: '',
    Variety: '',
    PrimaryColor: '',
    LifeTime: 0,
    Fresh: null,
    Price: 0,
})

const isFormOk = ref(false)

const message = ref('')

const getVegetables = async () => {
    try {
        const data = await fetchVegetables()
        const storage = localStorage.getItem('vegetables')
            ? JSON.parse(localStorage.getItem('vegetables'))
            : []
        vegetables.value = storage.length ? storage : data
    } catch (e) {
        console.error('Erreur lors du chargement des légumes :', e)
    }
}

const save = () => {
    if (!isFormOk.value) {
        message.value = 'Veuillez remplir tous les champs !'
    } else {
        vegetable.value.Id = Math.max(...vegetables.value.map((v) => v.Id)) + 1
        vegetables.value.push({ ...vegetable.value })
        localStorage.setItem(
            'vegetables',
            JSON.stringify(vegetables.value.sort((a, b) => a.Name.localeCompare(b.Name))),
        )
        router.push('/legumes')
    }
}

watchEffect(
    () =>
        (isFormOk.value =
            vegetable.value.Name &&
            vegetable.value.Variety &&
            vegetable.value.PrimaryColor &&
            vegetable.value.LifeTime > 0 &&
            vegetable.value.Fresh !== null &&
            vegetable.value.Price > 0),
)

onMounted(getVegetables)
</script>
