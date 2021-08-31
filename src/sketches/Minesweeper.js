import React from 'react';
import Sketch from 'react-p5';
import Cell from './classes/msCell';

let parentRef;
let grid;
let gameOver;
let drawing;
let colors;
let cellSize;
let offsetX, offsetY;
let bombsArr;

const Minesweeper = () => {
  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    parentRef.addEventListener('contextmenu', (e) => e.preventDefault());
    const h = parentRef.clientHeight;
    const w = parentRef.clientWidth; //2 * h;
    p5.createCanvas(w, h).parent(canvasParentRef);
    cellSize = (p5.height - 100) / 20;
    offsetX = (p5.width - 40 * cellSize) / 2;
    offsetY = (p5.height - 20 * cellSize) / 2;
    colors = [
      p5.color(0, 150, 0),
      p5.color(150, 150, 0),
      p5.color(0, 150, 150),
      p5.color(200, 150, 150),
    ];
    restart(p5);
  };

  const restart = (p5) => {
    grid = make2dArr(40, 20);
    bombsArr = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        grid[i][j] = new Cell(
          p5,
          i * cellSize + offsetX,
          j * cellSize + offsetY,
          cellSize,
          colors
        );
        if (grid[i][j].bomb) {
          bombsArr.push(grid[i][j]);
        }
      }
    }
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (!grid[i][j].bomb) {
          tallyBombsAround(i, j);
        }
      }
    }
    gameOver = false;
    drawing = true;
  };

  const draw = (p5) => {
    if (drawing) {
      p5.background(30);
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          grid[i][j].render();
        }
      }
      if (gameOver) {
        for (let i = 0; i < grid.length; i++) {
          for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j].bomb && !grid[i][j].clicked) {
              grid[i][j].clicked = true;
              grid[i][j].render();
            }
          }
        }
        p5.fill(50, 240);
        p5.rect(offsetX, offsetY, 40 * cellSize, 20 * cellSize, 7);
        p5.fill(150);
        p5.textSize(65);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textStyle(p5.BOLD);
        p5.text('GAME OVER', p5.width / 2, p5.height / 2);
        p5.fill(0);
        p5.textSize(22);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text('Click anywhere to restart!', p5.width / 2, 50 + p5.height / 2);
      }
      drawing = false;
    }
  };

  const make2dArr = (rows, cols) => {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(cols);
    }
    return arr;
  };

  const tallyBombsAround = (i, j) => {
    for (let x = i - 1; x < i + 2; x++) {
      for (let y = j - 1; y < j + 2; y++) {
        if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
          if (x === i && y === j) {
            continue;
          }
          if (grid[x][y].bomb) {
            grid[i][j].bombsAround++;
          }
        }
      }
    }
  };

  const floodOpen = (i, j) => {
    for (let x = i - 1; x < i + 2; x++) {
      for (let y = j - 1; y < j + 2; y++) {
        if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
          if (x === i && y === j) {
            continue;
          }
          if (!grid[x][y].opened) {
            grid[x][y].setOpened(true);
            if (grid[x][y].bombsAround === 0) {
              floodOpen(x, y);
            }
          }
        }
      }
    }
  };

  const revealBombs = () => {
    for (const b of bombsArr) {
      b.setOpened(true);
    }
  };

  const mousePressed = (p5) => {
    if (!gameOver) {
      const mX = p5.floor((p5.mouseX - offsetX) / cellSize);
      const mY = p5.floor((p5.mouseY - offsetY) / cellSize);
      if (mX < 0 || mX > 39 || mY < 0 || mY > 19) {
        return;
      }
      if (p5.mouseButton === p5.LEFT) {
        grid[mX][mY].setOpened(true);
        grid[mX][mY].setFlag(false);
        if (grid[mX][mY].bomb) {
          gameOver = true;
          revealBombs();
          drawing = true;
          return;
        } else if (grid[mX][mY].bombsAround === 0) {
          floodOpen(mX, mY);
        }
      } else if (p5.mouseButton === p5.RIGHT) {
        grid[mX][mY].setFlag(!grid[mX][mY].flag);
      }
      drawing = true;
    } else {
      restart(p5);
    }
  };

  const windowResized = (p5) => {};

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
      windowResized={windowResized}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '0',
      }}
    />
  );
};

export default Minesweeper;
