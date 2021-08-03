

export default class {

  constructor ({ctx, cellsize, color = '#ccc', padding = 1, mustDrawGrid = true}) {
    this.cellsize = cellsize;
    this.ctx = ctx;
    this.rows = Math.floor(this.ctx.canvas.height / cellsize);
    this.cols = Math.floor(this.ctx.canvas.width / cellsize);
    if (!(this.rows % 2)) this.rows--;
    if (!(this.cols % 2)) this.cols--;
    this.height = this.rows * this.cellsize;
    this.width = this.cols * this.cellsize;
    this.color = color;
    this.padding = padding;
    this.contentSize = this.cellsize - this.padding * 2;
    this.grid = this.getNewMatrix();
    this.mustDrawGrid = mustDrawGrid;
    this.genPath();
  }

  getNewMatrix() {
    const halfRows = Math.floor(this.rows / 2);
    const halfCols = Math.floor(this.cols / 2);
    let matrix = [];
    for (let x = -halfCols; x <= halfCols; x++) {
      matrix[x] = [];
      for (let y = -halfRows; y <= halfRows; y++) {
        matrix[x][y] = false;
      }
    }
    return matrix;
  }

  setEntityAt({entity, x = 0, y = 0, grid = this.grid}) {
    grid[x][y] = entity;
  }

  getEntityAt({x = 0, y = 0, grid = this.grid}) {
    return this.isValidPos({x, y}) ? grid[x][y] : null;
  }

  removeEntityAt({x = 0, y = 0, grid = this.grid}) {
    grid[x][y] = false;
  }

  genPath() {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    this.path = new Path2D();
    for (let row = 0; row <= this.rows; row++) {
      this.path.moveTo(-halfWidth, row * this.cellsize - halfHeight);
      this.path.lineTo(halfWidth, row * this.cellsize - halfHeight);
    }
    for (let col = 0; col <= this.cols; col++) {
      this.path.moveTo(col * this.cellsize - halfWidth, -halfHeight);
      this.path.lineTo(col * this.cellsize - halfWidth, halfHeight);
    }
  }

  getPosFromCoord({x = 0, y = 0}) {
    return {x: x * this.cellsize + this.ctx.canvas.width / 2, y: y * -this.cellsize + this.ctx.canvas.height / 2};
  }

  getCoordFromPos({x = 0, y = 0}) {
    x = Math.round((x - this.ctx.canvas.width / 2) / this.cellsize);
    y = -1 * Math.round((y - this.ctx.canvas.height / 2) / this.cellsize);
    if (!this.isValidPos({x, y})) return false;
    return {x, y};
  }

  getContentSize() {
    return this.contentSize;
  }

  isValidPos({x, y}) {
    if (typeof this.grid[x] === 'undefined') return false;
    if (typeof this.grid[x][y] === 'undefined') return false;
    return true;
  }

  update(dt, elapsedTime) {
    for (const col of this.grid) {
      for (const entity of col) {
        if (entity !== false) {
          entity.update(dt, elapsedTime);
        }
      }
    }
  }

  draw(ctx) {
    if (this.mustDrawGrid) this.drawGrid(ctx);
    this.drawEntity(ctx);
  }

  drawEntity(ctx) {
    for (const col of this.grid) {
      for (const entity of col) {
        if (entity !== false) {
          entity.draw(ctx);
        }
      }
    }
  }

  drawGrid(ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 0.5;
    ctx.setTransform(1, 0, 0, 1, ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.stroke(this.path);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  *entities() {
    const halfRows = Math.floor(this.rows / 2);
    const halfCols = Math.floor(this.cols / 2);
    for (let x = -halfCols; x <= halfCols; x++) {
      for (let y = -halfRows; y <= halfRows; y++) {
        let particule = this.getEntityAt({x, y});
        if (!particule) continue;
        let pos = this.getPosFromCoord({x, y});
        yield {particule, pos, x, y};
      }
    }
  }

  [Symbol.iterator]() {
    return this.entities();
  }

}