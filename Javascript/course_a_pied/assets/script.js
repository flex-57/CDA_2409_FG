const results = document.querySelector('#results')
const nbParticipants = document.querySelector('#nb-participants')
const winner = document.querySelector('#winner')
const avgTime = document.querySelector('#avg-time')
const country = document.querySelector('#country')
const thead = document.querySelector('thead')
const tbody = document.querySelector('tbody')

const trHead = thead.insertRow()

let resultsData = []

const getResults = async () => {
    try {
        const response = await fetch('./assets/resultat10000metres.json')
        if(!response.ok) {
            throw new Error('Erreur de chargement des données')
        }
        resultsData = await response.json()
        display()
    }
    catch (error) {
        console.error('Erreur', error)
        resultsData = []
    }
}

const display = () => {

    let sum = resultsData.reduce((sum, e) => sum + e.temps, 0)
    let avg = resultsData.length > 0 ? parseFloat((sum / resultsData.length)) : 0
    
    const w = resultsData.reduce((a, b) => a.temps < b.temps ? a : b)
    
    nbParticipants.innerText = resultsData.length
    winner.innerText = w.nom
    avgTime.innerText = `${formatTimeInMinutesSeconds(avg)[0]} minutes et ${formatTimeInMinutesSeconds(avg)[1]} secondes`

    const title = ['Pays', 'Nom', 'Prénom', 'Temps final', 'Écart gagnant']

    title.forEach((t) => {
        const th = document.createElement('th')
        th.innerText = t
        thead.append(th)
    })

    resultsData.sort((a, b) => a.pays.localeCompare(b.pays))
    resultsData.forEach((r, i) => {
        const container = document.createElement('div')
        container.className = 'checkbox-container'

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.value = r.pays
        checkbox.id = r.pays

        const label = document.createElement('label')
        label.htmlFor = r.pays
        label.innerText = r.pays

        container.append(checkbox, label)
        country.append(container)
    
        checkbox.addEventListener('change', () => {
            
        })
    })

    resultsData.sort((a, b) => a.temps - b.temps)
    resultsData.forEach((r, i) => {
        const trBody = tbody.insertRow()
        const tdCountry = trBody.insertCell()
        const tdLastname = trBody.insertCell()
        const tdFirstname = trBody.insertCell()
        const tdFinalTime = trBody.insertCell()
        const tdGap = trBody.insertCell()

        tdCountry.innerText = r.pays
        tdLastname.innerText = r.nom.split(' ')[0]
        tdFirstname.innerText = r.nom.split(' ')[1]
        tdFinalTime.innerText = `${formatTimeInMinutesSeconds(r.temps)[0]}min${formatTimeInMinutesSeconds(r.temps)[1]}s`
        tdGap.innerText = `+${r.temps - w.temps}s`
    })
}

const formatTimeInMinutesSeconds = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)
    
    if(minutes < 10) minutes = `0${minutes}`
    if(seconds < 10) seconds = `0${seconds}`
    
    return [minutes, seconds]
}

getResults()