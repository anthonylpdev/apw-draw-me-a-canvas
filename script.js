import "./style.scss";

class Sketch {
  constructor() {
    this.setup();
    this.draw();
  }

  setup() {
    this.canvas = document.getElementById("main");
    this.ctx = this.canvas.getContext("2d");
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.DPR = Math.max(devicePixelRatio, 2);
    this.steps = 100;
    this.base = this.width / this.steps;
    this.canvas.width = this.width * this.DPR;
    this.canvas.height = this.height * this.DPR;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(this.DPR, this.DPR);

    this.ctx.lineWidth = 1;

    this.detail = 300;
    this.hblock = Math.floor(this.height / this.detail);
    this.vblock = Math.floor(this.width / 20);

    this.roadSize = this.vblock * 10;
    this.borderSize = this.vblock * 1;
    this.heading = 0;

    this.grassColor = "rgb(0,200,0)";
    this.roadColor = "rgb(50,50,50)";
    this.borderColor1 = "rgb(255,0,0)";
    this.borderColor2 = "rgb(255,255,255)";
    this.cloudColor = "rgba(255,255,255,0.5)";
    this.tireColor = "rgb(0,0,0)";
    this.carColor = "rgb(255,100,0)";

    this.mx = this.width / 2;
    this.my = this.height / 2;

    document.body.addEventListener("mousemove", (evt) => {
      this.mx = evt.clientX;
      this.my = evt.clientY;
      console.log(this.mx, this.my);
    });
  }

  draw() {
    this.oldTime = this.time;
    this.time = window.performance.now();
    this.delta = this.time - this.oldTime;

    // Draw Sky
    this.clear();

    // Draw clouds
    for (let c = 0; c < 8; c++) {
      var o = ((this.heading * -0.0001) % this.width) / 2;
      if (c % 2 == 0) {
        this.cloud(((c - 1.8) * this.width) / 4 + o, (0.8 * this.width) / 4);
      } else {
        this.cloud(((c - 1.8) * this.width) / 4 + o, (0.5 * this.width) / 4);
      }
    }

    // Draw road
    for (let l = 0; l < this.detail / 2; l++) {
      this.line(l, this.width / 2);
    }

    // Draw car
    this.ctx.fillStyle = this.tireColor;
    this.ctx.fillRect(this.width / 2 - 50, this.height - 150, 20, 30);
    this.ctx.fillRect(this.width / 2 + 30, this.height - 150, 20, 30);
    this.ctx.fillStyle = this.carColor;
    this.ctx.fillRect(this.width / 2 - 30, this.height - 140, 60, 60);
    this.ctx.fillRect(this.width / 2 - 40, this.height - 100, 80, 70);
    this.ctx.fillStyle = this.tireColor;
    this.ctx.fillRect(this.width / 2 - 70, this.height - 50, 30, 40);
    this.ctx.fillRect(this.width / 2 + 40, this.height - 50, 30, 40);

    requestAnimationFrame(this.draw.bind(this));
  }

  cloud(x, y) {
    this.ctx.fillStyle = this.cloudColor;

    this.ctx.fillRect(25 + x, 0 + y, 200, 100);
    this.ctx.fillRect(50 + x, 50 + y, 200, 100);
    this.ctx.fillRect(0 + x, 25 + y, 200, 100);
  }

  map(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  }

  line(l, road) {
    var d = 1 - l / (this.detail * 0.5);
    var p = this.map(d, 0, 1, 0.02, 1);

    var t = 0.5 * (this.mx - this.width * 0.5);
    this.heading += t;
    t = t * Math.pow(1 - d, 5);

    this.hblock = Math.floor(this.height / this.detail);
    this.hblock *= this.map(this.my, 0, this.height, 1.3, 0.7);

    // Grass
    this.ctx.fillStyle = this.grassColor;
    this.ctx.fillRect(
      0,
      this.height - (l + 1) * this.hblock,
      this.width,
      this.hblock
    );

    // Border
    if (Math.sin(Math.pow(1 - d, 3) * 50 + this.time * 0.035) > 0) {
      this.ctx.fillStyle = this.borderColor1;
    } else {
      this.ctx.fillStyle = this.borderColor2;
    }
    this.ctx.fillRect(
      this.width * 0.5 - (road * 0.5 + this.borderSize) * p + t,
      this.height - (l + 1) * this.hblock,
      p * (this.borderSize * 2 + this.roadSize),
      this.hblock
    );

    // Road
    this.ctx.fillStyle = this.roadColor;
    this.ctx.fillRect(
      this.width * 0.5 - road * 0.5 * p + t,
      this.height - (l + 1) * this.hblock,
      this.roadSize * p,
      this.hblock + 0.5
    );
  }

  clear() {
    this.ctx.fillStyle = "rgb(50,150,250)";
    //this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}

new Sketch();
