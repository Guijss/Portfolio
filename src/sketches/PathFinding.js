import React, { useState } from 'react';
import Sketch from 'react-p5';
import Cell from './classes/pfCell';
import styled from 'styled-components';
import Dropdown from '../components/Dropdown';
import { FaPlay } from 'react-icons/fa';
import { a_star, dij } from './utils/pathFind';
import { ReactComponent as Mouse } from '../assets/mouse.svg';
import { ReactComponent as Drag } from '../assets/drag.svg';

export const SketchWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TopBar = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  min-height: 4rem;
  border-bottom: 1px solid rgb(255, 255, 255, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const LabelWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 80%;
  min-height: 2rem;
  display: flex;
  border: 1px solid rgb(15, 15, 15);
  border-radius: 1rem;
  justify-content: space-evenly;
  align-items: center;
`;

const HIconsWrapper = styled.div`
  position: relative;
  width: 10rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const VIconsWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const StartIcon = styled.div`
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
  background-color: rgb(140, 5, 30);
  border-radius: 0.5rem;
`;

const EndIcon = styled.div`
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
  background-color: rgb(5, 140, 30);
  border-radius: 0.5rem;
`;

const WallIcon = styled.div`
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
  background-color: rgb(15, 15, 15);
  border-radius: 0.5rem;
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 10%;
  min-width: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  position: relative;
  width: 5rem;
  height: 3rem;
  min-width: 3rem;
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

const DeleteWallIcon = styled.div`
  position: relative;
  width: 50%;
  height: 50%;
  background-color: rgb(15, 15, 15);
  border-radius: 0.5rem;
  &:before {
    position: absolute;
    content: ' ';
    width: 120%;
    height: 10%;
    background-color: rgb(140, 5, 30);
    border-radius: 100px;
    transform-origin: center;
    transform: translateX(-50%) translateY(450%) rotate(-45deg);
  }
  &:after {
    position: absolute;
    content: ' ';
    width: 120%;
    height: 10%;
    background-color: rgb(140, 5, 30);
    border-radius: 100px;
    transform-origin: center;
    transform: translateX(-50%) translateY(450%) rotate(45deg);
  }
`;

let parentRef;
let grid;
let cellSizeX, cellSizeY;
let offSetX, offsetY;
let start, goal;
let dragging;
let dragPos;
let openList, closedList;
let searching, drawing;
let path;

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

  const deleteWalls = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].wall) {
          grid[i][j].setWall(false);
        }
      }
    }
    drawing = true;
  };

  const pathFind = () => {
    openList = [];
    closedList = [];
    path = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (selection === 'A*') {
          grid[i][j].setG(0);
          grid[i][j].setF(0);
          grid[i][j].setH(0);
          if (grid[i][j].start) {
            openList.push(grid[i][j]);
          }
        } else if (selection === 'Dijkstra') {
          if (grid[i][j].start) {
            grid[i][j].setF(0);
          } else {
            grid[i][j].setF(Infinity);
          }
          openList.push(grid[i][j]);
        }
        grid[i][j].setParent(null);
        grid[i][j].setOpen(false);
        grid[i][j].setClosed(false);
      }
    }
    searching = true;
    drawing = true;
  };

  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    parentRef.addEventListener('contextmenu', (e) => e.preventDefault());
    const h = p5.max(parentRef.clientHeight, 400);
    const w = p5.max(parentRef.clientWidth, 800);
    p5.createCanvas(w, h).parent(canvasParentRef);
    //cellSizeX = p5.floor(p5.width / 40);
    cellSizeY = p5.floor((p5.height - 50) / 25);
    cellSizeX = cellSizeY * 1.4;
    grid = setUpGridArr(40, 25);
    offsetY = (p5.height - 25 * cellSizeY) / 2;
    offSetX = (p5.width - 40 * cellSizeX) / 2;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = new Cell(
          p5,
          i * cellSizeX + offSetX,
          j * cellSizeY + offsetY,
          cellSizeX,
          cellSizeY,
          i,
          j,
          grid
        );
      }
    }
    start = grid[10][11].setStart(true);
    goal = grid[29][11].setEnd(true);
    dragging = 0;
    dragPos = p5.createVector(0, 0);
    path = [];
    openList = [];
    closedList = [];
    drawing = true;
  };

  const draw = (p5) => {
    if (grid === undefined) {
      return;
    }
    if (drawing) {
      p5.background(30);
      p5.stroke(255, 30);
      p5.noFill();
      p5.rect(offSetX, offsetY, cellSizeX * 40, cellSizeY * 25, 7);
      //drawing backboard
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          grid[i][j].render();
        }
      }
      if (path.length > 0) {
        p5.push();
        p5.noFill();
        p5.stroke(225, 173, 1);
        p5.strokeWeight(2);
        p5.beginShape();
        for (const p of path) {
          p5.vertex(p.x + p.sizeX / 2, p.y + p.sizeY / 2);
        }
        p5.endShape();
        p5.pop();
      }

      if (!searching) {
        drawing = false;
      }
    }

    // Pathfinding - loop 3 times per frame.
    if (searching) {
      for (let f = 0; f < 3; f++) {
        switch (selection) {
          case 'A*':
            [searching, path, openList, closedList] = a_star(
              p5,
              grid,
              openList,
              closedList,
              goal
            );
            break;
          case 'Dijkstra':
            [searching, path, openList, closedList] = dij(
              p5,
              grid,
              openList,
              closedList,
              goal
            );
            break;
          case 'Breadth-first':
            searching = false;
            break;
          case 'Depth-first':
            searching = false;
            break;
          default:
            searching = false;
            break;
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

  const windowResized = (p5) => {
    if (parentRef === undefined) {
      return;
    }
    const h = p5.max(parentRef.clientHeight, 400);
    const w = p5.max(parentRef.clientWidth, 800);
    p5.resizeCanvas(w, h);
    cellSizeX = p5.floor(p5.width / 40);
    cellSizeY = p5.floor(p5.height / 25);
    offSetX = (p5.width - 40 * cellSizeX) / 2;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j].setSize(cellSizeX, cellSizeY);
        grid[i][j].setPosition(i * cellSizeX + offSetX, j * cellSizeY);
      }
    }
    drawing = true;
  };

  const mouseDragged = (p5) => {
    if (parentRef === undefined || isOpen || searching) {
      return;
    }
    const mX = p5.floor((p5.mouseX - offSetX) / cellSizeX);
    const mY = p5.floor((p5.mouseY - offsetY) / cellSizeY);
    if (mX < 0 || mX > 39 || mY < 0 || mY > 24) {
      return;
    }
    if (p5.mouseButton === p5.LEFT) {
      if (dragging > 0) {
        if (dragPos.x !== mX || dragPos.y !== mY) {
          if (dragging === 1) {
            if (!grid[mX][mY].end) {
              start.setStart(false);
              start = grid[mX][mY].setStart(true);
            }
          } else {
            if (!grid[mX][mY].start) {
              goal.setEnd(false);
              goal = grid[mX][mY].setEnd(true);
            }
          }
          dragPos.x = mX;
          dragPos.y = mY;
        }
        drawing = true;
        return;
      }
      grid[mX][mY].setWall(true);
    } else if (p5.mouseButton === p5.RIGHT) {
      grid[mX][mY].setWall(false);
    }
    drawing = true;
  };

  const mousePressed = (p5) => {
    if (parentRef === undefined || isOpen || searching) {
      return;
    }
    const mX = p5.floor((p5.mouseX - offSetX) / cellSizeX);
    const mY = p5.floor((p5.mouseY - offsetY) / cellSizeY);
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
    drawing = true;
  };

  const mouseReleased = (p5) => {
    p5.cursor('default');
    dragging = 0;
  };

  const mouseMoved = (p5) => {
    if (!p5.mouseIsPressed && start !== undefined && goal !== undefined) {
      const mX = p5.floor((p5.mouseX - offSetX) / cellSizeX);
      const mY = p5.floor((p5.mouseY - offsetY) / cellSizeY);
      if (
        (mX === start.i && mY === start.j) ||
        (mX === goal.i && mY === goal.j)
      ) {
        p5.cursor('pointer');
      } else {
        p5.cursor('default');
      }
    }
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
        <LabelWrapper>
          <HIconsWrapper>
            <VIconsWrapper>
              <StartIcon />
              <EndIcon />
            </VIconsWrapper>
            <Drag />
          </HIconsWrapper>
          <HIconsWrapper>
            <WallIcon />
            <Mouse />
          </HIconsWrapper>
        </LabelWrapper>
        <ButtonWrapper>
          <Button onClick={deleteWalls}>
            <DeleteWallIcon />
          </Button>
          <Button onClick={pathFind}>
            <FaPlay size={17} color="rgb(70, 70, 70)" />
          </Button>
        </ButtonWrapper>
      </TopBar>
      <Sketch
        setup={setup}
        draw={draw}
        windowResized={windowResized}
        mouseDragged={mouseDragged}
        mousePressed={mousePressed}
        mouseReleased={mouseReleased}
        mouseMoved={mouseMoved}
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
