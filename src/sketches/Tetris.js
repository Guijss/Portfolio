import React from 'react';
import Sketch from 'react-p5';

const blocks = [
  [
    [0, 0, 0, 0], // I
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0], // S
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0], // Z
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 0, 0], // L
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0], // J
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0], // T
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0], // O
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
];

let board;
let settledBlocks;
let currBlock;
let cellSize;
let cellColors;
let rotationCounter;
let boardSize;
let gameOver;
let parentRef;
let cnv;
let bag;

const Tetris = () => {
  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    boardSize = [12, 25]; // 2 side walls, 4 hidden rows on top. playable board is 10x20.
    const h = parentRef.clientHeight - 4;
    const w = h / 2;
    cnv = p5.createCanvas(w, h).parent(parentRef);
    cnv.position(parentRef.clientWidth / 2 - p5.width / 2, 4);
    cellSize = p5.height / 20;
    cellColors = [
      p5.color(255, 50, 19),
      p5.color(255, 151, 28),
      p5.color(255, 213, 0),
      p5.color(114, 203, 59),
      p5.color(3, 65, 174),
      p5.color(0, 200, 200),
      p5.color(100, 0, 100),
    ];
    restartGame(p5);
  };

  const draw = (p5) => {
    //p5.background(0);
    p5.stroke(110, 255 / 2);
    p5.fill(22, 22, 27);
    p5.rect(1, 1, p5.width - 2, p5.height - 2, cellSize / 4);
    // Block fall
    if (p5.frameCount % 30 === 0) {
      moveBlock(p5, 2);
    }
    // Drawing
    for (let cell of currBlock) {
      let x = cell.x * cellSize - cellSize;
      let y = cell.y * cellSize - 4 * cellSize;
      drawCell(p5, x, y, cellColors[cell.z]);
    }
    for (let settled of settledBlocks) {
      let x = settled.x * cellSize - cellSize;
      let y = settled.y * cellSize - 4 * cellSize;
      drawCell(p5, x, y, cellColors[settled.z]);
    }
    if (gameOver) {
      p5.stroke(110, 255 / 2);
      p5.fill(22, 22, 27, 230);
      p5.rect(1, 1, cellSize * 10 - 2, cellSize * 20 - 2, cellSize / 4);
      p5.fill(200);
      p5.stroke(0);
      const tSize = p5.ceil(p5.width / 7); //Size of font based on current canvas size.
      p5.textSize(tSize);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textStyle(p5.BOLD);
      p5.text('GAME OVER', p5.width / 2, p5.height / 2 - 20);
      p5.fill(150);
      p5.textSize(tSize / 3);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text('Press any key to restart!', p5.width / 2, p5.height / 2 + 20);
    }
  };

  const drawCell = (p5, x, y, col) => {
    p5.noStroke();
    p5.fill(col);
    p5.square(x + 1, y + 1, cellSize - 2, cellSize / 4);
  };

  const spawnBlock = (p5) => {
    if (gameOver) {
      return;
    }
    if (bag.length === 0) {
      bag = [0, 1, 2, 3, 4, 5, 6];
    }
    const ind = p5.random(bag);
    bag.splice(bag.indexOf(ind), 1);
    const block = blocks[ind];

    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j < block[i].length; j++) {
        if (block[i][j] > 0) {
          currBlock.push(p5.createVector(i + 4, j, blocks.indexOf(block)));
        }
      }
    }
  };

  const getBlockCenter = (p5) => {
    let sumX = 0;
    let sumY = 0;
    for (let cell of currBlock) {
      sumX += cell.x;
      sumY += cell.y;
    }
    return p5.createVector(
      p5.floor(sumX / currBlock.length),
      p5.floor(sumY / currBlock.length)
    );
  };

  const rotateBlock = (p5) => {
    rotationCounter++;
    let origin = getBlockCenter(p5);
    let rotatedBlock = [];
    let pushBack = 0;
    if (
      currBlock[0].z === 0 ||
      currBlock[0].z === 1 ||
      currBlock[0].z === 2 ||
      currBlock[0].z === 5
    ) {
      if (rotationCounter % 2 === 0) {
        pushBack = -1;
      }
    }
    for (let cell of currBlock) {
      let rotatedX = origin.x + (origin.y - cell.y) + 1 + pushBack;
      let rotatedY = origin.y - (origin.x - cell.x);
      if (
        rotatedX < 0 ||
        rotatedX > boardSize[0] - 1 ||
        rotatedY > boardSize[1] - 1
      ) {
        return;
      }
      if (board[rotatedX][rotatedY] === 0) {
        rotatedBlock.push(p5.createVector(rotatedX, rotatedY, cell.z));
      } else {
        return;
      }
    }
    currBlock = rotatedBlock;
  };

  const moveBlock = (p5, dir) => {
    let movedBlock = [];
    switch (dir) {
      case 0: //left
        for (let cell of currBlock) {
          if (board[cell.x - 1][cell.y] === 0) {
            movedBlock.push(p5.createVector(cell.x - 1, cell.y, cell.z));
          } else {
            return;
          }
        }
        currBlock = movedBlock;
        break;
      case 1: //right
        for (let cell of currBlock) {
          if (board[cell.x + 1][cell.y] === 0) {
            movedBlock.push(p5.createVector(cell.x + 1, cell.y, cell.z));
          } else {
            return;
          }
        }
        currBlock = movedBlock;
        break;
      case 2: //down
        for (let cell of currBlock) {
          if (board[cell.x][cell.y + 1] === 0) {
            movedBlock.push(p5.createVector(cell.x, cell.y + 1, cell.z));
          } else {
            if (board[cell.x][4] > 0) {
              gameOver = true;
            }
            for (let cell of currBlock) {
              board[cell.x][cell.y] = 1;
              settledBlocks.push(p5.createVector(cell.x, cell.y, cell.z));
            }
            const blockYArr = currBlock
              .map((v) => v.y)
              .filter((v, i, arr) => arr.indexOf(v) === i);
            checkLineCompletion(blockYArr);
            currBlock = [];
            spawnBlock(p5);
            return true;
          }
        }
        currBlock = movedBlock;
        return false;
      default:
        break;
    }
  };

  const deleteLines = (cLines) => {
    if (cLines.length === 0) {
      return;
    }
    for (let y of cLines) {
      for (let i = settledBlocks.length - 1; i >= 0; i--) {
        if (settledBlocks[i].y === y) {
          board[settledBlocks[i].x][settledBlocks[i].y] = 0;
          const ind = settledBlocks.indexOf(settledBlocks[i]);
          settledBlocks.splice(ind, 1);
        }
      }
    }

    for (let settled of settledBlocks) {
      let drop = 0;
      for (let y of cLines) {
        if (settled.y < y) {
          drop++;
        }
      }
      board[settled.x][settled.y]--;
      board[settled.x][settled.y + drop]++;
      settled.y += drop;
    }
  };

  const checkLineCompletion = (yArr) => {
    let lineChecker;
    let completedLines = [];
    for (let j = 0; j < yArr.length; j++) {
      lineChecker = true;
      for (let i = 1; i < board.length - 1; i++) {
        if (board[i][yArr[j]] === 0) {
          lineChecker = false;
          break;
        }
      }
      if (lineChecker) {
        completedLines.push(yArr[j]);
      }
    }
    deleteLines(completedLines.reverse());
  };

  const setUpArray = (rows, cols) => {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(cols).fill(0);
    }
    for (let i = 1; i < arr.length - 1; i++) {
      arr[i][arr[i].length - 1] = 9;
    }
    arr[0].fill(9);
    arr[arr.length - 1].fill(9);
    return arr;
  };

  const restartGame = (p5) => {
    board = setUpArray(boardSize[0], boardSize[1]);
    settledBlocks = [];
    currBlock = [];
    rotationCounter = 0;
    gameOver = false;
    bag = [0, 1, 2, 3, 4, 5, 6];
    spawnBlock(p5);
  };

  const keyPressed = (p5) => {
    if (gameOver) {
      gameOver = false;
      restartGame(p5);
    }
    if (p5.keyCode === p5.LEFT_ARROW) {
      moveBlock(p5, 0);
    }
    if (p5.keyCode === p5.RIGHT_ARROW) {
      moveBlock(p5, 1);
    }
    if (p5.keyCode === p5.DOWN_ARROW) {
      moveBlock(p5, 2);
    }
    if (p5.keyCode === p5.UP_ARROW) {
      rotateBlock(p5);
    }
    if (p5.keyCode === 32) {
      let stop = false;
      while (!stop) {
        stop = moveBlock(p5, 2);
      }
    }
  };

  const windowResized = (p5) => {
    if (parentRef.clientHeight === undefined) {
      return;
    }
    const h = parentRef.clientHeight - 4;
    const w = h / 2;
    p5.resizeCanvas(w, h);
    cnv.position(parentRef.clientWidth / 2 - p5.width / 2, 4);
    cellSize = p5.height / 20;
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      keyPressed={keyPressed}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    />
  );
};

export default Tetris;
