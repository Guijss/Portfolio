import Sketch from 'react-p5';
import Cell from './cell';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { Reset } from '../../components/commonStyledComponents';

let grid;
let selected = [];
let curr;
let numPegs;
let size;
let p;
const PegSolitaire = (props) => {
  const setup = (p5, canvasParentRef) => {
    p = p5;
    const w = canvasParentRef.clientWidth;
    const h = canvasParentRef.clientHeight;
    p5.createCanvas(w, h).parent(canvasParentRef);
    reset();
  };

  const draw = (p5) => {
    p5.clear();
    const lowerContrast = props.mainPage
      ? p5.map(props.contrast, 1, 3, 1, 1.5)
      : 1;
    if (numPegs < 2) {
      p5.stroke(120, 135, 180);
    } else {
      p5.stroke(32 * lowerContrast, 35 * lowerContrast, 42 * lowerContrast);
    }
    p5.noFill();
    p5.strokeWeight(4);
    p5.rect(10, 10, p5.width - 20, p5.height - 20, 20);
    for (let j = 0; j < grid.length; j++) {
      for (let i = 0; i < grid[j].length; i++) {
        grid[i][j].render((props) => (props.mainPage ? props.contrast : 1));
      }
    }
  };

  const reset = () => {
    numPegs = 32;
    size = p.width / 13;
    const spacing = 1.7;
    const gap = p.width - size * 7 - (size * spacing - size) * 6;
    grid = make2dArr(7, 7);
    for (let j = 0; j < grid.length; j++) {
      for (let i = 0; i < grid[j].length; i++) {
        if ((i < 2 && (j < 2 || j > 4)) || (i > 4 && (j < 2 || j > 4))) {
          grid[i][j] = new Cell(p, false);
        } else {
          grid[i][j] = new Cell(
            p,
            true,
            i,
            j,
            spacing * size * i + size / 2 + gap / 2,
            spacing * size * j + size / 2 + gap / 2,
            size,
            i === 3 && j === 3
          );
        }
      }
    }
  };

  const mousePressed = (p5) => {
    for (let j = 0; j < grid.length; j++) {
      for (let i = 0; i < grid[j].length; i++) {
        if (
          p5.dist(p5.mouseX, p5.mouseY, grid[i][j].x, grid[i][j].y) <
          size / 2
        ) {
          if (grid[i][j].sel) {
            if (grid[i][j] === curr) {
              deselect();
            } else {
              //legal move
              const midI = (curr.i + grid[i][j].i) / 2;
              const midJ = (curr.j + grid[i][j].j) / 2;
              curr.e = true;
              grid[midI][midJ].e = true;
              grid[i][j].e = false;
              numPegs--;
              deselect();
            }
          } else {
            if (grid[i][j].e) {
              return;
            }
            deselect();
            grid[i][j].sel = true;
            curr = grid[i][j];
            selected = [grid[i][j]].concat(checkMoves(grid[i][j]));
          }
        }
      }
    }
  };

  const checkMoves = (cell) => {
    const i = cell.i;
    const j = cell.j;
    let moves = [];
    //going right
    if (i < 5 && !grid[i + 1][j].e && grid[i + 2][j].e) {
      grid[i + 2][j].sel = true;
      moves.push(grid[i + 2][j]);
    }
    //going down
    if (j < 5 && !grid[i][j + 1].e && grid[i][j + 2].e) {
      grid[i][j + 2].sel = true;
      moves.push(grid[i][j + 2]);
    }
    //going left
    if (i > 1 && !grid[i - 1][j].e && grid[i - 2][j].e) {
      grid[i - 2][j].sel = true;
      moves.push(grid[i - 2][j]);
    }
    //going up
    if (j > 1 && !grid[i][j - 1].e && grid[i][j - 2].e) {
      grid[i][j - 2].sel = true;
      moves.push(grid[i][j - 2]);
    }
    return moves;
  };

  const deselect = () => {
    for (const s of selected) {
      s.sel = false;
    }
    selected = [];
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
      <Sketch
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        style={{
          position: 'relative',
          width: '250px',
          height: '250px',
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

export default PegSolitaire;
