import { collectionCars } from "./data/cars.js"

const form = document.querySelector('form')
const inputCarName = document.getElementById('carName')
const result = document.getElementById('result')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const filteredCars = collectionCars.filter((c) =>
        c.car_name.toLowerCase().includes(inputCarName.value.toLowerCase()) 
        // || c.car_origin.toLowerCase().includes(inputCarName.value.toLowerCase()) 
        // || String(c.car_model).includes(inputCarName.value) 
        // || String(c.car_id).includes(inputCarName.value)
    )

    result.textContent = ''
    filteredCars.forEach(displayCar)
})

const displayCar = (c) => {
    const div = document.createElement('div')

    const div_id = document.createElement('div')
    const div_name = document.createElement('div')
    const div_model = document.createElement('div')
    const div_origin = document.createElement('div')

    const label_id = document.createElement('label')
    const label_name = document.createElement('label')
    const label_model = document.createElement('label')
    const label_origin = document.createElement('label')

    const p_id = document.createElement('p')
    const p_name = document.createElement('p')
    const p_model = document.createElement('p')
    const p_origin = document.createElement('p')

    label_id.textContent = 'Id'
    label_name.textContent = 'Name'
    label_model.textContent = 'Model'
    label_origin.textContent = 'Origin'

    p_id.innerHTML = `<b>${c.car_id}</b>`
    p_name.innerHTML = `<b>${c.car_name}</b>`
    p_model.innerHTML = `<b>${c.car_model}</b>`
    p_origin.innerHTML = `<b>${c.car_origin}</b>`

    div_id.append(label_id, p_id)
    div_name.append(label_name, p_name)
    div_model.append(label_model, p_model)
    div_origin.append(label_origin, p_origin)

    div.append(div_id, div_name, div_model, div_origin)
    result.append(div)
}

