// Minimalist Canvas manager
export default class {

  constructor({draw = () => 0, blurryRedraw = false, shadowColor = 'black'} = {}) {
    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    this.ctx = canvas.getContext('2d');
    this.ctx.canvas.width = this.ctx.canvas.clientWidth;
    this.ctx.canvas.height = this.ctx.canvas.clientHeight;
    this.callbackDraw = draw;
    this.blurryRedraw = blurryRedraw;
    this.shadowColor = shadowColor;
  }

  getDimension() {
    return {width: this.ctx.canvas.width, height: this.ctx.canvas.height};
  }

  get() {
    return this.ctx.canvas;
  }

  getCtx() {
    return this.ctx;
  }

  setDraw(draw) {
    this.callbackDraw = draw;
  }

  draw() {
    this.callbackDraw(this.ctx);
  }

  redraw() {
    this.ctx.shadowBlur = this.blurryRedraw * 10;
    this.ctx.shadowColor = this.shadowColor;
    this.ctx.fillStyle = `rgba(255,255,255,${this.blurryRedraw || 1})`;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.draw();
  }

}