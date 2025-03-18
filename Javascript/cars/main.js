import { collectionCars } from './data/cars.js'

const form = document.querySelector('form')
const inputCarName = document.getElementById('carName')
const result = document.getElementById('result')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    return collectionCars.filter((c) => {
        c.car_name.toLowerCase().includes(inputCarName.value.toLowerCase())
    })
})

collectionCars.forEach((c) => {
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

    p_id.textContent = c.car_id
    p_name.textContent = c.car_name
    p_model.textContent = c.car_model
    p_origin.textContent = c.car_origin

    div_id.append(label_id, p_id)
    div_name.append(label_name, p_name)
    div_model.append(label_model, p_model)
    div_origin.append(label_origin, p_origin)

    div.append(div_id, div_name, div_model, div_origin)
    result.append(div)
})
