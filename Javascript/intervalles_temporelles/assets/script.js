const inputCurrentDate = document.querySelector('#current-date')
const inputCurrentHour = document.querySelector('#current-hour')
const btnDisplay = document.querySelector('.display-date')
const display = document.querySelector('.display')
const display2 = document.querySelector('.display2')
const inputDate = document.querySelector('#date')
const btnCalculateInterval = document.querySelector('.calculate-interval')
 
 
btnDisplay.addEventListener('click', () => {
    display.innerText = ''
   
    const currentDate = new Date()
   
    const month = currentDate.getMonth() < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1
   
    inputCurrentDate.value = `${currentDate.getFullYear()}-${month}-${currentDate.getDate()}`
    inputCurrentHour.value = currentDate.toLocaleTimeString()
   
    const hr = document.createElement('hr')
    const hr2 = document.createElement('hr')
    const p = document.createElement('p')

    display.append(hr)
    display.append(p)
    display.append(hr2)

    p.innerHTML = `Aujourd'hui nous sommes le <span class="blue">${currentDate.toLocaleDateString()}</span>,
    l'heure courante est : <span class="blue">${currentDate.toLocaleTimeString()}</span>`
})
 
btnCalculateInterval.addEventListener('click', () => {
    display2.innerText = ''

    const inputtedDate = new Date(inputDate.value)

    const p2 = document.createElement('p')
 
    display2.append(p2)

    p2.innerHTML = inputDate.value != '' 
        ? `Il y a <span class="blue">${Math.round((Date.now() - inputtedDate) / 1000 / 60 / 60 / 24)}</span> jours entre aujourd'hui
        et le <span class="blue">${inputtedDate.toLocaleDateString()} à ${inputtedDate.toLocaleTimeString()}</span>`
        : `La date fournie n'est pas valide !`
})