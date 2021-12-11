import React from 'react';
import styled from 'styled-components';
import HeroShape from '../sketches/heroShape/HeroShape';

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.bgMain};
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HeroCentered = styled.div`
  width: 60%;
  height: 70%;
  display: grid;
  grid-template-rows: 0.5fr 0.2fr 0.4fr 0.4fr 1.1fr 0.5fr;
  grid-template-columns: 1.5fr 1fr;
  grid-template-areas:
    'e1 canvas'
    'h1 canvas'
    'h3 canvas'
    'h2 canvas'
    'action canvas'
    'action e2';
  font-family: 'Alata', sans-serif;
`;

const Hello = styled.h1`
  margin: 0;
  padding-top: 1rem;
  grid-area: h1;
  font-size: 1rem;
  font-weight: lighter;
  letter-spacing: 0.1rem;
  color: ${(props) => props.theme.textHighlight};
  @media (max-width: 1400px) {
    font-size: max(1vw, 0.7rem);
  }
`;

const Name = styled.h3`
  margin: 0;
  grid-area: h3;
  font-size: 5rem;
  font-weight: bold;
  color: ${(props) => props.theme.textMain};
  filter: brightness(1.5);
  @media (max-width: 1400px) {
    font-size: 4.5vw;
  }
`;

const Desc = styled.h2`
  margin: 0;
  grid-area: h2;
  font-size: 3rem;
  font-weight: lighter;
  color: ${(props) => props.theme.textMain};
  @media (max-width: 1400px) {
    font-size: 4.5vw;
  }
`;

const Action = styled.div`
  margin: 0;
  grid-area: action;
  display: grid;
  grid-template-rows: 0.1fr 1fr 0.5fr;
  grid-template-columns: 0.7fr 0.3fr;
  grid-template-areas:
    'e1 button'
    'p button'
    'e2 e3';
`;

const Para = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: lighter;
  grid-area: p;
  color: ${(props) => props.theme.textMain};
  @media (max-width: 1400px) {
    font-size: max(1vw, 0.7rem);
  }
`;

const ActionButton = styled.div`
  margin: 0;
  grid-area: button;
`;

const Canv = styled.div`
  position: relative;
  grid-area: canvas;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    visibility: hidden;
  }
`;

const Hero = (props) => {
  return (
    <HeroWrapper ref={props.fRef}>
      <HeroCentered>
        <Hello>Hello, my name is</Hello>
        <Name>Gui Silva.</Name>
        <Desc>Front end developer.</Desc>
        <Action>
          <Para>
            I am based in Seattle, WA and I enjoy making cool things for the
            web. I build functional and fun websites and aplications. Make sure
            to take a look at my creative coding projects!
          </Para>
          <ActionButton />
        </Action>
        <Canv>
          <HeroShape />
        </Canv>
      </HeroCentered>
    </HeroWrapper>
  );
};

export default Hero;
