const increaseSize = document.querySelector('.increase-size')
const decreaseSize = document.querySelector('.decrease-size')
const inputSize = document.querySelector('.input-size')
const text = document.querySelector('.text')
const counter = document.querySelector('.counter')

let taille = 16
counter.innerText = taille
inputSize.value = taille

inputSize.addEventListener('input', (e) => {
    taille = e.target.value
    ajustAll(taille)
})

increaseSize.addEventListener('click', () => {
    if(taille < 48) {
        taille++
        ajustAll(taille)
    }
    else {
        reset()
    }
})

decreaseSize.addEventListener('click', () => {
    if(taille > 8) {
        taille--
        ajustAll(taille)
    }
    else {
        reset()
    }
})

const ajustAll = (taille) => {
    counter.innerText = taille
    text.style.fontSize = taille + 'px'
    inputSize.value = taille
}

const reset = () => {
    taille = 16
    ajustAll(taille)
}
