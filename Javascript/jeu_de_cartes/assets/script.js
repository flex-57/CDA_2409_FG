const titleHead = [
    'id', 
    'name', 
    'level',
    'description', 
    'power', 
    'attack', 
    'armor',
    'damage',
    'mitigation',
    'played',
    'victory',
    'defeat',
    'draw'
]

const table = document.querySelector('table')
const thead = document.querySelector('thead')
const tbody = document.querySelector('tbody')

const tr = document.createElement('tr')
thead.append(tr)

titleHead.forEach(t => {
    const th = document.createElement('th')
    th.innerText = t
    tr.append(th)
})

const getCards = async () => {
    try {
        const response = await fetch('https://arfp.github.io/tp/web/javascript/03-cardgame/cardgame.json')
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

getCards().then(cards => {
    cards.forEach(c => {
        const tr = document.createElement('tr')
        const tdId = document.createElement('td')
        const tdName = document.createElement('td')
        const tdLevel = document.createElement('td')
        const tdDescription = document.createElement('td')
        const tdPower = document.createElement('td')
        const tdAttack = document.createElement('td')
        const tdArmor = document.createElement('td')
        const tdDamage = document.createElement('td')
        const tdMitigation = document.createElement('td')
        const tdPlayed = document.createElement('td')
        const tdVictory = document.createElement('td')
        const tdDefeat = document.createElement('td')
        const tdDraw = document.createElement('td')

        tdId.innerText = c.id
        tdName.innerText = c.name
        tdLevel.innerText = c.level
        tdDescription.innerText = c.description
        tdPower.innerText = c.power
        tdAttack.innerText = c.attack
        tdArmor.innerText = c.armor
        tdDamage.innerText = c.damage
        tdMitigation.innerText = c.mitigation
        tdPlayed.innerText = c.played
        tdVictory.innerText = c.victory 
        tdDefeat.innerText = c.defeat
        tdDraw.innerText = c.draw

        tr.append(
            tdId, 
            tdName, 
            tdLevel, 
            tdDescription, 
            tdPower, 
            tdAttack, 
            tdArmor, 
            tdDamage, 
            tdMitigation, 
            tdPlayed,
            tdVictory,
            tdDefeat,
            tdDraw
        )
        tbody.append(tr)
    })
    
})

