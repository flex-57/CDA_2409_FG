const inputFirstname = document.querySelector('#firstname')
const inputAge = document.querySelector('#age')
const btnValid = document.querySelector('.validation')
const btnReset = document.querySelector('.reset')
const display = document.querySelector('.display')

const hello = document.createElement('p')
const statusElem = document.createElement('p')
const retirementElem = document.createElement('p')

document.body.append(hello)

hello.innerText = 'Compléter/corriger le formulaire.'

btnValid.addEventListener('click', (e) => {
    e.preventDefault()
    
    if(inputFirstname.value !== "" && inputAge.value > 0 ) {
        const firstname = String(inputFirstname.value).charAt(0).toUpperCase() + String(inputFirstname.value).slice(1)
        hello.innerHTML = `Bonjour <span class="blue">${firstname}</span>, votre âge est : <span class="blue">${inputAge.value}</span> ans.`

        hello.append(statusElem)
        statusElem.innerHTML = inputAge.value >= 18 ? 'Vous êtes <span class="blue">majeur</span> !' : 'Vous êtes <span class="blue">mineur</span> !'

        statusElem.append(retirementElem)
         
        retirementElem.innerHTML = inputAge.value === 64 
            ? 'Vous prenez votre retraite cette année !' 
            : inputAge.value < 64 
                ? `Il vous reste <span class="blue">${64 - parseInt(inputAge.value)}</span> année(s) avant la retraite.`
                : `Vous êtes à la retraite depuis <span class="blue">${parseInt(inputAge.value) - 64}</span> année(s).`
    }
})

btnReset.addEventListener('click', () => {
    display.innerText = ''
})