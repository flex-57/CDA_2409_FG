const myEmployee = {
    lastname: "Doe", 
    firstname: "John", 
    birthday: "1981-11-12", 
    salary: 2150
}

const userName = document.querySelector('#user-name')

const tableBloc = document.querySelector('.table-bloc')


const rowHead = document.createElement('tr')
const headLastname = document.createElement('th')
const headFirstname = document.createElement('th')
const headBirthday = document.createElement('th')
const headEmail = document.createElement('th')
const headSalary = document.createElement('th')

headLastname.innerText = 'Nom'
headFirstname.innerText = 'Prénom'
headBirthday.innerText = 'Date de naissance'
headEmail.innerText = 'Email'
headSalary.innerText = 'Salaire'

tableBloc.append(rowHead)
rowHead.append(headLastname)
rowHead.append(headFirstname)
rowHead.append(headBirthday)
rowHead.append(headEmail)
rowHead.append(headSalary)

const row = document.createElement('tr')
const columnLastname = document.createElement('td')
const columnFirstname = document.createElement('td')
const columnBirthday = document.createElement('td')
const columnEmail = document.createElement('td')
const columnSalary = document.createElement('td')

const display = () => {
    userName.innerHTML = `${myEmployee.firstname} ${myEmployee.lastname}`
    columnFirstname.innerText = myEmployee.firstname
    columnLastname.innerText = myEmployee.lastname
    columnBirthday.innerText = myEmployee.birthday
    columnEmail.innerText = `${myEmployee.firstname.toLowerCase()}.${myEmployee.lastname.toLowerCase()}@example.com`
    columnSalary.innerHTML = `${myEmployee.salary} €`
    
    tableBloc.append(row)
    row.append(columnLastname)
    row.append(columnFirstname)
    row.append(columnBirthday)
    row.append(columnEmail)
    row.append(columnSalary)
}

const inputFirstname = document.querySelector('#input-firstname')
const inputLastname = document.querySelector('#input-lastname')
const inputBirthday = document.querySelector('#input-birthday')
const inputSalary = document.querySelector('#input-salary')
const btnSave = document.querySelector('#btn-save')

inputFirstname.value = myEmployee.firstname
inputLastname.value = myEmployee.lastname
inputBirthday.value = myEmployee.birthday
inputSalary.value = myEmployee.salary

btnSave.addEventListener('click', () => {
    myEmployee.firstname = inputFirstname.value
    myEmployee.lastname = inputLastname.value
    myEmployee.email = `${myEmployee.firstname.toLowerCase()}.${myEmployee.lastname.toLowerCase()}@example.com`
    myEmployee.birthday = inputBirthday.value
    myEmployee.salary = inputSalary.value > myEmployee.salary ? inputSalary.value : myEmployee.salary

    display()
})

display()
