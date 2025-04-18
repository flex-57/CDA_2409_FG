export class Player {
    constructor(cards, position, stack, isDealer = false) {
        this.cards = cards
        this.position = position
        this.stack = stack
        this.isDealer = isDealer
        this.isCurrent = false
        this.currentBet = 0
    }
}
