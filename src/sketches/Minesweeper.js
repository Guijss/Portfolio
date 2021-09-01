import React, { useState } from 'react';
import Sketch from 'react-p5';
import Cell from './classes/msCell';
import { SketchWrapper, TopBar, Spacing } from './PathFinding';
import Bomb, { ReactComponent as BombComponent } from '../assets/bomb.svg';
import styled from 'styled-components';

const DisplayWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PhantomSpacer = styled.div`
  position: relative;
  height: 30%;
  width: 100%;
  background: transparent;
`;

const Slider = styled.input`
  position: relative;
  height: 30%;
  -webkit-appearance: none;
  width: 100%;
  background: transparent;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #323232;
    background: #323232;
    border-radius: 5px;
    border: 0px solid #000000;
  }
  &::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 10px;
    width: 20px;
    margin-left: 1px;
    margin-top: -2px;
    border-radius: 12px;
    background: #0f0f0f;
    cursor: pointer;
    -webkit-appearance: none;
  }
  &:focus::-webkit-slider-runnable-track {
    background: #323232;
  }
  &::-moz-range-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #323232;
    background: #323232;
    border-radius: 5px;
    border: 0px solid #000000;
  }
  &::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 10px;
    width: 20px;
    margin-left: 1px;
    margin-top: -2px;
    border-radius: 12px;
    background: #0f0f0f;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #323232;
    border: 0px solid #000000;
    border-radius: 28px;
    box-shadow: 1px 1px 1px #323232;
  }
  &::-ms-fill-upper {
    background: #323232;
    border: 0px solid #000000;
    border-radius: 28px;
    box-shadow: 1px 1px 1px #323232;
  }
  &::-ms-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 10px;
    width: 20px;
    margin-left: 1px;
    margin-top: -2px;
    border-radius: 12px;
    background: #0f0f0f;
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: #323232;
  }
  &:focus::-ms-fill-upper {
    background: #323232;
  }
`;

const BombDisplay = styled.div`
  position: relative;
  width: 100%;
  height: 70%;
  border-radius: 1rem;
  background-color: rgb(50, 50, 50);
  color: rgb(180, 180, 180);
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BombC = styled(BombComponent)`
  position: relative;
  width: 40%;
`;

let parentRef;
let grid;
let gameOver;
let drawing;
let colors;
let cellSize;
let offsetX, offsetY;
let bombsArr;
let bombImg;

const Minesweeper = () => {
  const [running, setRunning] = useState(false);
  const [numBombs, setNumBombs] = useState(100);

  const handleChange = (e) => {
    setNumBombs(e.target.value);
  };

  const preload = (p5) => {
    bombImg = p5.loadImage(Bomb);
  };

  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    parentRef.addEventListener('contextmenu', (e) => e.preventDefault());
    const h = p5.max(parentRef.clientHeight, 400);
    const w = p5.max(parentRef.clientWidth, 800);
    p5.createCanvas(w, h).parent(canvasParentRef);
    cellSize = p5.height / 16;
    offsetX = (p5.width - 30 * cellSize) / 2;
    offsetY = (p5.height - 16 * cellSize) / 2;
    colors = [
      p5.color(0, 150, 0),
      p5.color(150, 150, 0),
      p5.color(0, 150, 150),
      p5.color(200, 150, 150),
    ];
    restart(p5);
  };

  const restart = (p5) => {
    let total = 0;
    grid = make2dArr(30, 16);
    let bombsPlacement = make2dArr(30, 16);
    bombsArr = [];
    for (let i = 0; i < numBombs; i++) {
      const row = p5.floor(p5.random(bombsPlacement.length - 1));
      const col = p5.floor(p5.random(bombsPlacement[0].length - 1));
      if (bombsPlacement[row][col]) {
        i--;
        continue;
      } else {
        bombsPlacement[row][col] = true;
        total++;
      }
    }
    console.log(total);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        grid[i][j] = new Cell(
          p5,
          i * cellSize + offsetX,
          j * cellSize + offsetY,
          cellSize,
          colors,
          bombsPlacement[i][j] ? [true, bombImg] : [false, null]
        );
        if (grid[i][j].bomb) {
          bombsArr.push(grid[i][j]);
          grid[i][j].bombsAround = -1;
        } else {
          grid[i][j].bombsAround = tallyBombsAround(i, j, bombsPlacement);
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
        p5.stroke(110, 255 / 2);
        p5.fill(30, 200);
        p5.rect(offsetX, offsetY, 30 * cellSize, 16 * cellSize, 7);
        p5.stroke(0);
        p5.fill(200);
        p5.textSize(65);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textStyle(p5.BOLD);
        p5.text('GAME OVER', p5.width / 2, p5.height / 2);
        p5.fill(150);
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

  const tallyBombsAround = (i, j, bArr) => {
    let total = 0;
    for (let x = i - 1; x < i + 2; x++) {
      for (let y = j - 1; y < j + 2; y++) {
        if (x >= 0 && x < bArr.length && y >= 0 && y < bArr[0].length) {
          if (x === i && y === j) {
            continue;
          }
          if (bArr[x][y]) {
            total++;
          }
        }
      }
    }
    return total;
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
      if (!running) {
        restart(p5);
        setRunning(true);
      }
      if (p5.mouseButton === p5.LEFT) {
        grid[mX][mY].setOpened(true);
        grid[mX][mY].setFlag(false);
        if (grid[mX][mY].bomb) {
          gameOver = true;
          revealBombs();
          drawing = true;
          setRunning(false);
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

  const windowResized = (p5) => {
    if (parentRef === undefined) {
      return;
    }
    const h = p5.max(parentRef.clientHeight, 400);
    const w = p5.max(parentRef.clientWidth, 800);
    p5.resizeCanvas(w, h);
    cellSize = p5.height / 16;
    offsetX = (p5.width - 30 * cellSize) / 2;
    offsetY = (p5.height - 16 * cellSize) / 2;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        grid[i][j].setSize(cellSize);
        grid[i][j].setPosition(i * cellSize + offsetX, j * cellSize + offsetY);
      }
    }
    drawing = true;
  };

  return (
    <SketchWrapper>
      <Spacing />
      <TopBar>
        <DisplayWrapper>
          <BombDisplay>
            <BombC />
            <span style={{ marginRight: '10px' }}>{numBombs}</span>
          </BombDisplay>
          {running && <PhantomSpacer />}
          {!running && (
            <Slider
              type="range"
              min="30"
              max="100"
              value={numBombs}
              onChange={handleChange}
            />
          )}
        </DisplayWrapper>
      </TopBar>
      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        windowResized={windowResized}
        style={{
          position: 'relative',
          width: '100%',
          height: '76%',
        }}
      />
      <Spacing />
    </SketchWrapper>
  );
};

export default Minesweeper;
