const form = document.querySelector('form')
const inputSearchCp = document.querySelector('#input-search-cp')
const btnSearch = document.querySelector('#btn-search')
const listCommunes = document.querySelector('#list-communes')

const getCommunes = async () => {
    const response = await fetch('https://arfp.github.io/tp/web/javascript/02-zipcodes/zipcodes.json')
    return await response.json()
}

getCommunes().then((communes, index) => {
    
    com
    
})