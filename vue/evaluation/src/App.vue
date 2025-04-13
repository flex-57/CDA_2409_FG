<template>
    <h1>Résultat de l'évaluation</h1>
    <section>
        <h3>Ajouter une note</h3>
        <form @submit.prevent="saveStudent">
            <div>
                <label for="input-fullname">Nom Prénom</label>
                <input type="text" id="input-fullname" v-model="fullname" />
            </div>
            <div>
                <label for="input-grade">Note</label>
                <input type="number" id="input-grade" min="0" max="20" v-model="grade" />
            </div>
            <div>
                <label></label>
                <input type="submit" value="Ajouter" :disabled="!isFormOk" />
            </div>
        </form>
    </section>
    <table>
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Note</th>
                <th>Obtenu</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(e, i) in evalDataSorted()" :key="i">
                <td>
                    {{
                        e.fullname.split(' ')[0].charAt(0).toUpperCase() +
                        e.fullname.split(' ')[0].slice(1).toLowerCase()
                    }}
                </td>
                <td>
                    {{
                        e.fullname.split(' ')[1].charAt(0).toUpperCase() +
                        e.fullname.split(' ')[1].slice(1).toLowerCase()
                    }}
                </td>
                <td>{{ e.grade }}</td>
                <td>{{ e.grade > 12 ? 'Oui' : 'Non' }}</td>
            </tr>
        </tbody>
    </table>
    <ul>
        <li>Nombre d'étudiants : {{ evalData.length }}</li>
        <li>Moyenne de la classe : {{ avg }}</li>
        <li>Nombre d'étudiants au dessus de la moyenne : {{ studentsAboveAvg }}</li>
        <li>Note éliminatoire : {{ failingGrade }}</li>
    </ul>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'

const failingGrade = 12

const evalData = ref([])
const fullname = ref('')
const grade = ref('')
const isFormOk = ref(false)

const avg = computed(() =>
    evalData.value.length > 0
        ? Number(
              (evalData.value.reduce((sum, e) => sum + e.grade, 0) / evalData.value.length).toFixed(
                  2,
              ),
          )
        : 0,
)
const studentsAboveAvg = computed(() => evalData.value.filter((e) => e.grade > avg.value).length)

const evalDataSorted = () => evalData.value.sort((a, b) => b.grade - a.grade)

const saveStudent = () => {
    if (isFormOk.value) {
        evalData.value.push({ fullname: fullname.value, grade: grade.value })
        fullname.value = ''
        grade.value = ''
    }
}

watchEffect(() => {
    isFormOk.value =
        fullname.value.length > 4 &&
        fullname.value.split(' ').length >= 2 &&
        grade.value !== '' &&
        grade.value >= 0 &&
        grade.value <= 20
})

onMounted(async () => {
    const res = await fetch('./src/assets/eval.json')
    evalData.value = await res.json()
})
</script>
