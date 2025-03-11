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
        if (!response.ok) {
            throw new Error('Erreur de chargement des données')
        }
        resultsData = await response.json()
        display()
    } catch (error) {
        console.error('Erreur', error)
        resultsData = []
    }
}

const display = () => {
    let sum = resultsData.reduce((sum, e) => sum + e.temps, 0)
    let avg = resultsData.length > 0 ? parseFloat((sum / resultsData.length)) : 0
    
    const w = resultsData.length > 0 ? resultsData.reduce((a, b) => a.temps < b.temps ? a : b) : null

    nbParticipants.innerText = resultsData.length
    winner.innerText = w.nom
    avgTime.innerText = `${formatTimeInMinutesSeconds(avg)[0]} minutes et ${formatTimeInMinutesSeconds(avg)[1]} secondes`

    const title = ['Pays', 'Nom', 'Prénom', 'Temps final', 'Écart gagnant']

    title.forEach((t) => {
        const th = document.createElement('th')
        th.innerText = t
        thead.append(th)
    })

    const uniqueCountries = [...new Set(resultsData.map(r => r.pays))]
    uniqueCountries.sort((a, b) => a.localeCompare(b))
    uniqueCountries.forEach(r => {
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.value = r
        checkbox.id = r

        const label = document.createElement('label')
        label.htmlFor = r
        label.innerText = r

        label.append(checkbox)
        country.append(label)
    })

    resultsData.sort((a, b) => a.temps - b.temps)
    displayTable(resultsData)

    document.querySelectorAll('#country input').forEach(input => {
        input.addEventListener('change', filterResults)
    })
}

const displayTable = (data) => {
    tbody.innerHTML = ''

    const w = resultsData.length > 0 ? resultsData.reduce((a, b) => a.temps < b.temps ? a : b) : null

    data.forEach((r) => {
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
        tdGap.innerText = r !== w ? `+${r.temps - w.temps}s` : ';)'
    })
}

const filterResults = () => {
    const checkedCountries = Array.from(document.querySelectorAll('#country input:checked')).map(input => input.value)
    let filteredData = resultsData.filter(r => checkedCountries.includes(r.pays) || checkedCountries.length === 0)
    filteredData.sort((a, b) => a.temps - b.temps)
    displayTable(filteredData)
}

const formatTimeInMinutesSeconds = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = Math.floor(time - minutes * 60)

    if (minutes < 10) minutes = `0${minutes}`
    if (seconds < 10) seconds = `0${seconds}`

    return [minutes, seconds]
}

getResults()
