const addButton = document.querySelector('.add')
const resetButton = document.querySelector('.reset')
const counter = document.querySelector('.counter')

counter.innerText = 0

addButton.addEventListener('click', () => {
    counter.innerText++
})
resetButton.addEventListener('click', () => {
    counter.innerText = 0
})