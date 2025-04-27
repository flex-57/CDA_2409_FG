export const combinations = () => {
    const check = (cards) => {
        let bestCard = null
        let pairs = []
        let threeOfAKind = null
        let fourOfAKind = null
        let flush = null
        let straight = []

        cards.sort((a, b) => b.rank.strength - a.rank.strength)

        bestCard = cards[0]

        let countVal = []
        let duplicates = []
        let countFamily = []
        let cardsColor = []

        cards.forEach((card) => {
            countVal[card.rank.strength] = (countVal[card.rank.strength] || 0) + 1
            duplicates[card.rank.strength] = card
            countFamily[card.family.symbol] = (countFamily[card.family.symbol] || 0) + 1

            if (!cardsColor[card.family.symbol]) cardsColor[card.family.symbol] = []
            cardsColor[card.family.symbol].push(card)
        })

        let kickers = []

        for (const strength in countVal) {
            if (countVal[strength] === 4) fourOfAKind = duplicates[strength]
            else if (countVal[strength] === 3) threeOfAKind = duplicates[strength]
            else if (countVal[strength] === 2) pairs.push(duplicates[strength])
            else kickers.push(...[duplicates[strength]])
        }

        kickers.sort((a, b) => b.rank.strength - a.rank.strength)

        for (const f in countFamily) {
            if (countFamily[f] >= 5) flush = cardsColor[f]
        }

        let uniqueStrengths = [...new Set(cards.map((card) => card.rank.strength))]
        if (uniqueStrengths.includes(14)) uniqueStrengths.push(1)

        let currentSequence = [uniqueStrengths[0]]
        for (let i = 1; i < uniqueStrengths.length; i++) {
            if (currentSequence.length === 0 || uniqueStrengths[i] === uniqueStrengths[i - 1] - 1) {
                currentSequence.push(uniqueStrengths[i])
                if (currentSequence.length === 5) {
                    straight = [...currentSequence]
                }
            } else {
                currentSequence = [uniqueStrengths[i]]
            }
        }

        /**
         * Results
         */
        if (straight.length && flush) {
            const flushCards = flush.filter((card) => straight.includes(card.rank.strength))
            if (flushCards.length === 5) {
                const royalFlushStrengths = [10, 11, 12, 13, 14]
                if (
                    royalFlushStrengths.every((val) =>
                        flushCards.some((card) => card.rank.strength === val),
                    )
                ) {
                    return { result: `Quinte Flush Royale`, score: 900 }
                }
                return {
                    result: `Quinte Flush à ${flushCards[flushCards.length - 1].rank.name} à ${flushCards[0].rank.name}`,
                    score: 800 + fourOfAKind.rank.strength,
                }
            }
        }

        if (fourOfAKind)
            return {
                result: `Carré de ${fourOfAKind.rank.name}`,
                score: 700 + fourOfAKind.rank.strength,
            }

        if (threeOfAKind && pairs.length)
            return {
                result: `Full au ${threeOfAKind.rank.name} par les ${pairs[0].rank.name}`,
                score: 600 + threeOfAKind.rank.strength + pairs[0].rank.strength,
            }

        if (flush)
            return {
                result: `Couleur hauteur ${flush[0].rank.name}`,
                cards: flush.slice(0, 5),
                score: 500 + flush.slice(0, 5).reduce((a, b) => b.rank.strength + a, 0),
            }

        if (straight.length) {
            let straightCards = straight.map((strength) => {
                if (strength === 1) {
                    return cards.find((card) => card.rank.strength === 14)
                }
                return cards.find((card) => card.rank.strength === strength)
            })

            return {
                result: `Quinte ${straightCards[straightCards.length - 1].rank.name} à ${straightCards[0].rank.name}`,
                cards: straightCards.slice(0, 5),
                score: 400 + straightCards.slice(0, 5).reduce((a, b) => b.rank.strength + a, 0),
            }
        }

        if (threeOfAKind)
            return {
                result: `Brelan de ${threeOfAKind.rank.name}`,
                cards: [threeOfAKind],
                kickers: kickers.slice(0, 2),
                score:
                    300 +
                    threeOfAKind.rank.strength * 3 +
                    kickers.slice(0, 2).reduce((a, b) => b.rank.strength + a, 0),
            }

        if (pairs.length >= 2)
            return {
                result: `Double Paire ${pairs[pairs.length - 1].rank.name} / ${pairs[pairs.length - 2].rank.name}`,
                cards: [pairs[pairs.length - 1], pairs[pairs.length - 2]],
                kickers: kickers.slice(0, 1),
                score:
                    200 +
                    pairs[pairs.length - 1].rank.strength * 2 +
                    pairs[pairs.length - 2].rank.strength * 2 +
                    kickers.slice(0, 1).reduce((a, b) => b.rank.strength + a, 0),
            }

        if (pairs.length === 1)
            return {
                result: `Paire de ${pairs[0].rank.name}`,
                cards: [pairs[0]],
                kickers: kickers.slice(0, 3),
                score:
                    100 +
                    pairs[0].rank.strength * 2 +
                    kickers.slice(0, 3).reduce((a, b) => b.rank.strength + a, 0),
            }

        return {
            result: `Carte haute: ${bestCard.rank.name}`,
            cards: [cards.slice(0, 5)],
            kickers: kickers.slice(1, 5),
            score: cards.slice(0, 5).reduce((a, b) => b.rank.strength + a, 0),
        }
    }

    return { check }
}
