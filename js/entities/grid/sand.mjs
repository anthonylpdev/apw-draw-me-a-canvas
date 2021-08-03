import Grid from '../grid.mjs';

const particuleColor = new Map();
particuleColor.set('sand', '#c2b280');
particuleColor.set('water', '#2389DA');
particuleColor.set('wall', 'grey');


export default class extends Grid {

  drawEntity(ctx) {
    const halfSize = this.contentSize / 2;
    for (const entity of this) {
      ctx.fillStyle = particuleColor.get(entity.particule);
      ctx.fillRect(entity.pos.x - halfSize, entity.pos.y  - halfSize, this.contentSize, this.contentSize);
    }
  }

  update() {
    this.copy = this.getNewMatrix();
    for (const entity of this) {
      this.copy[entity.x][entity.y] = entity.particule;
    }
    for (const entity of this) {
     if (entity.particule === 'sand') {
      this.updateSand(entity);
     } else if (entity.particule === 'water') {
      this.updateWater(entity);
     }
    }
    this.grid = this.copy;
  }

  updateSand(entity) {
    let nextPos = null;
    let below = this.getEntityAt({x: entity.x, y: entity.y - 1});
    let belowLeft = this.getEntityAt({x: entity.x - 1, y: entity.y - 1});
    let belowRight = this.getEntityAt({x: entity.x + 1, y: entity.y - 1});
    if (!below || below === "water") {
      nextPos = {x: entity.x, y: entity.y - 1};
    } else if ((!belowLeft || belowLeft === "water") && (!belowRight || belowRight === "water")) {
      nextPos = {x: entity.x + (Math.random() < 0.5 ? 1 : -1), y: entity.y - 1};
    } else if (!belowLeft || belowLeft === "water") {
      nextPos = {x: entity.x - 1, y: entity.y - 1};
    } else if (!belowRight || belowRight === "water") {
      nextPos = {x: entity.x + 1, y: entity.y - 1};
    }
    if (nextPos && this.isValidPos(nextPos)) {
      let entityAtNextPos = this.getEntityAt(nextPos);
      this.setEntityAt({entity: entity.particule, x: nextPos.x, y: nextPos.y, grid: this.copy});
      this.removeEntityAt({x: entity.x, y: entity.y, grid: this.copy});
      if (entityAtNextPos === "water") {
        //todo splashing effect
      }
    }
  }

  updateWater(entity) {
    let nextPos = null;
    let below = this.getEntityAt({x: entity.x, y: entity.y - 1, grid: this.copy});
    let belowLeft = this.getEntityAt({x: entity.x - 1, y: entity.y - 1, grid: this.copy});
    let belowRight = this.getEntityAt({x: entity.x + 1, y: entity.y - 1, grid: this.copy});
    let left = this.getEntityAt({x: entity.x - 1, y: entity.y, grid: this.copy});
    let right = this.getEntityAt({x: entity.x + 1, y: entity.y, grid: this.copy});

    if (!below) {
      nextPos = {x: entity.x, y: entity.y - 1};
    } else if (!belowLeft && !belowRight) {
      nextPos = {x: entity.x + (Math.random() < 0.5 ? 1 : -1), y: entity.y - 1};
    } else if (!belowLeft) {
      nextPos = {x: entity.x - 1, y: entity.y - 1};
    } else if (!belowRight) {
      nextPos = {x: entity.x + 1, y: entity.y - 1};
    } else if (!left && !right) {
      nextPos = {x: entity.x + (Math.random() < 0.5 ? 1 : -1), y: entity.y};
    } else if (!left) {
      nextPos = {x: entity.x - 1, y: entity.y};
    } else if (!right) {
      nextPos = {x: entity.x + 1, y: entity.y};
    }
    if (nextPos && this.isValidPos(nextPos)) {
      this.setEntityAt({entity: entity.particule, x: nextPos.x, y: nextPos.y, grid: this.copy});
      this.removeEntityAt({x: entity.x, y: entity.y, grid: this.copy});
    }
  }

}