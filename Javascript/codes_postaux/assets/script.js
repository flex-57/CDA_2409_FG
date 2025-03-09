const form = document.querySelector('form')
const inputSearchCp = document.querySelector('#input-search-cp')
const datalistVilles = document.querySelector('#datalist-villes')
const btnSearch = document.querySelector('#btn-search')
const infoCommunes = document.querySelector('#info-commune')

const getCommunes = async () => {
    const response = await fetch('https://arfp.github.io/tp/web/javascript/02-zipcodes/zipcodes.json')
    return await response.json()
}

getCommunes().then(communes => {   
    inputSearchCp.addEventListener('input', () => {
        
        datalistVilles.innerText = ''
        const list = communes.filter(commune => commune.codePostal.startsWith(inputSearchCp.value))
        list.forEach(el => {
            const option = document.createElement('option')
            option.innerText = el.nomCommune
            option.value = el.codePostal
            datalistVilles.append(option)
        })
    })
})



datalistVilles.querySelectorAll('option').forEach(e => {
    e.addEventListener('keypress', () => {
    
        
    })
})


form.addEventListener('submit', (e) => {
    e.preventDefault()

    if(currentCommune) {
        getCommunes().then(communes => {
            const commune = communes.find(c => c.codePostal == currentCommune.value)

            
        })   
    }
    
})


