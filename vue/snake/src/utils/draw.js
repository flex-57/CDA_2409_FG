export const drawCanvas = () => {
    const drawBg = (ctx, width, height) => {
        ctx.beginPath()
        ctx.fillStyle = '#00000050'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillRect(0, 0, width, height)
    }

    const drawText = (ctx, width, heigth, text, color, font) => {
        ctx.beginPath()
        ctx.font = font
        ctx.fillStyle = color
        ctx.fillText(text, width, heigth)
    }

    const drawCell = (ctx, x, y, size, color, radius) => {
        ctx.beginPath()
        ctx.roundRect(x, y, size, size, [radius])
        ctx.shadowColor = '#111'
        ctx.shadowBlur = 12
        ctx.fillStyle = color
        ctx.fill()
    }

    return { drawBg, drawText, drawCell }
}
