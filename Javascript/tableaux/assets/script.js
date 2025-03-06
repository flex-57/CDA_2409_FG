const people = ['Mike Dev', 'John Makenzie', 'Léa Grande']

const main = document.querySelector('main')
const form = document.querySelector('form')
const inputFirstname = document.querySelector('#input-firstname')
const inputLastname = document.querySelector('#input-lastname')
const btnAdd = document.querySelector('#btn-add')
const formMessage = document.querySelector('#form-message')
const message = document.querySelector('#message')
const ul = document.querySelector('ul')
const table = document.querySelector('table')
const tbody = document.querySelector('tbody')

const display = () => {

    tbody.innerText = ''
    ul.innerText = ''
    
    if(people.length > 0) {

        table.style.display = ''
        message.innerText = ''

        people.forEach((p, i) => {
            const li = document.createElement('li')
            li.innerText = p
            ul.append(li)
    
            const tr = document.createElement('tr')
            const tdLastname = document.createElement('td')
            const tdFirstname = document.createElement('td')
            const tdEmail = document.createElement('td')
            const tdSupprimer = document.createElement('td')
    
            const firstname = p.split(' ')[0]
            const lastname = p.split(' ')[1]
    
            tdLastname.innerText = lastname
            tdFirstname.innerText = firstname
            tdEmail.innerText = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@exemple.com`
            tdSupprimer.innerHTML = `<a href="" id="${i}" class="delete">X</a>`
    
            tbody.append(tr)
            tr.append(tdLastname, tdFirstname, tdEmail, tdSupprimer)
        })
    
        const deletable = document.querySelectorAll('.delete')
    
        deletable.forEach(d => {
            d.addEventListener('click', (e) => {
                e.preventDefault()
                people.splice(d.id, 1)
                display()
            })
        })
    }

    else {
        table.style.display = 'none'
        message.innerHTML = '<p>La liste est vide.</p>'
    }
}

form.addEventListener('submit', e => {
    e.preventDefault()
    formMessage.innerText = ''

    const reg = /[a-zA-Z-]{2,}/

    if(reg.test(inputFirstname.value.trim()) && reg.test(inputLastname.value.trim())) {
    
        const firstname = `${String(inputFirstname.value).charAt(0).toUpperCase()}${String(inputFirstname.value).slice(1)}`
        const lastname = `${String(inputLastname.value).charAt(0).toUpperCase()}${String(inputLastname.value).slice(1)}`

        if(!people.includes(`${firstname.trim()} ${lastname.trim()}`)) {
            displayMessage(formMessage, `<p class="success">✔ ${firstname.trim()} ${lastname.trim()} à été ajouté !</p>`)
            people.push(`${firstname.trim()} ${lastname.trim()}`)
            inputFirstname.value = ''
            inputLastname.value = ''
            display()
        }
        else {
            displayMessage(formMessage, '<p class="error">⚠ Le nom de la personne existe déjà !</p>')
        }
    }
    else {
        displayMessage(formMessage, '<p class="error">⚠ Le prénom et le nom doivent comporter 2 caractères minimum chacun sans espaces !</p>')
    }
})

const displayMessage = (elem, m) => {
    elem.innerHTML = m
    let opacity = 0
    const interval = setInterval(() => {
        if(opacity >= 1) {
            clearInterval(interval)
        }
        elem.style.opacity = opacity
        opacity += .1
    }, 50)
    setTimeout(() => {
        const interval = setInterval(() => {
            if(opacity <= 0) {
                clearInterval(interval)
                elem.innerHTML = ''
            }
            elem.style.opacity = opacity
            opacity -= .1
        }, 50)
    }, 3000)
}

display()
