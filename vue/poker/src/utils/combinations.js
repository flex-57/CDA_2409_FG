export const combinations = () => {
    const check = (cards) => {
        const countValues = {}
        const countFamilies = {}
        const figureValues = {}
        let pairValues = []
        let threeOfAKind = null
        let fourOfAKind = null
        let straight = null
        let flush = null

        cards.forEach((card) => {
            countValues[card.rank.strength] = (countValues[card.rank.strength] || 0) + 1
            figureValues[card.rank.strength] = card.rank.fig

            countFamilies[card.family.symbol] = (countFamilies[card.family.symbol] || 0) + 1
        })

        for (const val in countValues) {
            if (countValues[val] === 4) {
                fourOfAKind = figureValues[val]
            }
            if (countValues[val] === 3) {
                threeOfAKind = figureValues[val]
            }
            if (countValues[val] === 2) {
                pairValues.push(figureValues[val])
            }
        }

        for (const family in countFamilies) {
            if (countFamilies[family] >= 5) {
                flush = family
            }
        }

        const sortedStrengths = [...new Set(cards.map(c => c.rank.strength))].sort((a, b) => a - b)

        if (sortedStrengths.includes(14)) {
            sortedStrengths.unshift(1)
        }

        let consecutive = 1
        for (let i = 1; i < sortedStrengths.length; i++) {
            if (sortedStrengths[i] === sortedStrengths[i - 1] + 1) {
                consecutive++
                if (consecutive >= 5) {
                    straight = sortedStrengths[i]
                }
            } else {
                consecutive = 1
            }
        }

        console.log(sortedStrengths);


        /* if(straight && flush) */

        if (flush) {
            const flushCards = cards.filter((c) => c.family.symbol === flush)
            const bestCard = flushCards.sort((a, b) => b.rank.strength - a.rank.strength)[0]
            return { result: `Couleur à ${bestCard.rank.fig}` }
        }

        if(straight) {
            return { result: `Quinte ${sortedStrengths[0]} - ${sortedStrengths[sortedStrengths.length - 1]}` }
        }

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
            result: `Carte haute: ${cards.sort((a, b) => b.rank.strength - a.rank.strength)[0].rank.fig}`,
        }
    }

    return { check }
}
