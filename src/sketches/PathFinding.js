import React, { useState } from 'react';
import Sketch from 'react-p5';
import Cell from './classes/cell';
import styled from 'styled-components';
import Dropdown from '../components/Dropdown';

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
  min-height: 1.5rem;
  margin-left: 10%;
  border-bottom: 1px solid rgb(255, 255, 255, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

let parentRef;
let grid;
let cellSizeX, cellSizeY;
let offSetX;

const PathFinding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnClick = () => {
    console.log('clicked');
    setIsOpen(!isOpen);
  };

  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    parentRef.addEventListener('contextmenu', (e) => e.preventDefault());
    const h = parentRef.clientHeight;
    const w = parentRef.clientWidth;
    p5.createCanvas(w, h).parent(canvasParentRef);
    cellSizeX = p5.floor(p5.width / 40);
    cellSizeY = p5.floor(p5.height / 25);
    //cnv.position(0, 0);
    grid = setUpGridArr(40, 25);
    offSetX = (p5.width - 40 * cellSizeX) / 2;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = new Cell(
          p5,
          i * cellSizeX + offSetX,
          j * cellSizeY,
          cellSizeX,
          cellSizeY
        );
      }
    }
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
    if (parentRef === undefined) {
      return;
    }
    let mX = p5.floor((p5.mouseX - offSetX) / cellSizeX);
    let mY = p5.floor(p5.mouseY / cellSizeY);
    if (mX < 0 || mX > 39 || mY < 0 || mY > 24) {
      return;
    }
    if (p5.mouseButton === p5.LEFT) {
      grid[mX][mY].setWall(true);
    } else if (p5.mouseButton === p5.RIGHT) {
      grid[mX][mY].setWall(false);
    }
    p5.redraw();
  };

  const mousePressed = (p5) => {
    if (parentRef === undefined) {
      return;
    }
    let mX = p5.floor((p5.mouseX - offSetX) / cellSizeX);
    let mY = p5.floor(p5.mouseY / cellSizeY);
    if (mX < 0 || mX > 39 || mY < 0 || mY > 24) {
      return;
    }
    if (p5.mouseButton === p5.LEFT) {
      grid[mX][mY].setWall(true);
    } else if (p5.mouseButton === p5.RIGHT) {
      grid[mX][mY].setWall(false);
    }
    p5.redraw();
  };

  return (
    <SketchWrapper>
      <TopBar>
        <Dropdown
          content={['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']}
          open={isOpen}
          clickHandler={handleOnClick}
        />
      </TopBar>
      <Sketch
        setup={setup}
        draw={draw}
        windowResized={windowResized}
        mouseDragged={mouseDragged}
        mousePressed={mousePressed}
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
