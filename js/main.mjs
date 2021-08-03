import Canvas from './utils/canvas.mjs';
import MainLoop from './utils/mainloop.mjs';
import Grid from './entities/grid/sand.mjs';

const canvas = new Canvas({blurryRedraw: 0.4});
const grid = new Grid({ctx: canvas.getCtx(), cellsize: 6, padding: 0, mustDrawGrid: false});

canvas.setDraw((ctx) => grid.draw(ctx));

const mainloop = new MainLoop({
  update: (dt, elapsedTime) => {
    grid.update(dt, elapsedTime)
    if (!clickIsActive) return;
    grid.setEntityAt({entity, ...mouseCoord});
  },
  draw: () => canvas.redraw()
});


let clickIsActive;
let mouseCoord;
let entity = '';
function manageMouse(evt) {
  let coord = grid.getCoordFromPos({x: evt.clientX, y: evt.clientY});
  if (!coord) return;
  mouseCoord = coord;
  entity = 'sand';
  if (evt.shiftKey) entity = 'wall';
  if (evt.ctrlKey) entity = 'water';
}

document.body.addEventListener('mousedown', evt => {
  clickIsActive = true;
  manageMouse(evt);
});
document.body.addEventListener('mouseup', evt => clickIsActive = false);
document.body.addEventListener('mousemove', evt => manageMouse(evt));

mainloop.start();