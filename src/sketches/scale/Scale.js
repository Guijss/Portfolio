import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';
import styled from 'styled-components';

const Control = styled.div`
  position: relative;
  width: 80%;
  height: 40%;
  font-family: 'Roboto Slab', serif;
  color: rgb(150, 150, 150);
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 0.7fr 0.3fr;
  grid-template-areas:
    'notes scales'
    'scaletitle scaletitle'
    'scalenotes scalenotes';
`;

const Notes = styled.div`
  position: relative;
  grid-area: notes;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const Scales = styled.div`
  position: relative;
  grid-area: scales;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ScaleTitle = styled.div`
  position: relative;
  margin-bottom: 1rem;
  grid-area: scaletitle;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ScaleNotes = styled.div`
  position: relative;
  grid-area: scalenotes;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid rgb(150, 150, 150);
`;

const Button = styled.button`
  position: relative;
  width: ${(props) => props.w};
  height: 3rem;
  min-width: 3rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: ${(props) => props.bgCol};
  color: rgb(150, 150, 150);
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease;
  &:hover {
    cursor: pointer;
  }
`;

let parentRef;
let p;
let scaleWidth, scaleHeight, scaleX, scaleY;
let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let scales = ['Major', 'Minor'];
let tuning = [
  ['e', 'B', 'G', 'D', 'A', 'E'],
  [4, 11, 7, 2, 9, 4],
];
let scale = [
  [0, 2, 4, 5, 7, 9, 11], //[HS, HS, S, HS, HS, HS, S];
  [0, 2, 3, 5, 7, 8, 10], //[HS, S, HS, HS, S, HS, HS];
];
const Scale = () => {
  const [currNote, setCurrNote] = useState(0);
  const [currScale, setCurrScale] = useState(0);
  const [currScaleNotes, setCurrScaleNotes] = useState([]);

  useEffect(() => {
    const calcScaleNotes = () => {
      let scaleNotes = [];
      for (let i = 0; i < scale[0].length; i++) {
        scaleNotes.push((currNote + scale[currScale][i]) % 12);
      }
      return scaleNotes;
    };
    setCurrScaleNotes(calcScaleNotes);
  }, [currNote, currScale]);

  useEffect(() => {
    if (p !== undefined) {
      p.loop();
    }
  }, [currScaleNotes]);

  const fillNeck = (p5, scaleWidth, scaleHeight, scaleX, scaleY) => {
    for (let i = 0; i < tuning[1].length; i++) {
      for (let j = 0; j <= 12; j++) {
        for (let n = 0; n < currScaleNotes.length; n++) {
          if ((tuning[1][i] + j) % 12 === currScaleNotes[n]) {
            p5.strokeWeight(0.3);
            p5.stroke(70);
            p5.fill(90, 30);
            if (j === 0) {
              p5.circle(
                scaleX - 10,
                scaleY + (i * scaleHeight) / 6 + scaleHeight / 12,
                10
              );
            } else {
              p5.rect(
                scaleX + ((j - 1) * scaleWidth) / 12,
                scaleY + (i * scaleHeight) / 6,
                scaleWidth / 12,
                scaleHeight / 6
              );
              p5.fill(150);
              p5.textAlign(p5.CENTER, p5.CENTER);
              p5.textSize(16);
              p5.text(
                notes[(tuning[1][i] + j) % 12],
                scaleX + ((j - 1) * scaleWidth) / 12 + scaleWidth / 24,
                scaleY + (i * scaleHeight) / 6 + scaleHeight / 12
              );
            }
          }
        }
      }
    }
  };

  const setup = (p5, canvasParentRef) => {
    p = p5;
    parentRef = canvasParentRef;
    const w = parentRef.clientWidth;
    const h = parentRef.clientHeight;
    p5.createCanvas(w, h).parent(parentRef);
    scaleWidth = (8 * p5.width) / 10;
    scaleHeight = (9 * p5.height) / 10;
    scaleX = p5.width / 10;
    scaleY = p5.height / 10 - 1;
    fillNeck(p5, scaleWidth, scaleHeight, scaleX, scaleY);
  };

  const draw = (p5) => {
    p5.background(18, 19, 24);
    p5.noFill();
    p5.stroke(150);
    p5.rect(scaleX, scaleY, scaleWidth, scaleHeight);
    for (let i = 0; i < 11; i++) {
      p5.line(
        scaleX + ((i + 1) * scaleWidth) / 12,
        scaleY,
        scaleX + ((i + 1) * scaleWidth) / 12,
        scaleY + scaleHeight
      );
    }
    fillNeck(p5, scaleWidth, scaleHeight, scaleX, scaleY);
    p5.fill(150);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(12);
    for (let i = 0; i < 12; i++) {
      p5.text(
        i + 1,
        scaleX + (i * scaleWidth) / 12 + scaleWidth / 24,
        scaleY - 10
      );
    }

    for (let i = 0; i < tuning[0].length; i++) {
      p5.text(
        tuning[0][i],
        scaleX - 30,
        scaleY + (i * scaleHeight) / 6 + scaleHeight / 12 + 1
      );
    }
    p5.noLoop(); // We only update draw when needed to avoid running the triple nested 'for' unnecessarily.
  };

  const windowResized = (p5) => {
    if (parentRef === undefined) {
      return;
    }
    const w = parentRef.clientWidth;
    const h = parentRef.clientHeight;
    p5.resizeCanvas(w, h);
    scaleWidth = (8 * p5.width) / 10;
    scaleHeight = (9 * p5.height) / 10;
    scaleX = p5.width / 10;
    scaleY = p5.height / 10 - 1;
  };

  const handleClickNotes = (i) => {
    setCurrNote(i);
  };

  const handleClickscales = (i) => {
    setCurrScale(i);
  };

  return (
    <>
      <Control>
        <Notes>
          {notes.map((v, i) => {
            return (
              <ScaleButton
                key={i}
                idx={i}
                bgCol={
                  i === currNote
                    ? 'rgba(70, 70, 70, 0.3)'
                    : 'rgba(70, 70, 70, 0)'
                }
                handleClick={handleClickNotes}
                w="3rem"
              >
                {v}
              </ScaleButton>
            );
          })}
        </Notes>
        <Scales>
          {scales.map((v, i) => {
            return (
              <ScaleButton
                key={i}
                idx={i}
                bgCol={
                  i === currScale
                    ? 'rgba(70, 70, 70, 0.3)'
                    : 'rgba(70, 70, 70, 0)'
                }
                handleClick={handleClickscales}
                w="10rem"
              >
                {v}
              </ScaleButton>
            );
          })}
        </Scales>
        <ScaleTitle>Scale Notes</ScaleTitle>
        <ScaleNotes>
          {currScaleNotes.map((v, i) => {
            return <span key={i}>{notes[v]}</span>;
          })}
        </ScaleNotes>
      </Control>
      <Sketch
        setup={setup}
        draw={draw}
        windowResized={windowResized}
        style={{
          position: 'relative',
          width: '100%',
          height: '30%',
        }}
      />
    </>
  );
};

const ScaleButton = (props) => {
  return (
    <Button
      bgCol={props.bgCol}
      w={props.w}
      onClick={() => props.handleClick(props.idx)}
    >
      {props.children}
    </Button>
  );
};

export default Scale;
