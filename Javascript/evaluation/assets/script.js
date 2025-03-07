const form = document.querySelector('form')
const inputFullname = document.querySelector('#input-fullname')
const inputGrade = document.querySelector('#input-grade')
const btnAdd = document.querySelector('#btn-add')
const table = document.querySelector('table')
const tbody = document.querySelector('tbody')
const ul = document.querySelector('ul')

const EliminGrade = 12

const getEval = async () => {
    try {
        const response = await fetch('./assets/eval.json')
        if(!response.ok) {
            throw new Error('Erreur de chargement des données')
        }
        return await response.json()
    }
    catch (error) {
        console.error('Erreur', error)
        return []
    }
}

getEval().then(eval => {
    eval.sort((a, b) => b.grade - a.grade)

    let sum = 0
    let avg = 0
    let nbStudentsAboveAvg = 0

    eval.forEach(e => {

        sum += e.grade
        avg = sum / eval.length
        nbStudentsAboveAvg += e.grade > avg ? 1 : 0
        
        const tr = document.createElement('tr')
        const tdLastname = document.createElement('td')
        const tdFirstname = document.createElement('td')
        const tdGrade = document.createElement('td')
        const tdObtained = document.createElement('td')
        
        tdLastname.innerText = e.fullname.split(' ')[0]
        tdFirstname.innerText = e.fullname.split(' ')[1]
        tdGrade.innerText = e.grade
        tdObtained.innerText = e.grade >= 12 ? 'Oui' : 'Non'
        
        table.append(tr)
        tr.append(tdLastname, tdFirstname, tdGrade, tdObtained)
    })

    const liNbStudents = document.createElement('li')
    const liClassAvg = document.createElement('li')
    const liNbStudentsAboveAvg = document.createElement('li')
    const liEliminGrade = document.createElement('li')

    liNbStudents.innerText = `Nombre d'étudiants : ${eval.length}`
    liClassAvg.innerText = `Moyenne de la classe: ${avg}`
    liNbStudentsAboveAvg.innerText = `Nombre d'étudiants au dessus de la moyenne : ${nbStudentsAboveAvg}`
    liEliminGrade.innerText = `Note éliminatoire : ${EliminGrade}`

    ul.append(liNbStudents, liClassAvg, liNbStudentsAboveAvg, liEliminGrade)
})
