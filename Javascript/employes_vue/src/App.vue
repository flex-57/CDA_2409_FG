<template>
    <h1>Employees</h1>
    <h2>This is the current list of employees</h2>

    <table v-if="employeesData.length">
        <thead>
            <tr>
                <th>EID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th @click="sortSalary">Monthly salary <span v-if="sortState !== null">{{ sortState ? '▼' : '▲' }}</span></th>
                <th>Year of birth</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(employee, i) in employeesData" :key="employee.id">
                <td>{{ employee.id }}</td>
                <td>{{ employee.employee_name }}</td>
                <td>{{ employee.employee_email }}</td>
                <td>{{ (employee.employee_salary / 12).toFixed(2) }} €</td>
                <td>{{ new Date().getFullYear() - employee.employee_age }}</td>
                <td>
                    <button @click="duplicateEmp(employee, i)" id="duplicate">Duplicate</button>
                    <button @click="deleteEmp(i)" id="delete">Delete</button>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <b>{{ employeesData.length }}</b>
                </td>
                <td colspan="2"></td>
                <td>
                    <b>{{ salarySum }}</b>
                </td>
                <td colspan="2"></td>
            </tr>
        </tfoot>
    </table>
    <div v-else id="message">
        <p>There is no employee in this list !</p>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const employeesData = ref([])
const sortState = ref(null)

const salarySum = computed(
    () => `${employeesData.value.reduce((a, b) => a + b.employee_salary / 12, 0).toFixed(2)} €`,
)

const duplicateEmp = (emp, i) => {
    const dup = {
        ...emp,
        id: Math.max(...employeesData.value.map((r) => r.id)) + 1,
    }
    employeesData.value.splice(i + 1, 0, dup)
}
const deleteEmp = (i) => {
    employeesData.value.splice(i, 1)
}

const sortSalary = () => {
    sortState.value = sortState.value === null ? true : !sortState.value
    return employeesData.value.sort((a, b) =>
        sortState.value
            ? a.employee_salary - b.employee_salary
            : b.employee_salary - a.employee_salary,
    )
}

const load = async () => {
    const res = await fetch('https://arfp.github.io/tp/web/javascript2/03-employees/employees.json')
    employeesData.value = (await res.json()).data
    employeesData.value = employeesData.value.map((employee) => ({
        ...employee,
        employee_email: `${employee.employee_name[0].toLowerCase()}.${employee.employee_name.split(' ')[1].toLowerCase()}@email.com`,
    }))
}

onMounted(load)
</script>
