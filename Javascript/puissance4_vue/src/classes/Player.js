export class Player {
    constructor(name = '', color = '', score = 0) {
        this.name = name
        this.color = color
        this.score = score
    }

    validate(colors) {
        const errors = []
        if (!this.name) errors.push('Veuillez entrer un nom.')
        if (!colors.includes(this.color)) errors.push('Veuillez choisir une couleur valide.')
        return errors
    }

    static saveToSession(key, player) {
        sessionStorage.setItem(key, JSON.stringify(player))
    }

    static loadFromSession(key) {
        const data = sessionStorage.getItem(key)
        return data ? new Player(...Object.values(JSON.parse(data))) : new Player()
    }
}
