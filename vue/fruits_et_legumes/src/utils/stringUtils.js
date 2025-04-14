export const ucFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const capitalize = (str) => {
    return str.split(' ').map(ucFirst).join(' ')
}
