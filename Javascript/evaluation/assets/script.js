const form = document.querySelector('form')
const inputFullname = document.querySelector('#input-fullname')
const inputGrade = document.querySelector('#input-grade')
const btnAdd = document.querySelector('#btn-add')
const table = document.querySelector('table')
const tbody = document.querySelector('tbody')
const ul = document.querySelector('ul')

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
    const fullname = inputFullname.value.trim()
    const grade = parseFloat(inputGrade.value)

    if(
        /[a-zA-Z-]{2,}/.test(fullname.split(' ')[0]) && 
        /[a-zA-Z-]{2,}/.test(fullname.split(' ')[1]) && 
        !isNaN(grade) && 
        grade >= 0 && 
        grade <= 20
    ) {
        evalData.push({fullname, grade})
        inputFullname.value = ''
        inputGrade.value = ''
        display()
    }
})

getEval()
