export class Order {
    static getRandomFloat(min, max, dec = 2) {
        return Number(Math.random() * (max - min) + min).toFixed(dec)
    }

    constructor(bakeryLvl) {
        this.id = 0
        this.bakeryLvl = bakeryLvl
        this.nbBaguettes = Number(Order.getRandomFloat(5, 30 * bakeryLvl, 0))
        this.baguetteUnitPrice = Number(
            Order.getRandomFloat(this.bakeryLvl / 100, (30 * this.bakeryLvl) / 100),
        )
        this.totalPrice = this.nbBaguettes * this.baguetteUnitPrice
        this.time = Number(Order.getRandomFloat(10, 60, 0))
        this.interval = 0
    }
}
