const form = document.querySelector('form')
const inputFullname = document.querySelector('#input-fullname')
const inputGrade = document.querySelector('#input-grade')
const btnAdd = document.querySelector('#btn-add')
const table = document.querySelector('table')
const tbody = document.querySelector('tbody')
const ul = document.querySelector('ul')
const errors = document.querySelectorAll('.error')
const errorForm = document.querySelector('.error-form')
const errorFullname = document.querySelector('.error-fullname')
const errorGrade = document.querySelector('.error-grade')

const failingGrade = 12
let evalData = []

const getEval = async () => {
    try {
        const response = await fetch('./assets/eval.json')
        if(!response.ok) {
            throw new Error('Erreur de chargement des données')
        }
        evalData =  await response.json()
        display()
    }
    catch (error) {
        console.error('Erreur', error)
        evalData = []
    }
}

const display = () => {
    
    tbody.innerText = ''
    ul.innerText = ''

    evalData.sort((a, b) => b.grade - a.grade)
    
    let sum = evalData.reduce((sum, e) => sum + e.grade, 0)
    let avg = evalData.length > 0 ? parseFloat((sum / evalData.length).toFixed(2)) : 0
    let nbStudentsAboveAvg = evalData.filter(e => e.grade > avg).length

    evalData.forEach(e => {

        const tr = document.createElement('tr')
        const tdLastname = document.createElement('td')
        const tdFirstname = document.createElement('td')
        const tdGrade = document.createElement('td')
        const tdObtained = document.createElement('td')
        
        tdLastname.innerText = e.fullname.split(' ')[0]
        tdFirstname.innerText = e.fullname.split(' ')[1]
        tdGrade.innerText = e.grade
        tdObtained.innerText = e.grade >= failingGrade ? 'Oui' : 'Non'
        
        tbody.append(tr)
        tr.append(tdLastname, tdFirstname, tdGrade, tdObtained)
    })

    const liNbStudents = document.createElement('li')
    const liClassAvg = document.createElement('li')
    const liNbStudentsAboveAvg = document.createElement('li')
    const liFailingGrade = document.createElement('li')

    liNbStudents.innerText = `Nombre d'étudiants : ${evalData.length}`
    liClassAvg.innerText = `Moyenne de la classe: ${avg}`
    liNbStudentsAboveAvg.innerText = `Nombre d'étudiants au dessus de la moyenne : ${nbStudentsAboveAvg}`
    liFailingGrade.innerText = `Note éliminatoire : ${failingGrade}`

    ul.append(liNbStudents, liClassAvg, liNbStudentsAboveAvg, liFailingGrade)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const lastname = inputFullname.value.trim().split(' ')[0]
    const firstname = inputFullname.value.trim().split(' ')[1]
    const grade = parseFloat(inputGrade.value)

    const fullname = ucFirst(lastname) + ' ' + ucFirst(firstname)

    let error = 0
  
    errors.forEach((er) => {
        er.style.display = 'none'
        er.innerText = ''
    })

    const reg = /[a-zA-Z-]{2,}/

    if(!reg.test(lastname) || !reg.test(firstname)) {
        displayMessage(
            'Le nom et le prénom ne doivent comporter que des lettres et des tirets avec deux caractères minimum chacun !',
            errorFullname
        )
        error++
    }
    
    if(isNaN(grade) || grade > 20 || grade < 0) {
        displayMessage(
            'La note doit être comprise entre 0 et 20 !',
            errorGrade
        ) 
        error++
    }

    if(error === 0) {
        evalData.push({fullname, grade})
        inputFullname.value = ''
        inputGrade.value = ''
        display()
    }

})

const ucFirst = (word) => {
    return String(word).charAt(0).toUpperCase()+String(word).slice(1).toLowerCase()
}

const displayMessage = (message, elem) => {
    elem.style.display = 'block'
    elem.innerText = message
}
 
getEval()
