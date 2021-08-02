export default class Hexagon {
    constructor(ctx, size, x, y, text) {
        this.ctx = ctx
        this.size = size
        this.x = x
        this.y = y
        this.text = text
        this.drawHegagone()
    }

    drawHegagone() {
        this.side = 0
        this.side2 = 0
        this.side3 = 0
        this.side4 = 0
        this.ctx.lineWidth = 1

        this.ctx.strokeStyle = 'rgb(119,119,119)'
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + (this.size / 1.7) * Math.sin(0), this.y + (this.size / 1.7) * Math.cos(0));

        for (this.side; this.side < 7; this.side++) {
            this.ctx.lineTo(this.x + (this.size / 1.7) * Math.sin(this.side * 2 * Math.PI / 6), this.y + (this.size / 1.7) * Math.cos(this.side * 2 * Math.PI / 6));
        }
        this.ctx.stroke();
        this.ctx.closePath()

        this.ctx.strokeStyle = 'rgb(86,86,86)'
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + (this.size / 1.3) * Math.sin(0), this.y + (this.size / 1.3) * Math.cos(0));

        for (this.side2; this.side2 < 7; this.side2++) {
            this.ctx.lineTo(this.x + (this.size / 1.3) * Math.sin(this.side2 * 2 * Math.PI / 6), this.y + (this.size / 1.3) * Math.cos(this.side2 * 2 * Math.PI / 6));
        }
        this.ctx.stroke();
        this.ctx.closePath()

        this.ctx.beginPath();
        this.ctx.moveTo(this.x + this.size * Math.sin(0), this.y + this.size * Math.cos(0));

        for (this.side3; this.side3 < 7; this.side3++) {
            this.ctx.lineTo(this.x + this.size * Math.sin(this.side3 * 2 * Math.PI / 6), this.y + this.size * Math.cos(this.side3 * 2 * Math.PI / 6));
        }
        this.ctx.stroke();
        this.ctx.closePath()

        this.ctx.fillText(this.text, this.x - 20 , this.y + 5)

        this.ctx.lineWidth = 3
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + (this.size / 1.3) * Math.sin(0), this.y + (this.size / 1.3) * Math.cos(0));

        for (this.side4; this.side4 < 7; this.side4++) {
            this.ctx.lineTo(this.x + (this.size / 1.3) * Math.sin(this.side4 * 2 * Math.PI / 6), this.y + (this.size / 1.3) * Math.cos(this.side4 * 2 * Math.PI / 6));
        }
        this.ctx.stroke();
        this.ctx.closePath()
    }
}