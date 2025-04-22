export class Player {
    constructor(hand, position, stack, isDealer = false) {
        this.hand = hand
        this.position = position
        this.stack = stack
        this.isDealer = isDealer
        this.isSmallBlind = false
        this.isBigBlind = false
        this.isCurrent = false
        this.currentBet = 0
    }
}
