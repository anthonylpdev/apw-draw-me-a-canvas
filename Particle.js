
export default class Particle {
  constructor(ctx, x, y, radius, color) {

    this.position = {x, y}
    this.radius = radius
    this.ctx = ctx
    this.range = this.randomRange(10, 50)
    this.color = color[this.randomRange(0, color.length - 1)]

  }

  draw(time, mouse) {
    this.ctx.beginPath()
    this.ctx.arc(
        mouse.x  + Math.cos(time / 100) * this.range * 5,
        mouse.y  + Math.sin(time / 100) * this.range * 5,
        this.radius,
        0,
        Math.PI * 2,
    )
    this.ctx.fillStyle = this.color
    this.ctx.fill()
  }

  animate(time, mouse) {
    this.draw(time, mouse)
  }

  randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

}
