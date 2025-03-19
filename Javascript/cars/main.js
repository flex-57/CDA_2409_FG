import { collectionCars } from "./data/cars.js"

const form = document.querySelector('form')
const inputCarName = document.getElementById('carName')
const result = document.getElementById('result')

inputCarName.parentElement.setAttribute('id', 'form-grp')

form.addEventListener('submit', (e) => {
// inputCarName.addEventListener('input', (e) => {
    e.preventDefault()
    
    const filteredCars = collectionCars.filter((c) =>
        c.car_name.toLowerCase().includes(inputCarName.value.trim().toLowerCase()) 
        // || c.car_origin.toLowerCase().includes(inputCarName.value.toLowerCase()) 
        // || String(c.car_model).includes(inputCarName.value) 
        // || String(c.car_id).includes(inputCarName.value)
    )

    result.textContent = ''
    if (inputCarName.value.length > 0) filteredCars.forEach(displayCar)
})

const displayCar = (c) => {
    const div = document.createElement('div')
    div.className = 'card'

    const box_id = document.createElement('span')
    const box_name = document.createElement('h3')
    const box_model = document.createElement('span')
    const box_origin = document.createElement('span')
    const box_img = document.createElement('div')
    const img = document.createElement('img')

    box_id.innerHTML = `<i>Voiture id :</i> <b>${c.car_id}</b>`
    box_name.innerHTML = c.car_name
    box_model.innerHTML = `<i>Model :</i> <b>${c.car_model}</b>`
    box_origin.innerHTML = `<i>Origine :</i> <b>${c.car_origin}</b>`

    box_img.append(img)
    div.append(box_name, box_model, box_origin, box_img, box_id)
    result.append(div)
}

// collectionCars.forEach(displayCar)