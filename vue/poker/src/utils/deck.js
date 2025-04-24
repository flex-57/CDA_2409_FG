import { ref } from 'vue'

export const getDeck = () => {
    const families = [
        {
            symbol: '♠',
            name: 'spades',
            color: 'black',
        },
        {
            symbol: '♣',
            name: 'clubs',
            color: 'black',
        },
        {
            symbol: '♥',
            name: 'hearts',
            color: 'red',
        },
        {
            symbol: '♦',
            name: 'diamonds',
            color: 'red',
        },
    ]

    const ranks = [
        {
            strength: 2,
            fig: '2',
        },
        {
            strength: 3,
            fig: '3',
        },
        {
            strength: 4,
            fig: '4',
        },
        {
            strength: 5,
            fig: '5',
        },
        {
            strength: 6,
            fig: '6',
        },
        {
            strength: 7,
            fig: '7',
        },
        {
            strength: 8,
            fig: '8',
        },
        {
            strength: 9,
            fig: '9',
        },
        {
            strength: 10,
            fig: '10',
        },
        {
            strength: 11,
            fig: 'J',
        },
        {
            strength: 12,
            fig: 'Q',
        },
        {
            strength: 13,
            fig: 'K',
        },
        {
            strength: 14,
            fig: 'A',
        },
    ]

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
