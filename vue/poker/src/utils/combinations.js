export const combinations = () => {
    const check = (cards) => {
        const countValues = {}
        const countFamilies = {}
        const figuresValues = {}
        let pairValues = []
        let threeOfAKind = null
        let fourOfAKind = null
        let straight = null
        let flush = null

        for (const card of cards) {
            countValues[card.rank.value] = (countValues[card.rank.value] || 0) + 1
            figuresValues[card.rank.value] = card.rank.fig

            countFamilies[card.family.symbol] = (countFamilies[card.family.symbol] || 0) + 1
        }

        for (const val in countValues) {
            if (countValues[val] === 4) {
                fourOfAKind = figuresValues[val]
            }
            if (countValues[val] === 3) {
                threeOfAKind = figuresValues[val]
            }
            if (countValues[val] === 2) {
                pairValues.push(figuresValues[val])
            }
        }

        for (const family in countFamilies) {
            if (countFamilies[family] >= 5) {
                flush = family
            }
        }

        /* if(straight && flush) */

        if (flush) {
            const flushCards = cards.filter((c) => c.family.symbol === flush)
            const bestCard = flushCards.sort((a, b) => b.rank.value - a.rank.value)[0]
            return { result: `Couleur à ${bestCard.rank.fig}` }
        }

        /* if(straight) {} */

        if (fourOfAKind) {
            return { result: `Carré de ${fourOfAKind}` }
        }
        if (threeOfAKind && pairValues.length >= 1) {
            return { result: `Full aux ${threeOfAKind} par les ${pairValues[0]}` }
        }
        if (threeOfAKind) {
            return { result: `Brelan de ${threeOfAKind}` }
        }
        if (pairValues.length >= 2) {
            return { result: `Double Paire ${pairValues[0]} / ${pairValues[1]}` }
        }
        if (pairValues.length === 1) {
            return { result: `Paire de ${pairValues[0]}` }
        }

        return {
            result: `Carte haute: ${cards.sort((a, b) => b.rank.value - a.rank.value)[0].rank.fig}`,
        }
    }

    return { check }
}
