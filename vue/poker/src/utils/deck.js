import { ref } from 'vue'

export const getDeck = () => {
    const families = [
        {
            symbol: '♠',
            color: 'black',
        },
        {
            symbol: '♣',
            color: 'black',
        },
        {
            symbol: '♥',
            color: 'red',
        },
        {
            symbol: '♦',
            color: 'red',
        },
    ]

    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

    const deck = ref([])

    const init = () => {
        families.forEach((family) => {
            ranks.forEach((rank) => {
                deck.value.push({ rank, family })
            })
        })
    }

    const shuffle = () => {
        return deck.value
            .map((item) => ({ value: item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map((item) => item.value)
    }

    init()

    return { shuffle }
}
