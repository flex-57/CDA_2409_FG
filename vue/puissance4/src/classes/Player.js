export class Player {
    constructor(name = '', color = '', score = 0) {
        this.name = name
        this.color = color
        this.score = score
    }

    static saveToSession(key, player) {
        sessionStorage.setItem(key, JSON.stringify(player))
    }

    static loadFromSession(key) {
        const data = sessionStorage.getItem(key)
        return data ? new Player(...Object.values(JSON.parse(data))) : new Player()
    }
}
