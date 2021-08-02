export default class Frame {
    constructor(ctx, postionX, postionY, sizeWidth, sizeHeight) {
        this.ctx = ctx
        this.postionX = postionX
        this.postionY = postionY
        this.sizeWidth = sizeWidth
        this.sizeHeight = sizeHeight
        this.setFrame()
    }

    setFrame() {
        this.ctx.beginPath()
        this.ctx.strokeStyle = 'rgb(0,0,0)'
        this.ctx.setLineDash([0, 0])
        this.ctx.fillStyle = 'rgba(239,239,239,0.6)'
        this.ctx.fillRect(this.postionX, this.postionY, this.sizeWidth, this.sizeHeight)
        this.ctx.strokeRect(this.postionX, this.postionY, this.sizeWidth, this.sizeHeight)

        this.ctx.beginPath()
        this.ctx.lineWidth = 1
        this.ctx.moveTo(this.postionX - 5, this.postionY - 5)
        this.ctx.lineTo(this.postionX - 5, this.postionY + this.sizeHeight + 5)
        this.ctx.stroke()
        this.ctx.closePath()

        this.ctx.beginPath()
        this.ctx.moveTo(this.postionX + this.sizeWidth + 5, this.postionY - 5)
        this.ctx.lineTo(this.postionX + this.sizeWidth + 5, this.postionY + this.sizeHeight + 5)
        this.ctx.stroke()
        this.ctx.closePath()

        // Rect left Top
        this.ctx.beginPath()
        this.ctx.moveTo(this.postionX - 1, this.postionY -5)
        this.ctx.lineTo(this.postionX + 10, this.postionY - 5)
        this.ctx.lineTo(this.postionX + 20, this.postionY)
        this.ctx.lineTo(this.postionX - 1, this.postionY)
        this.ctx.lineTo(this.postionX - 1, this.postionY - 5)
        this.ctx.fillStyle = '#000000'
        this.ctx.fill()
        this.ctx.closePath()

        // Rect right Top
        this.ctx.beginPath()
        this.ctx.moveTo(this.postionX + this.sizeWidth + 1, this.postionY - 5)
        this.ctx.lineTo(this.postionX + this.sizeWidth - 10, this.postionY - 5)
        this.ctx.lineTo(this.postionX + this.sizeWidth - 20, this.postionY)
        this.ctx.lineTo(this.postionX + this.sizeWidth + 1, this.postionY)
        this.ctx.lineTo(this.postionX + this.sizeWidth + 1, this.postionY - 5)
        this.ctx.fillStyle = '#000000'
        this.ctx.fill()
        this.ctx.closePath()

        // Rect left bottom
        this.ctx.beginPath()
        this.ctx.moveTo(this.postionX - 1, this.postionY + this.sizeHeight)
        this.ctx.lineTo(this.postionX + 20, this.postionY + this.sizeHeight)
        this.ctx.lineTo(this.postionX + 10, this.postionY + this.sizeHeight + 5)
        this.ctx.lineTo(this.postionX - 1, this.postionY + this.sizeHeight + 5)
        this.ctx.lineTo(this.postionX - 1, this.postionY + this.sizeHeight)
        this.ctx.fillStyle = '#000000'
        this.ctx.fill()
        this.ctx.closePath()

        // Rect right bottom
        this.ctx.beginPath()
        this.ctx.moveTo(this.postionX + this.sizeWidth - 10, this.postionY + this.sizeHeight)
        this.ctx.lineTo(this.postionX + this.sizeWidth - 20, this.postionY + this.sizeHeight)
        this.ctx.lineTo(this.postionX + this.sizeWidth - 10, this.postionY + this.sizeHeight + 5)
        this.ctx.lineTo(this.postionX + this.sizeWidth + 1, this.postionY + this.sizeHeight + 5)
        this.ctx.lineTo(this.postionX + this.sizeWidth + 1, this.postionY + this.sizeHeight)
        this.ctx.fillStyle = '#000000'
        this.ctx.fill()
        this.ctx.closePath()
    }
}