import React from 'react';
import Sketch from 'react-p5';
import Piece from './classes/piece';

let parentRef;
let numX, numY, size;
let grid;
let empty, slider;
let animating, dir, magRatio;
const Puzzle15 = () => {
  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    const w = parentRef.clientWidth;
    const h = parentRef.clientHeight;
    p5.createCanvas(w, h).parent(parentRef);
    size = 100;
    numX = p5.floor(p5.width / size);
    numY = p5.floor(p5.height / size);
    grid = make2dArr(numX, numY);
    for (let i = 0; i < numX; i++) {
      for (let j = 0; j < numY; j++) {
        let visible = i < numX - 1 || j < numY - 1;
        grid[i][j] = new Piece(p5, i, j, i * size, j * size, size, visible);
        if (!visible) {
          empty = grid[i][j];
        }
      }
    }
    animating = false;
    dir = p5.createVector(0, 0);
  };

  const draw = (p5) => {
    p5.background(22, 22, 27);
    const mouseCellX = p5.floor(p5.mouseX / size);
    const mouseCellY = p5.floor(p5.mouseY / size);
    const d = p5.createVector(mouseCellX - empty.i, mouseCellY - empty.j);
    if (!animating) {
      slider = pickSlider(empty, d, p5);
      if (slider !== 0) {
        slider.animating = true;
        animating = true;
        dir = p5.createVector(empty.i - slider.i, empty.j - slider.j);
        magRatio = slider.pos.mag() / empty.pos.mag();
      }
    } else {
      dir.setMag(
        p5.map(p5.abs(slider.pos.mag() - empty.pos.mag()), size, 0, 1, 3)
      );
      if (
        (magRatio > 1 && slider.pos.mag() <= empty.pos.mag()) ||
        (magRatio < 1 && slider.pos.mag() >= empty.pos.mag())
      ) {
        slider.pos.x = slider.i * size;
        slider.pos.y = slider.j * size;
        slider.visible = false;
        slider.animating = false;
        empty.visible = true;
        empty = slider;
        animating = false;
      }
    }
    for (let i = 0; i < numX; i++) {
      for (let j = 0; j < numY; j++) {
        grid[i][j].slide(dir);
        grid[i][j].render();
      }
    }
  };

  const make2dArr = (x, y) => {
    let arr = new Array(x);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(y);
    }
    return arr;
  };

  const pickSlider = (emptyCell, d, p5) => {
    let candidates = getCandidatePieces(emptyCell, d, p5);
    if (candidates.length > 0) {
      return p5.random(candidates);
    }
    return 0;
  };

  const getCandidatePieces = (emptyCell, d, p5) => {
    let c = [];
    const x = emptyCell.i + d.x / p5.abs(d.x);
    const y = emptyCell.j + d.y / p5.abs(d.y);
    if (x >= 0 && x < numX) {
      c.push(grid[x][emptyCell.j]);
    }
    if (y >= 0 && y < numY) {
      c.push(grid[emptyCell.i][y]);
    }
    return c;
  };

  const windowResized = (p5) => {};

  return (
    <Sketch
      setup={setup}
      draw={draw}
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

export default Puzzle15;
