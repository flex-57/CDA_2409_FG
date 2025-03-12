const tbody = document.querySelector('tbody')

let resultsData = []

const getResults = async () => {
    try {
        const response = await fetch('https://arfp.github.io/tp/web/javascript2/03-employees/employees.json')
        if (!response.ok) {
            throw new Error('Erreur de chargement des données')
        }
        resultsData = (await response.json()).data
        display()
    } catch (error) {
        console.error('Erreur', error)
        resultsData = []
    }
}

const display = () => {

    tbody.innerText = ''

    resultsData.forEach((r) => {
        const tr = tbody.insertRow()
        const tdEid = tr.insertCell()
        const tdName = tr.insertCell()
        const tdEmail = tr.insertCell()
        const tdSalary = tr.insertCell()
        const tdBirth = tr.insertCell()
        const tdActions = tr.insertCell()

        const btnDuplicate = document.createElement('button')
        const btnDelete = document.createElement('button')

        btnDuplicate.className = 'btn btn-duplicate'
        btnDelete.className = 'btn btn-delete'

        btnDuplicate.innerText = 'Duplicate'
        btnDelete.innerText = 'Delete'

        btnDuplicate.id = r.id
        btnDelete.id = r.id

        console.log(r);
        

        tdEid.innerText = r.id
        tdName.innerText = r.employee_name
        tdEmail.innerText = `${(r.employee_name.split(' ')[0]).charAt(0).toLowerCase()}.${(r.employee_name.split(' ')[1]).toLowerCase()}@email.fr`
        tdSalary.innerText = `${(r.employee_salary / 12).toFixed(2)} €`
        tdBirth.innerText = new Date().getFullYear() - r.employee_age
        tdActions.append(btnDuplicate, btnDelete)
    })
    
    document.querySelectorAll('.btn-duplicate').forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            console.log(btn);
        })
    })
    
    document.querySelectorAll('.btn-delete').forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            console.log('btn', btn);
            console.log('idx', idx);
            
            resultsData.splice(btn.id - 1, 1)
            display()
        })
    })
}

getResults()
