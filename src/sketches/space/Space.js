import React from 'react';
import Sketch from 'react-p5';
import { Vector } from 'p5';

let parentRef;
let starsX;
let starsY;
let spacingX, spacingY;
let noiseOffset;
let xStart;
let yStart;
const Space = () => {
  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    const w = parentRef.clientWidth;
    const h = parentRef.clientHeight;
    p5.createCanvas(w, h).parent(parentRef);
    starsX = 35;
    starsY = 25;
    spacingX = p5.width / starsX;
    spacingY = p5.height / starsY;
    noiseOffset = 1;
    xStart = 0;
    yStart = 0;
  };

  const draw = (p5) => {
    p5.background(22, 22, 27);
    p5.noStroke();
    for (let i = -1; i < starsX + 1; i++) {
      for (let j = -1; j < starsY + 1; j++) {
        let x =
          (i + xStart) * spacingX + (p5.width - (starsX - 1) * spacingX) / 2;
        let adjustedX;
        if (x < -spacingX) {
          adjustedX =
            p5.width +
            spacingX -
            (p5.abs(x + spacingX) % (p5.width + 2 * spacingX));
        } else if (x > p5.width + spacingX) {
          adjustedX =
            -spacingX + ((x - p5.width - spacingX) % (p5.width + 2 * spacingX));
        } else {
          adjustedX = x;
        }
        let y =
          (j + yStart) * spacingY + (p5.height - (starsY - 1) * spacingY) / 2;
        let adjustedY;
        if (y < -spacingY) {
          adjustedY =
            p5.height +
            spacingY -
            (p5.abs(y + spacingY) % (p5.height + 2 * spacingY));
        } else if (y > p5.height + spacingY) {
          adjustedY =
            -spacingY +
            ((y - p5.height - spacingY) % (p5.height + 2 * spacingY));
        } else {
          adjustedY = y;
        }
        let offsetX =
          spacingX * (2 * p5.noise(i * noiseOffset, j * noiseOffset, 100) - 1);
        let offsetY =
          spacingY * (2 * p5.noise(i * noiseOffset, j * noiseOffset, -100) - 1);
        let r =
          offsetX > (-1 * spacingX) / 3
            ? 1
            : offsetX > (-2 * spacingX) / 3
            ? 2
            : 3;
        p5.fill(150, 100);
        p5.circle(adjustedX + offsetX, adjustedY + offsetY, r);
      }
    }
    const dirVec = Vector.sub(
      p5.createVector(p5.mouseX, p5.mouseY),
      p5.createVector(p5.width / 2, p5.height / 2)
    );
    xStart -= ((2 * dirVec.x) / p5.width) * 0.02;
    yStart -= ((2 * dirVec.y) / p5.height) * 0.02;
  };

  const windowResized = (p5) => {
    if (parentRef === undefined) {
      return;
    }
    const w = parentRef.clientWidth;
    const h = parentRef.clientHeight;
    p5.resizeCanvas(w, h);
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default Space;
