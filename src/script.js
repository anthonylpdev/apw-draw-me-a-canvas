import './style.scss'
import Particle from './js/Particle'
import Color from 'nice-color-palettes'
import imgBrush from '../assets/img/brush-02.png'
import gsap from 'gsap'

class Sketch {
  constructor() {
    this.setup()
  }

  setup() {
    this.time = window.performance.now()

    this.color = Color[this.randomRange(0, Color.length - 1)]

    this.canvas = document.getElementById('main')
    this.ctx = this.canvas.getContext('2d')
    this.WIDTH = window.innerWidth
    this.HEIGHT = window.innerHeight
    this.DPR = Math.max(devicePixelRatio, 2)
    this.canvas.width = this.WIDTH * this.DPR
    this.canvas.height = this.HEIGHT * this.DPR
    this.canvas.style.width = `${this.WIDTH}px`
    this.canvas.style.height = `${this.HEIGHT}px`
    this.ctx.scale(this.DPR, this.DPR)
    // this.ctx.globalAlpha = 0.4;
    this.ctx.imageSmoothingQuality = 'high'

    /* globalCompositeOperation :
  normal | multiply | screen | overlay |
  darken | lighten | color-dodge | color-burn | hard-light |
  soft-light | difference | exclusion | hue | saturation |
  color | luminosity
*/

    this.ctx.globalCompositeOperation = 'multiply'
    // this.ctx.direction = 'rtl';

    console.log(this.ctx)
    // this.ctx.lineWidth = 1

    // this.ctx.direction = 'ltr'
    // this.ctx.fillStyle = '#e6e1d3'
    // this.ctx.filter = 'none'
    // this.ctx.font = '10px sans-serif'
    // this.ctx.globalAlpha = 1
    // this.ctx.globalCompositeOperation = 'multiply'
    // this.ctx.imageSmoothingEnabled = true
    // this.ctx.imageSmoothingQuality = 'high'

    // this.ctx.lineCap = 'butt'
    // this.ctx.lineCap = 'round'
    // this.ctx.lineCap = 'square'

    // this.ctx.lineDashOffset = 0

    // this.ctx.lineJoin = 'miter'
    // this.ctx.lineJoin = 'bevel'
    // this.ctx.lineJoin = 'round'

    // this.ctx.lineWidth = 1
    // this.ctx.miterLimit = 10
    // this.ctx.shadowBlur = 0

    this.ctx.fillStyle = `rgba(255, 255, 255, 0.2)`
    this.ctx.filter = 'blur(16px)'
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT)

    this.mouse = {
      x: -1000,
      y: -1000,
    }

    this.brush = new Image()
    this.brush.onload = () => {
      this.animate()
    }
    this.brush.src = imgBrush

    this.part = new Particle(
        this.ctx,
        this.mouse.x,
        this.mouse.y,
        this.brush,
    )
    const clearCanvas = (ev) => {
      this.mouse.x = ev.clientX
      this.mouse.y = ev.clientY
    }
    const finishClearCanvas = () => {
      this.part.particleScale = 5
      this.mouse.x = 0
      this.mouse.y = -this.HEIGHT * 1.5
      const duration = 0.2

      gsap.timeline().to(this.mouse, {
        y: this.HEIGHT * 1.5,
        duration: duration,
      }).to(this.mouse, {
        x: this.WIDTH / 4,
        duration: 0,
      }).to(this.mouse, {
        y: 0,
        duration: duration,
      }).to(this.mouse, {
        x: this.WIDTH / 2,
        duration: 0,
      }).to(this.mouse, {
        y: this.HEIGHT * 1.5,
        duration: duration,
      }).to(this.mouse, {
        x: 3 * this.WIDTH / 4,
        duration: 0,
      }).to(this.mouse, {
        y: 0,
        duration: duration,
      }).to(this.mouse, {
        x: this.WIDTH,
        duration: 0,
      })
      .to(this.mouse, {
        x: -this.WIDTH / 2,
        y: this.HEIGHT / 2,
      }).to(this.mouse, {
        x: this.WIDTH,
        duration: duration,
      }).to(this.mouse, {
        x: 0,
        y: 0,
        duration: duration,
      }).to(this.mouse, {
        x: this.WIDTH,
        duration: duration,
        onComplete: () => {
          this.ctx.fillStyle = `rgba(255, 255, 255, 0.1)`
          this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT)
          this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT)
          window.cancelAnimationFrame(this.req);
        }
      }).play()
    }

    document.addEventListener('mousedown', (ev) => {
      document.addEventListener('mousemove', clearCanvas)
    })
    document.addEventListener('mouseup', (ev) => {
      document.removeEventListener('mousemove', clearCanvas)
      finishClearCanvas()
    })

  }

  animate(test) {
    this.time = test

    this.clear()

    this.part.animate(this.time, this.mouse)
    console.log('toto');

    this.req = requestAnimationFrame(this.animate.bind(this))
  }

  clear() {
    // this.ctx.fillStyle = `rgba(230, 225, 211, 0.1)`
    // this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT)

    // this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT)
  }

  randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

}

new Sketch()
