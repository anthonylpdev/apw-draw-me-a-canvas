
export default class Particle {
  constructor(ctx, x, y, radius, color, brush) {

    this.position = {x, y}
    this.radius = radius
    this.ctx = ctx
    this.range = this.randomRange(10, 50)
    this.color = color[this.randomRange(0, color.length - 1)]
    this.brush = brush

  }

  draw(time, mouse) {


    this.ctx.save();

    // https://stackoverflow.com/questions/3088229/clear-pixels-under-a-shape-in-html-canvas
    // https://www.w3schools.com/tags/canvas_globalcompositeoperation.asp

    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0,0,0,0)';
    //draw shape to cover up stuff underneath
    // this.ctx.fill();

    this.ctx.beginPath()
    /*this.ctx.arc(
        mouse.x  + Math.cos(time / 100) * this.range * 5,
        mouse.y  + Math.sin(time / 100) * this.range * 5,
        this.radius,
        0,
        Math.PI * 2,
    )
    this.ctx.fillStyle = this.color*/

    this.ctx.drawImage(this.brush, mouse.x - this.brush.width, mouse.y - this.brush.height);

    this.ctx.fill()
    this.ctx.restore();

  }

  animate(time, mouse) {
    this.draw(time, mouse)
  }

  randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

}
