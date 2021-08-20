import React, { useState } from 'react';
import Sketch from 'react-p5';
import Cell from './classes/cell';
import styled from 'styled-components';
import Dropdown from '../components/Dropdown';
import { FaPlay } from 'react-icons/fa';

const SketchWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  padding-left: 10%;
  min-height: 1.5rem;
  border-bottom: 1px solid rgb(255, 255, 255, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const RunButton = styled.button`
  position: relative;
  margin-left: 40%;
  width: 5%;
  height: 60%;
  background: rgb(30, 30, 30);
  border-radius: 0.5rem;
  border: 1px solid rgb(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: filter 300ms;
  &:hover {
    filter: brightness(1.2);
    cursor: pointer;
  }
`;

let parentRef;
let grid;
let cellSizeX, cellSizeY;
let offSetX;
let start, goal;
let dragging;
let dragPos;
let openList, closedList;
let running;
let p;

const PathFinding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };
  const content = ['A*', 'Dijkstra', 'Breadth-first', 'Depth-first'];
  const [selection, setSelection] = useState(content[0]);
  const handleSelection = (sel) => {
    setSelection(sel);
    setIsOpen(false);
  };

  const pathFind = () => {
    if (!running) {
      running = true;
      start.setG(0);
      start.setF(0);
      openList = [start];
      closedList = [];
      if (!p.isLooping()) {
        p.loop();
      }
    }
  };

  const setup = (p5, canvasParentRef) => {
    p = p5;
    parentRef = canvasParentRef;
    parentRef.addEventListener('contextmenu', (e) => e.preventDefault());
    const h = parentRef.clientHeight;
    const w = parentRef.clientWidth;
    p5.createCanvas(w, h).parent(canvasParentRef);
    cellSizeX = p5.floor(p5.width / 40);
    cellSizeY = p5.floor(p5.height / 25);
    grid = setUpGridArr(40, 25);
    offSetX = (p5.width - 40 * cellSizeX) / 2;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = new Cell(
          p5,
          i * cellSizeX + offSetX,
          j * cellSizeY,
          cellSizeX,
          cellSizeY,
          i,
          j,
          grid
        );
      }
    }
    start = grid[0][0];
    goal = grid[grid.length - 1][grid[0].length - 1];
    dragging = 0;
    dragPos = p5.createVector(0, 0);
    running = false;
    p5.noLoop();
  };

  const draw = (p5) => {
    if (grid === undefined) {
      return;
    }
    p5.background(30);
    //drawing backboard
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j].render();
      }
    }
    // Pathfinding
    if (running) {
      if (openList.length === 0) {
        console.log('fail!');
        running = false;
        p5.noLoop();
        return;
      }
      const current = findLowestF(openList);
      openList.splice(openList.indexOf(current), 1);
      closedList.push(current);
      if (current === goal) {
        console.log('Found it!');
        running = false;
        drawPath(p5, current);
        p5.noLoop();
        return;
      }
      const neighbors = getNeighbors(current);
      for (let neighbor of neighbors) {
        if (closedList.includes(neighbor)) {
          continue;
        }
        if (current.g < neighbor.g) {
          const g = current.g + 1;
          if (openList.includes(neighbor)) {
            if (g > neighbor.g) {
              continue;
            }
          }
          neighbor.setG(g);
          neighbor.setH(calcH(p5, neighbor));
          neighbor.setF(neighbor.g + neighbor.h);
          neighbor.setParent(current);
          if (!openList.includes(neighbor)) {
            openList.push(neighbor);
          }
        }
      }
    }
  };

  const setUpGridArr = (rows, cols) => {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(cols).fill(0);
    }
    return arr;
  };

  const getNeighbors = (current) => {
    let nArr = [];
    const ci = current.i;
    const cj = current.j;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (
          (i === 0 && j === 0) ||
          ci + i < 0 ||
          ci + i >= grid.length ||
          cj + j < 0 ||
          cj + j >= grid[0].length
        ) {
          continue;
        } else if (
          grid[ci + i][cj + j].wall ||
          (i * j !== 0 &&
            grid[ci + i + -1 * i][cj + j].wall &&
            grid[ci + i][cj + j + -1 * j].wall)
        ) {
          continue;
        } else {
          if (!grid[ci + i][cj + j].end) {
            grid[ci + i][cj + j].setVisited(true);
          }
          nArr.push(grid[ci + i][cj + j]);
        }
      }
    }
    return nArr;
  };

  const calcH = (p5, cell) => {
    return (
      (cell.i - goal.i) * (cell.i - goal.i) +
      (cell.j - goal.j) * (cell.j - goal.j)
    );
    //return p5.abs(cell.i - goal.i) + p5.abs(cell.j - goal.j);
  };

  const findLowestF = (arr) => {
    let lowest = Infinity;
    let lowestEl;
    for (let el of arr) {
      if (el.f < lowest) {
        lowest = el.f;
        lowestEl = el;
      }
    }
    return lowestEl;
  };

  const drawPath = (p5, cell) => {
    p5.noFill();
    p5.stroke(225, 173, 1);
    p5.strokeWeight(2);
    p5.beginShape();
    while (cell !== null) {
      p5.vertex(cell.x + cell.sizeX / 2, cell.y + cell.sizeY / 2);
      cell = cell.parent;
    }

    p5.endShape();
  };

  const windowResized = (p5) => {
    if (parentRef === undefined) {
      return;
    }
    const h = parentRef.clientHeight;
    const w = parentRef.clientWidth;
    p5.resizeCanvas(w, h);
    //cnv.position(parentRef.clientWidth / 2 - p5.width / 2, 0);
    cellSizeX = p5.floor(p5.width / 40);
    cellSizeY = p5.floor(p5.height / 25);
    offSetX = (p5.width - 40 * cellSizeX) / 2;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j].setSize(cellSizeX, cellSizeY);
        grid[i][j].setPosition(i * cellSizeX + offSetX, j * cellSizeY);
      }
    }
    p5.redraw();
  };

  const mouseDragged = (p5) => {
    if (parentRef === undefined || isOpen) {
      return;
    }
    let mX = p5.floor((p5.mouseX - offSetX) / cellSizeX);
    let mY = p5.floor(p5.mouseY / cellSizeY);
    if (mX < 0 || mX > 39 || mY < 0 || mY > 24) {
      return;
    }
    if (p5.mouseButton === p5.LEFT) {
      if (dragging > 0) {
        if (dragPos.x !== mX || dragPos.y !== mY) {
          if (dragging === 1) {
            grid[dragPos.x][dragPos.y].setStart(false);
            grid[mX][mY].setStart(true);
            start = grid[mX][mY];
          } else {
            grid[dragPos.x][dragPos.y].setEnd(false);
            grid[mX][mY].setEnd(true);
            goal = grid[mX][mY];
          }
          dragPos.x = mX;
          dragPos.y = mY;
        }
        p5.redraw();
        return;
      }
      grid[mX][mY].setWall(true);
    } else if (p5.mouseButton === p5.RIGHT) {
      grid[mX][mY].setWall(false);
    }
    p5.redraw();
  };

  const mousePressed = (p5) => {
    if (parentRef === undefined || isOpen) {
      return;
    }
    let mX = p5.floor((p5.mouseX - offSetX) / cellSizeX);
    let mY = p5.floor(p5.mouseY / cellSizeY);
    if (mX < 0 || mX > 39 || mY < 0 || mY > 24) {
      return;
    }
    if (p5.mouseButton === p5.LEFT) {
      if (grid[mX][mY].start || grid[mX][mY].end) {
        dragging = grid[mX][mY].start ? 1 : 2;
        dragPos.x = mX;
        dragPos.y = mY;
        p5.cursor('grabbing');
        return;
      }
      grid[mX][mY].setWall(true);
    } else if (p5.mouseButton === p5.RIGHT) {
      grid[mX][mY].setWall(false);
    }
    p5.redraw();
  };

  const mouseReleased = (p5) => {
    p5.cursor('default');
    dragging = 0;
  };

  return (
    <SketchWrapper>
      <TopBar>
        <Dropdown
          content={content}
          open={isOpen}
          clickHandler={handleOnClick}
          selection={selection}
          selectionHandler={handleSelection}
        />
        <RunButton onClick={pathFind}>
          <FaPlay size={17} color="rgb(70, 70, 70)" />
        </RunButton>
      </TopBar>
      <Sketch
        setup={setup}
        draw={draw}
        windowResized={windowResized}
        mouseDragged={mouseDragged}
        mousePressed={mousePressed}
        mouseReleased={mouseReleased}
        style={{
          position: 'relative',
          width: '100%',
          height: '90%',
          display: 'flex',
          justifyContent: 'center',
        }}
      />
    </SketchWrapper>
  );
};

export default PathFinding;
