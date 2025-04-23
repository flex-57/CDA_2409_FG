export const combinations = () => {
    const check = (cards) => {

        const count = {}
        cards.forEach((card) => {
            count[card.rank.value] = (count[card.rank.value] || 0) + 1


            if (count[card.rank.value] === 2) {
                return { result: 'Paire'}
            }
        })


        console.log(count);


    }

    return { check }
}
