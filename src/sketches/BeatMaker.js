import React from 'react';
import Sketch from 'react-p5';
import Pad from './classes/pad';
//import styled from 'styled-components';
import { SketchWrapper, TopBar } from './PathFinding';

let parentRef;
let pads;
let linePos;
let currentBar;

const BeatMaker = () => {
  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    parentRef.addEventListener('contextmenu', (e) => e.preventDefault());
    const h = p5.max(parentRef.clientHeight, 400);
    const w = p5.max(parentRef.clientWidth, 800);
    p5.createCanvas(w, h).parent(parentRef);
    pads = make2dArr(10, 8 * 4); // 10 instruments, 4 beats per bar, 8 bars.
    const size = (p5.width - 50) / (8 * 4);
    const heightSpacing = p5.height - 10 * size;
    for (let i = 0; i < pads.length; i++) {
      for (let j = 0; j < pads[i].length; j++) {
        pads[i][j] = new Pad(
          p5,
          j * size + 50,
          heightSpacing / 2 + i * size,
          size
        );
      }
    }
    linePos = 50;
    currentBar = 0;
  };

  const draw = (p5) => {
    p5.background(30);
    for (let i = 0; i < pads.length; i++) {
      for (let j = 0; j < pads[i].length; j++) {
        pads[i][j].update();
        pads[i][j].render();
      }
    }
    p5.stroke(255, 211, 0, 50);
    const w = (p5.width - 50) / 8;
    const y1 = pads[0][0].y;
    const y2 = pads[9][0].y + pads[0][0].s;
    for (let i = 1; i < 8; i++) {
      p5.line(i * w + 50, y1, i * w + 50, y2);
    }
    p5.stroke(255);
    p5.line(linePos, 0, linePos, p5.height);
    linePos += w / (1000 / p5.deltaTime);
    const prevBar = currentBar;
    currentBar = p5.floor((linePos - 50) / w);
    if (linePos > p5.width) {
      linePos = 50;
      currentBar = 0;
    }
  };

  const make2dArr = (rows, cols) => {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(cols);
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
  };

  const mousePressed = (p5) => {};

  return (
    <SketchWrapper>
      <TopBar />
      <Sketch
        setup={setup}
        draw={draw}
        windowResized={windowResized}
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

export default BeatMaker;
