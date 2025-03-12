const tbody = document.querySelector('tbody')
const tfoot = document.querySelector('tfoot')

const btnSort = document.querySelector('#monthly button')

let resultsData = []
let sorted = 0

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

    result.forEach((r) => {
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

        btnDuplicate.id = r.id
        btnDelete.id = r.id

        tdEid.innerText = r.id
        tdName.innerText = r.employee_name
        tdEmail.innerText = `${(r.employee_name.split(' ')[0]).charAt(0).toLowerCase()}.${(r.employee_name.split(' ')[1]).toLowerCase()}@email.fr`
        tdSalary.innerText = `${(r.employee_salary / 12).toFixed(2)} €`
        tdBirth.innerText = new Date().getFullYear() - r.employee_age
        tdActions.append(btnDuplicate, btnDelete)

        btnDuplicate.addEventListener('click', () => {
            tfoot.innerText = ''
            const dup = {
                id: result.length + 1,
                employee_name: r.employee_name,
                employee_salary: r.employee_salary,
                employee_age: r.employee_age,
                profile_image: ''
            }
            result.push(dup)
            tfoot.innerText = ''
            display(result)
        })

        btnDelete.addEventListener('click', () => {
            tfoot.innerText = ''
            display(result.filter(employee => employee.id != btnDelete.id))
        })
    })

    const trFoot = tfoot.insertRow()
    const tdCount = trFoot.insertCell()
    const tdVoid = trFoot.insertCell()
    const tdTotalSalary = trFoot.insertCell()
    const tdVoid2 = trFoot.insertCell()

    tdVoid.setAttribute('colspan', 2)
    tdVoid2.setAttribute('colspan', 2)

    tdCount.innerHTML = `<b>${result.length}</b>`
    tdTotalSalary.innerHTML = `${result.reduce((a, b) => (a + b.employee_salary / 12), 0).toFixed(2)} €`
    
    btnSort.addEventListener('click', () => {
        if(sorted == 0) {
            tfoot.innerText = ''
            sorted = 1
            display(result.sort((a, b) => a.employee_salary - b.employee_salary))
        }
        else if(sorted == 1) {
            tfoot.innerText = ''
            sorted = 2
            display(result.sort((a, b) => b.employee_salary - a.employee_salary))
        }
    })
}

getResults()
