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

    const ranks = [
        {
            value: 2,
            fig: '2',
        },
        {
            value: 3,
            fig: '3',
        },
        {
            value: 4,
            fig: '4',
        },
        {
            value: 5,
            fig: '5',
        },
        {
            value: 6,
            fig: '6',
        },
        {
            value: 7,
            fig: '7',
        },
        {
            value: 8,
            fig: '8',
        },
        {
            value: 9,
            fig: '9',
        },
        {
            value: 10,
            fig: '10',
        },
        {
            value: 11,
            fig: 'J',
        },
        {
            value: 12,
            fig: 'Q',
        },
        {
            value: 13,
            fig: 'K',
        },
        {
            value: 14,
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
