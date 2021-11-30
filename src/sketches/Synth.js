import React from 'react';
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';
import BoardKey from './classes/boardKeys';

let freqs;
let whiteText = ['a', 's', 'd', 'f', 'g', 'h', 'j'];
let blackText = ['w', 'e', 't', 'y', 'u'];
let whiteKeys;
let blackKeys;
let carrier;
let env;
let parentRef;
let waveForm;

const Synth = () => {
  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    const w = parentRef.clientWidth;
    const h = parentRef.clientHeight;
    p5.createCanvas(w, h).parent(parentRef);
    freqs = [
      130.81, 138.59, 146.83, 155.56, 164.81, 174.61, 185.0, 196.0, 207.65,
      220.0, 233.08, 246.94,
    ];
    whiteKeys = [];
    blackKeys = [];
    waveForm = 'sine';
    carrier = make2DArr(12, 3);
    env = make2DArr(12, 3);

    for (let i = 0; i < freqs.length; i++) {
      for (let j = 0; j < 3; j++) {
        env[i][j] = new p5.constructor.Envelope();
        env[i][j].setADSR(0.3, 0.1, 0.4, 0.2);
        env[i][j].setRange(0.6, 0);
        env[i][j].mult((3 - j) * 0.1);
        carrier[i][j] = new p5.constructor.Oscillator();
        carrier[i][j].setType(waveForm);
        carrier[i][j].freq(freqs[i] * (j + 1));
        carrier[i][j].amp(env[i][j]);
        carrier[i][j].start();
      }
    }

    for (let i = 0; i < 7; i++) {
      whiteKeys.push(new BoardKey(p5, i, 0, whiteText[i]));
    }
    for (let i = 0; i < 5; i++) {
      blackKeys.push(new BoardKey(p5, i, 1, blackText[i]));
    }
  };

  const draw = (p5) => {
    p5.background(22, 22, 27);
    for (let i = 0; i < whiteKeys.length; i++) {
      whiteKeys[i].show(p5.width, p5.height);
    }
    for (let i = 0; i < blackKeys.length; i++) {
      blackKeys[i].show(p5.width, p5.height);
    }
  };

  const keyTyped = (p5) => {
    for (let i = 0; i < whiteKeys.length; i++) {
      if (p5.key === whiteText[i]) {
        const ind = i < 3 ? i * 2 : i * 2 - 1;
        env[ind][0].triggerAttack();
        env[ind][1].triggerAttack();
        env[ind][2].triggerAttack();
        whiteKeys[i].setPressed(true);
      }
    }
    for (let i = 0; i < blackKeys.length; i++) {
      if (p5.key === blackText[i]) {
        const ind = i < 2 ? i * 2 + 1 : i * 2 + 2;
        env[ind][0].triggerAttack();
        env[ind][1].triggerAttack();
        env[ind][2].triggerAttack();
        blackKeys[i].setPressed(true);
      }
    }
  };

  const keyReleased = (p5) => {
    for (let i = 0; i < whiteKeys.length; i++) {
      if (p5.key === whiteText[i]) {
        const ind = i < 3 ? i * 2 : i * 2 - 1;
        env[ind][0].triggerRelease();
        env[ind][1].triggerRelease();
        env[ind][2].triggerRelease();
        whiteKeys[i].setPressed(false);
      }
    }
    for (let i = 0; i < blackKeys.length; i++) {
      if (p5.key === blackText[i]) {
        const ind = i < 2 ? i * 2 + 1 : i * 2 + 2;
        env[ind][0].triggerRelease();
        env[ind][1].triggerRelease();
        env[ind][2].triggerRelease();
        blackKeys[i].setPressed(false);
      }
    }
  };

  const windowResized = (p5) => {
    if (parentRef === undefined) {
      return;
    }
    const w = parentRef.clientWidth;
    const h = parentRef.clientHeight;
    p5.resizeCanvas(w, h);
  };

  const make2DArr = (cols, rows) => {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      keyTyped={keyTyped}
      keyReleased={keyReleased}
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

export default Synth;
