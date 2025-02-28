const people = ['Mike Dev', 'John Makenzie', 'Léa Grande']

const addPerson = document.querySelector('.add-person')
const inputFirstname = document.querySelector('#input-firstname')
const inputLastname = document.querySelector('#input-lastname')
const btnAddPerson = document.querySelector('.btn-add-person')
const addPersonneText = document.createElement('p')

const listPersonBloc = document.querySelector('.list-person-bloc')
const tablePersonBloc = document.querySelector('.table-person-bloc')

btnAddPerson.addEventListener('click', () => {
    addPersonneText.innerText = ''

    if(/[a-zA-Z -]{2,}/.test(inputFirstname.value) && /[a-zA-Z -]{2,}/.test(inputLastname.value)) {
    
        const firstname = `${String(inputFirstname.value).charAt(0).toUpperCase()}${String(inputFirstname.value).slice(1)}`
        const lastname = `${String(inputLastname.value).charAt(0).toUpperCase()}${String(inputLastname.value).slice(1)}`

        if(!people.includes(`${firstname} ${lastname}`)) {
            addPersonneText.innerHTML = `${firstname} ${lastname} à été ajouté !`
            
            people.push(`${firstname} ${lastname}`)
            display()
        }
    }
    else {
        addPersonneText.innerHTML = '<span class="red">Veuillez remplir les champs correctement !</span>'
    }
    addPerson.append(addPersonneText)
})


const display = () => {

    listPersonBloc.innerHTML = ''
    tablePersonBloc.innerHTML = ''

    if(people.length > 0) {

        const listPerson = document.createElement('ul')
        listPersonBloc.append(listPerson)
    
        const rowHead = document.createElement('tr')
        const headLastname = document.createElement('th')
        const headFirstname = document.createElement('th')
        const headEmail = document.createElement('th')
        const headDelete = document.createElement('th')
    
        headLastname.innerText = 'Nom'
        headFirstname.innerText = 'Prénom'
        headEmail.innerText = 'Email'
        headDelete.innerText = 'Supprimer'
    
        tablePersonBloc.append(rowHead)
        rowHead.append(headLastname)
        rowHead.append(headFirstname)
        rowHead.append(headEmail)
        rowHead.append(headDelete)
    
        people.forEach((e, index) => {
            const personItem = document.createElement('li')
            personItem.innerText = e
            listPerson.append(personItem)
    
            const rowPerson = document.createElement('tr')
            const columnLastname = document.createElement('td')
            const columnFirstname = document.createElement('td')
            const columnEmail = document.createElement('td')
            const columnDelete = document.createElement('td')
    
            columnFirstname.innerText = e.split(' ')[0]
            columnLastname.innerText = e.split(' ')[1]
            columnEmail.innerText = `${e.split(' ')[0].toLowerCase()}.${e.split(' ')[1].toLowerCase()}@example.com`
            columnDelete.innerHTML = `<a href="" id="${index}" class="delete">X</a>`
            
            tablePersonBloc.append(rowPerson)
            rowPerson.append(columnLastname)
            rowPerson.append(columnFirstname)
            rowPerson.append(columnEmail)
            rowPerson.append(columnDelete)
        })
    
        const deletable = document.querySelectorAll('.delete')
        
        deletable.forEach((d) => {
            d.addEventListener('click', (e) => {
                e.preventDefault()
                people.splice(d.id, 1)
                display() 
            })
        })
    }
}

display()
