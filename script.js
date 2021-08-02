import Frame from "./Frame";

class Sketch {
    constructor() {
        this.setup()
        this.mouse()
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
    }

    mouse() {
        this.canvas.addEventListener("mousemove", (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    draw() {
        this.clear()
        this.time = window.performance.now()
        this.drawBigOrbit()
        this.drawImg()
        this.drawGrid()
        this.drawSmallOrbit()
        this.drawCross()
        this.drawName()
        this.drawIceDetected()
        this.drawInfoFrame()
        this.drawGraphFrame()
        this.drawPolygone()
        this.drawCoords()
        requestAnimationFrame(this.draw.bind(this))
    }

    drawBigOrbit() {
        //Big orbit
        this.ctx.beginPath();
        this.ctx.lineWidth = 1
        this.ctx.ellipse(0, this.HEIGHT, this.WIDTH * 2, 850, 25 * Math.PI / 180, 0, 2 * Math.PI)
        this.ctx.strokeStyle = 'rgba(134,134,134,0.5)'
        this.ctx.setLineDash([10, 15])
        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawImg() {
        this.img = document.getElementById("pluto")
        this.img.size = 500
        this.ctx.drawImage(this.img, (this.WIDTH - this.img.size) / 2, (this.HEIGHT - this.img.size) / 2, this.img.size, this.img.size)

        new Frame(this.ctx, this.WIDTH - 350, 50, 300, 200)
        this.imgZone = document.getElementById("plutoZone")
        this.imgZone.size = 150
        this.ctx.drawImage(this.imgZone, this.WIDTH - (this.imgZone.size + 200), 50, this.imgZone.size + 150, this.imgZone.size + 50)
    }

    drawGrid() {
        this.step = 20
        this.ctx.beginPath();
        for (let x = 0; x <= this.WIDTH; x += this.step) {
            this.ctx.moveTo(x, 0)
            this.ctx.lineTo(x, this.HEIGHT)
        }
        this.ctx.strokeStyle = 'rgba(162,162,162,0.5)'
        this.ctx.lineWidth = 1
        this.ctx.setLineDash([1, 19])
        this.ctx.stroke()
        for (let y = 0; y <= this.HEIGHT; y += this.step) {
            this.ctx.moveTo(0, y)
            this.ctx.lineTo(this.WIDTH, y)
        }
        this.ctx.strokeStyle = 'rgba(162,162,162,0.5)'
        this.ctx.lineWidth = 1
        this.ctx.stroke()
    }

    drawSmallOrbit() {
        // Small orbit
        this.ctx.beginPath();
        this.ctx.ellipse(this.WIDTH / 2, this.HEIGHT / 2, (this.img.size / 2) + 50, 75, Math.PI / 10, Math.PI * 0.81, 1.80 * Math.PI)
        this.ctx.strokeStyle = 'rgb(0,0,0)'
        this.ctx.setLineDash([5, 5])
        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawCross() {
        this.ctx.beginPath()
        this.ctx.moveTo(650, 250)
        this.ctx.lineTo(650, 300)
        this.ctx.moveTo(625, 275)
        this.ctx.lineTo(675, 275)
        this.ctx.strokeStyle = 'rgba(128,128,128,0.5)'
        this.ctx.setLineDash([0, 0])
        this.ctx.stroke()
    }

    drawName() {
        this.sizeWidth = 150
        this.sizeHeight = 40
        this.ctx.beginPath()
        this.ctx.fillStyle = 'rgba(0,0,0,1)'
        this.ctx.fillRect(this.WIDTH - this.sizeWidth - 10, this.HEIGHT - this.sizeHeight - 10, this.sizeWidth, this.sizeHeight)
        this.ctx.font = "30px Orbitron"
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillText("PLUTO", this.WIDTH - this.sizeWidth - 5, this.HEIGHT - 20)
        this.ctx.closePath()
    }

    drawIceDetected() {
        this.sizeWidth = 150
        this.sizeWidth += 5 * Math.sin(this.time / 1000)
        this.sizeHeight = 35
        this.sizeHeight += 5 * Math.sin(this.time / 1000)
        this.positionRight = 550
        this.positionTop = 200
        this.ctx.beginPath()
        this.ctx.fillStyle = 'rgba(0,0,0,0.8)'
        this.ctx.strokeStyle = 'rgba(128,128,128,1)'
        this.ctx.lineWidth = 2
        this.ctx.fillRect(this.WIDTH - this.sizeWidth - this.positionRight, this.positionTop, this.sizeWidth, this.sizeHeight)
        this.ctx.moveTo(this.WIDTH / 2, this.HEIGHT / 2 - 120)
        this.ctx.lineTo(this.WIDTH - this.sizeWidth - this.positionRight, this.positionTop + 1)
        this.ctx.stroke()
        this.fontSize = 0.5 * Math.sin(this.time / 1000) + 19
        this.ctx.font = `${this.fontSize}px Orbitron`
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillText("Ice detected", (this.WIDTH - this.sizeWidth - this.positionRight) + 10, (this.positionTop + this.sizeHeight) - ((this.sizeHeight / 2) - this.fontSize / 3))
        this.ctx.closePath()
    }

    drawInfoFrame() {
        new Frame(this.ctx, 50, 50, 300, 450)

        this.ctx.font = `18px Orbitron`
        this.ctx.fillText('Physical characteristics', 75, 100)
        this.ctx.font = `14px Montserrat`
        this.ctx.fillText('Dimensions', 65, 150)
        this.ctx.fillText('2,376.6 ± 1.6 km', 200, 150)
        this.ctx.fillText('Mass', 65, 190)
        this.ctx.fillText('(1.303 ± 0.003)', 200, 190)
        this.ctx.fillText('×1022 kg', 200, 210)
        this.ctx.fillText('Surface pressure', 65, 250)
        this.ctx.fillText('1.0 Pa', 200, 250)
        this.ctx.fillText('Composition', 65, 290)
        this.ctx.fillText('Nitrogen, methane,', 200, 290)
        this.ctx.fillText('carbon monoxide', 200, 310)
        this.ctx.fillText('Surface temp', 65, 350)
        this.ctx.fillText('44K', 200, 350)
        this.ctx.fillText('Surface gravity', 65, 390)
        this.ctx.fillText('0.063 g / 0.620 m/s', 200, 390)
        this.ctx.fillText('Rotation period', 65, 430)
        this.ctx.fillText('−6 d, 9 h, 17 m, 00 s', 200, 430)
    }

    drawGraphFrame() {
        new Frame(this.ctx, 50, 600, 550, 300)
        this.ctx.font = `18px Orbitron`
        this.ctx.fillText('Scan in progress...', 65, 640)

        this.curveWidthY0 = 745
        this.curveWidthY0 += 20 * Math.cos(this.time / 1000)
        this.curveWidthX1 = 300
        this.curveWidthX1 += 100 * Math.sin(this.time / 1000)
        this.curveWidthY1 = 200
        this.curveWidthY1 += 100 * Math.sin(this.time / 1000)
        this.curveWidthY2 = 750
        this.curveWidthY2 += 100 * Math.sin(this.time / 1000)
        this.ctx.beginPath()
        this.ctx.moveTo(50, this.curveWidthY0);
        this.ctx.bezierCurveTo(this.curveWidthX1, 730, this.curveWidthY1, this.curveWidthY2, 600, 750);
        this.ctx.stroke()
        this.ctx.closePath();

        this.ctx.strokeStyle = 'rgb(183,183,183)'
        this.curveWidthY0 = 750
        this.curveWidthY0 += 10 * Math.cos(this.time / 1000)
        this.curveWidthX1 = 500
        this.curveWidthX1 += 100 * Math.cos(this.time / 1000)
        this.curveWidthY1 = 600
        this.curveWidthY1 += 50 * Math.cos(this.time / 1000)
        this.curveWidthY2 = 300
        this.curveWidthY2 += 50 * Math.cos(this.time / 1000)
        this.curveWidthY3 = 900
        this.curveWidthY3 += 50 * Math.cos(this.time / 1000)
        this.ctx.beginPath()
        this.ctx.moveTo(50, this.curveWidthY0);
        this.ctx.bezierCurveTo(this.curveWidthX1, this.curveWidthY1, this.curveWidthY2, this.curveWidthY3, 600, 750);
        this.ctx.stroke()
        this.ctx.closePath();
    }

    drawPolygone() {
        new Hexagon(this.ctx, 70, this.WIDTH - 500, this.y = 400, '80%')
        new Hexagon(this.ctx, 70, this.WIDTH - 350, this.y = 350, '62%')
        new Hexagon(this.ctx, 70, this.WIDTH - 200, this.y = 400, '39%')
    }

    drawCoords() {
        this.ctx.beginPath()
        this.ctx.lineWidth = 1
        this.ctx.moveTo(this.mouse.x, 0)
        this.ctx.lineTo(this.mouse.x, this.HEIGHT)
        this.ctx.moveTo(0, this.mouse.y)
        this.ctx.lineTo(this.WIDTH, this.mouse.y)
        this.ctx.strokeStyle = 'rgb(0,0,0)'
        this.ctx.setLineDash([0, 0])
        this.ctx.stroke()
        this.ctx.closePath()

        this.stepCoords = 100
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgb(0,0,0)'
        this.ctx.fillStyle = 'rgba(0,0,0,0.5)'
        this.ctx.font = `12px Orbitron`
        for (let x = 0; x <= this.WIDTH; x += this.stepCoords) {
            this.ctx.moveTo(x, this.mouse.y - 5)
            this.ctx.lineTo(x, this.mouse.y)
            this.ctx.fillText(this.mouse.x + x, x, this.mouse.y - 10)
        }
        for (let y = 0; y <= this.HEIGHT; y += this.stepCoords) {
            this.ctx.moveTo(this.mouse.x - 5, y)
            this.ctx.lineTo(this.mouse.x, y)
            this.ctx.fillText(this.mouse.y + y, this.mouse.x + 10, y)
        }
        this.ctx.lineWidth = 2
        this.ctx.setLineDash([10, 19])
        this.ctx.stroke()
    }


    clear() {
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT)
    }
}

import './style.scss'
import Hexagon from "./Hexagon";

new Sketch()
