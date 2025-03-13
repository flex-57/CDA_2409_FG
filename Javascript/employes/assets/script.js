const tbody = document.querySelector('tbody')
const tfoot = document.querySelector('tfoot')

const btnSort = document.querySelectorAll('.btn-sort')
const btnSortEid = document.querySelector('.btn-sort-eid')
const btnSortName = document.querySelector('.btn-sort-name')
const btnSortSalary = document.querySelector('.btn-sort-salary')
const btnSortBirthdate = document.querySelector('.btn-sort-birthdate')

let resultsData = []

const getResults = async () => {
    try {
        const response = await fetch('https://arfp.github.io/tp/web/javascript2/03-employees/employees.json')
        if (!response.ok) {
            throw new Error('Erreur de chargement des données')
        }
        resultsData = (await response.json()).data
        display(resultsData)
    } catch (error) {
        console.error('Erreur', error)
        resultsData = []
    }
}

const display = (result) => {

    tbody.innerText = ''
    tfoot.innerText = ''

    result.forEach((r, indexResult) => {
        const trBody = tbody.insertRow()
        const tdEid = trBody.insertCell()
        const tdName = trBody.insertCell()
        const tdEmail = trBody.insertCell()
        const tdSalary = trBody.insertCell()
        const tdBirth = trBody.insertCell()
        const tdActions = trBody.insertCell()

        const btnDuplicate = document.createElement('button')
        const btnDelete = document.createElement('button')

        btnDuplicate.className = 'btn btn-duplicate'
        btnDelete.className = 'btn btn-delete'

        btnDuplicate.innerText = 'Duplicate'
        btnDelete.innerText = 'Delete'

        tdEid.innerText = r.id
        tdName.innerText = r.employee_name
        tdEmail.innerText = `${(r.employee_name.split(' ')[0]).charAt(0).toLowerCase()}.${(r.employee_name.split(' ')[1]).toLowerCase()}@email.fr`
        tdSalary.innerText = `${parseFloat((r.employee_salary / 12).toFixed(2)).toLocaleString('en')} €`
        tdBirth.innerText = new Date().getFullYear() - r.employee_age
        tdActions.append(btnDuplicate, btnDelete)

        btnDuplicate.addEventListener('click', () => {
            const dup = {
                ...r, 
                id: Math.max(...result.map(r => r.id)) + 1
            }
            result.splice(indexResult + 1, 0, dup)
            display(result)
        })

        btnDelete.addEventListener('click', () => {
            result.splice(indexResult, 1)
            display(result)
        })
    })

    const trFoot = tfoot.insertRow()
    const tdCount = trFoot.insertCell()
    trFoot.insertCell().setAttribute('colspan', 2)
    const tdTotalSalary = trFoot.insertCell()
    trFoot.insertCell().setAttribute('colspan', 2)

    tdCount.innerHTML = `<b>${result.length}</b>`
    tdTotalSalary.innerHTML = `${parseFloat(result.reduce((a, b) => a + b.employee_salary / 12, 0).toFixed(2)).toLocaleString('en')} €`
}

const sortState = {
    id: false,
    employee_name: false,
    employee_salary: false,
    employee_age: false
}

btnSortEid.addEventListener('click', () => {
    sortResult('id')
    btnSortEid.innerText = sortState.id ? '▲' : '▼'
})
btnSortName.addEventListener('click', () => {
    sortResult('employee_name', false)
    btnSortName.innerText = sortState.employee_name ? '▲' : '▼'
})
btnSortSalary.addEventListener('click', () => {
    sortResult('employee_salary')
    btnSortSalary.innerText = sortState.employee_salary ? '▲' : '▼'
})
btnSortBirthdate.addEventListener('click', () => {
    sortResult('employee_age')
    btnSortBirthdate.innerText = sortState.employee_age ? '▼' : '▲'
})

const sortResult = (col, isNum = true) => {
    sortState[col] = !sortState[col]
    resultsData.sort((a, b) => sortState[col]
        ? isNum ? a[col] - b[col] : a[col].localeCompare(b[col])
        : isNum ? b[col] - a[col] : b[col].localeCompare(a[col])
    )
    btnSort.forEach(btn => btn.innerHTML = '▲<br>▼')
    display(resultsData)
}

getResults()
