import Sketch from 'react-p5';
import Cell from './cell';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { Reset } from '../../components/commonStyledComponents';

let grid;
let win;
let p;
const LightsOut = () => {
  const setup = (p5, canvasParentRef) => {
    p = p5;
    const w = canvasParentRef.clientWidth;
    const h = canvasParentRef.clientHeight;
    p5.createCanvas(w, h).parent(canvasParentRef);
    reset();
  };

  const draw = (p5) => {
    p5.clear();
    win = true;
    for (let j = 0; j < grid.length; j++) {
      for (let i = 0; i < grid[j].length; i++) {
        grid[i][j].render();
        if (!grid[i][j].e) {
          win = false;
        }
      }
    }
    if (win) {
      p5.stroke(120, 135, 180);
      p5.noLoop();
    } else {
      p5.stroke(32, 35, 42);
    }
    p5.noFill();
    p5.strokeWeight(4);
    p5.rect(10, 10, p5.width - 20, p5.height - 20, 20);
  };

  const reset = () => {
    const size = p.width / 6.7;
    const spacing = 1.2;
    const gap = p.width - size * 5 - (size * spacing - size) * 4;
    grid = make2dArr(5, 5);
    let scrambleArr = [];
    for (let j = 0; j < grid.length; j++) {
      for (let i = 0; i < grid[j].length; i++) {
        grid[i][j] = new Cell(
          p,
          i,
          j,
          spacing * size * i + gap / 2,
          spacing * size * j + gap / 2,
          size
        );
        scrambleArr.push(grid[i][j]);
      }
    }
    scramble(p, scrambleArr);
    if (win) {
      p.loop();
    }
  };

  const mousePressed = (p5) => {
    for (let j = 0; j < grid.length; j++) {
      for (let i = 0; i < grid[j].length; i++) {
        if (
          p5.mouseX > grid[i][j].x &&
          p5.mouseX < grid[i][j].x + grid[i][j].s &&
          p5.mouseY > grid[i][j].y &&
          p5.mouseY < grid[i][j].y + grid[i][j].s
        ) {
          switchCells(grid[i][j]);
        }
      }
    }
  };

  const switchCells = (cell) => {
    const i = cell.i;
    const j = cell.j;
    cell.e = !cell.e;
    //right cell
    if (i < 4) {
      grid[i + 1][j].e = !grid[i + 1][j].e;
    }
    //left cell
    if (i > 0) {
      grid[i - 1][j].e = !grid[i - 1][j].e;
    }
    //bottom cell
    if (j < 4) {
      grid[i][j + 1].e = !grid[i][j + 1].e;
    }
    //upper cell
    if (j > 0) {
      grid[i][j - 1].e = !grid[i][j - 1].e;
    }
  };

  const scramble = (p5, arr) => {
    for (let i = 0; i < 5; i++) {
      const cell = p5.random(arr);
      switchCells(cell);
      arr.splice(arr.indexOf(cell), 1);
    }
  };

  const make2dArr = (c, r) => {
    let arr = new Array(c);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(r);
    }
    return arr;
  };

  return (
    <>
      <Reset onClick={reset}>
        <BsArrowCounterclockwise size={30} color="rgb(70, 71, 76)" />
      </Reset>
      <Sketch
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        style={{
          position: 'relative',
          width: '400px',
          height: '400px',
        }}
      />
    </>
  );
};

export default LightsOut;
