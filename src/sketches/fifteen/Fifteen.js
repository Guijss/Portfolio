import Sketch from 'react-p5';
import Cell from './cell';

let grid = [];
let win;
const Fifteen = () => {
  const setup = (p5, canvasParentRef) => {
    const w = canvasParentRef.clientWidth;
    const h = canvasParentRef.clientHeight;
    p5.createCanvas(w, h).parent(canvasParentRef);
    const size = p5.width / 5.5;
    const spacing = 1.2;
    const gap = p5.width - size * 4 - (size * spacing - size) * 3;
    for (let i = 0; i < 16; i++) {
      grid.push(
        new Cell(
          p5,
          i,
          spacing * size * (i % 4) + gap / 2,
          spacing * size * p5.floor(i / 4) + gap / 2,
          size,
          i === 15
        )
      );
    }
    scramble(p5, grid[15]);
  };

  const draw = (p5) => {
    p5.clear();
    win = true;
    for (let i = 0; i < grid.length; i++) {
      grid[i].render();
      if (grid[i].t !== i) {
        win = false;
      }
    }
    if (win) {
      p5.stroke(32, 56, 42);
      p5.noLoop();
    } else {
      p5.stroke(32, 35, 42);
    }
    p5.noFill();
    p5.rect(10, 10, p5.width - 20, p5.height - 20, 20);
  };

  const mousePressed = (p5) => {
    for (const c of grid) {
      if (
        p5.mouseX > c.x &&
        p5.mouseX < c.x + c.s &&
        p5.mouseY > c.y &&
        p5.mouseY < c.y + c.s
      ) {
        const move = checkMove(p5, c);
        if (move !== undefined) {
          makeMove(c, move);
        }
      }
    }
  };

  const checkMove = (p5, cell) => {
    const i = cell.i;
    //right
    if (i % 4 < 3) {
      if (grid[i + 1].b) {
        return grid[i + 1];
      }
    }
    //down
    if (p5.floor(i / 4) < 3) {
      if (grid[i + 4].b) {
        return grid[i + 4];
      }
    }
    //left
    if (i % 4 > 0) {
      if (grid[i - 1].b) {
        return grid[i - 1];
      }
    }
    //up
    if (p5.floor(i / 4) > 0) {
      if (grid[i - 4].b) {
        return grid[i - 4];
      }
    }
    return undefined;
  };

  const makeMove = (curr, move) => {
    const x = curr.x;
    const y = curr.y;
    const i = curr.i;
    const cIndex = grid.indexOf(curr);
    const mIndex = grid.indexOf(move);
    const swap = grid[cIndex];
    grid[cIndex] = grid[mIndex];
    grid[mIndex] = swap;
    curr.x = move.x;
    curr.y = move.y;
    curr.i = move.i;
    move.x = x;
    move.y = y;
    move.i = i;
  };

  const scramble = (p5, blankCell) => {
    let blank = blankCell;
    let moves = [];
    let pick;
    for (let i = 0; i < 50; i++) {
      if (blank.i % 4 < 3) {
        if (grid[blank.i + 1] !== pick) {
          moves.push(grid[blank.i + 1]);
        }
      }
      if (p5.floor(blank.i / 4) < 3) {
        if (grid[blank.i + 4] !== pick) {
          moves.push(grid[blank.i + 4]);
        }
      }
      if (blank.i % 4 > 0) {
        if (grid[blank.i - 1] !== pick) {
          moves.push(grid[blank.i - 1]);
        }
      }
      if (p5.floor(blank.i / 4) > 0) {
        if (grid[blank.i - 4] !== pick) {
          moves.push(grid[blank.i - 4]);
        }
      }
      pick = p5.random(moves);
      makeMove(pick, blank);
      moves = [];
    }
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default Fifteen;
