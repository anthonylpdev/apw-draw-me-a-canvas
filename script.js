import './style.scss'

class Sketch {
  constructor() {
    this.setup()
    this.draw()
  }

  setup() {
    this.canvas = document.getElementById('main')
    this.ctx = this.canvas.getContext('2d')
    this.WIDTH = window.innerWidth
    this.HEIGHT = window.innerHeight
    this.DPR = Math.max(devicePixelRatio, 2)
    this.steps = 100
    this.base = this.WIDTH / this.steps
    this.canvas.width = this.WIDTH * this.DPR
    this.canvas.height = this.HEIGHT * this.DPR
    this.canvas.style.width = `${this.WIDTH}px`
    this.canvas.style.height = `${this.HEIGHT}px`
    this.ctx.scale(this.DPR, this.DPR)

    this.ctx.lineWidth = 1
    console.log('foo')
  }

  draw() {
    this.time = window.performance.now()

    this.clear()

    this.ctx.beginPath()
    const linesNb = 10;
    for (let indexLine = 0; indexLine < linesNb; indexLine++) {
      this.ctx.moveTo(0, this.HEIGHT / 2)
      this.ctx.strokeStyle = `hsla(${(indexLine + 1) / linesNb * 360}, 50%, 50%, .5)`
      for (let indexDraw = 0; indexDraw < this.steps; indexDraw++) {
        let factor = Math.sin(indexDraw * 0.08 + this.time * 0.0001)
        this.ctx.lineTo(this.base * indexDraw, this.HEIGHT / 2 + factor * 100 + indexLine * 10)
      }
      this.ctx.stroke()
    }


    requestAnimationFrame(this.draw.bind(this))
  }

  clear() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT)
  }


}

new Sketch()
