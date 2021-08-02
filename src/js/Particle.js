
export default class Particle {
  constructor(ctx, x, y, brush) {

    this.position = {x, y}
    this.ctx = ctx
    this.range = this.randomRange(10, 50)
    this.brush = brush
    this.particleScale = 1.5
    this.disabled = false;

  }

  draw(time, mouse) {


    this.ctx.save();

    // https://stackoverflow.com/questions/3088229/clear-pixels-under-a-shape-in-html-canvas
    // https://www.w3schools.com/tags/canvas_globalcompositeoperation.asp

    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0,0,0,0)';

    this.ctx.beginPath()

    this.ctx.drawImage(
        this.brush,
        mouse.x - this.brush.width,
        mouse.y - this.brush.height,
        this.brush.width * this.particleScale,
        this.brush.height * this.particleScale
    );

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
