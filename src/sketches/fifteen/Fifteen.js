import Sketch from 'react-p5';
import Cell from './cell';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { Reset } from '../../components/commonStyledComponents';

let grid = [];
let win;
let p;
const Fifteen = (props) => {
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
    for (let i = 0; i < grid.length; i++) {
      grid[i].render((props) => (props.mainPage ? props.contrast : 1));
      if (grid[i].t !== i) {
        win = false;
      }
    }
    const lowerContrast = props.mainPage
      ? p5.map(props.contrast, 1, 3, 1, 1.5)
      : 1;
    if (win) {
      p5.stroke(120, 135, 180);
      p5.noLoop();
    } else {
      p5.stroke(32 * lowerContrast, 35 * lowerContrast, 42 * lowerContrast);
    }
    p5.noFill();
    p5.strokeWeight(4);
    p5.rect(10, 10, p5.width - 20, p5.height - 20, 20);
  };

  const reset = () => {
    grid = [];
    const size = p.width / 5.5;
    const spacing = 1.2;
    const gap = p.width - size * 4 - (size * spacing - size) * 3;
    for (let i = 0; i < 16; i++) {
      grid.push(
        new Cell(
          p,
          i,
          spacing * size * (i % 4) + gap / 2,
          spacing * size * p.floor(i / 4) + gap / 2,
          size,
          i === 15
        )
      );
    }
    scramble(p, grid[15]);
    if (win) {
      p.loop();
    }
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
    for (let i = 0; i < 30; i++) {
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
    <>
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
      <Reset onClick={reset}>
        <BsArrowCounterclockwise
          size={30}
          color={`rgb(${70 * (props.mainPage ? props.contrast : 1)}, ${
            71 * (props.mainPage ? props.contrast : 1)
          }, ${76 * (props.mainPage ? props.contrast : 1)})`}
        />
      </Reset>
    </>
  );
};

export default Fifteen;
