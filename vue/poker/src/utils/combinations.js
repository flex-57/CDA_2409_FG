export const combinations = () => {
    const check = (cards) => {

        const count = {}
        cards.forEach((card) => {
            count[card.rank.value] = count[card.rank.value] + 1 || 0 + 1
        })
        console.log(count)

    }

    return { check }
}
