export const ucFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const capitalizeName = (str) => {
    return str.split(' ').map(ucFirst).join(' ')
}
