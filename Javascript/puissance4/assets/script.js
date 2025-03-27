const h1 = document.querySelector('h1')
const board = document.querySelector('#board')
const playerBox = document.querySelector('.player-box')
const player1Box = document.querySelector('#player1-box')
const player2Box = document.querySelector('#player2-box')
const player1Score = document.querySelector('#player1-box .score')
const player2Score = document.querySelector('#player2-box .score')
const btnRestart = document.querySelector('button')

const player1 = 'red'
const player2 = 'yellow'

const title = 'Puissance 4'
const letters = [...title]

letters.forEach((letter, i) => {
    const span = document.createElement('span')
    span.textContent = letter
    span.style.color = i % 2 === 0 ? player1 : player2
    h1.append(span)
})

let scoreStorage = localStorage.getItem('score')

const score = {
    player1: 0,
    player2: 0,
}

let matrix = [...Array(6)].map(() => Array(7).fill(''))
let currentPlayer = player1

matrix.forEach((row, x) => {
    row.forEach((cell, y) => {
        cell = document.createElement('div')
        cell.classList.add('cell')
        cell.style.background = 'black'
        cell.dataset.x = x
        cell.dataset.y = y
        cell.textContent = `${x};${y}`
        board.append(cell)

        cell.addEventListener('click', () => {
            const columnCells = [...document.querySelectorAll(`.cell[data-y="${cell.dataset.y}"]`)]

            const availableCell = columnCells.reverse().find(s => s.style.background === 'black')

            if (availableCell) {
                availableCell.style.background = currentPlayer

                matrix[parseInt(availableCell.dataset.x)][parseInt(availableCell.dataset.y)] = currentPlayer

                //console.log(availableCell);
                console.table(matrix)

                if (checkVictory(parseInt(availableCell.dataset.x), parseInt(availableCell.dataset.y))) {
                    board.style.display = 'none'
                    btnRestart.style.display = 'block'

                    if(currentPlayer === player1) {
                        score.player1++
                        player1Score.textContent = score.player1
                        player1Box.style.scale = 1.2
                        player2Box.style.scale = .8
                    }
                    else {
                        score.player2++
                        player2Score.textContent = score.player2
                        player1Box.style.scale = .8
                        player2Box.style.scale = 1.2
                    }
                    localStorage.setItem('score', JSON.stringify(score))
                    currentPlayer = currentPlayer === player1 ? player2 : player1
                }
                currentPlayer = currentPlayer === player1 ? player2 : player1
                addBorderCurrentPlayerBox()
            }
        })
    })
})

const checkDirection = (x, y, dx, dy, player) => {
    let count = 1
    for (let direction of [1, -1]) {
        for (let i = 1; i < 4; i++) {
            const nx = x + dx * i * direction
            const ny = y + dy * i * direction

            if (nx >= 0 && nx < 6 && ny >= 0 && ny < 7 && matrix[nx][ny] === player) {
                count++
            }
            else i = 4
        }
    }
    return count >= 4
}

const checkVictory = (x, y) => {
    const player = matrix[x][y]
    return (
        checkDirection(x, y, 1, 0, player) || // Horizontal
        checkDirection(x, y, 0, 1, player) || // Vertical
        checkDirection(x, y, 1, 1, player) || // Diagonale \
        checkDirection(x, y, 1, -1, player) // Diagonale /
    ) 
}

const addBorderCurrentPlayerBox = () => {
    player1Box.style.boxShadow = currentPlayer === player1 ? `0 5px 12px ${player1}` : '0 5px 12px #313158'
    player2Box.style.boxShadow = currentPlayer === player2 ? `0 5px 12px ${player2}` : '0 5px 12px #313158'
}

addBorderCurrentPlayerBox()

btnRestart.addEventListener('click', () => {
    
    matrix = [...Array(6)].map(() => Array(7).fill(''))
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.background = 'black'
    })
    
    board.style.display = 'grid'
    btnRestart.style.display = 'none'
    
    player1Box.style.scale = 1
    player2Box.style.scale = 1
    
    currentPlayer = player1
    addBorderCurrentPlayerBox()
})
