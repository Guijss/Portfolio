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
  grid-template-areas:
    'e1'
    'h1'
    'h3'
    'h2'
    'p'
    'p';
  font-family: 'Alata', sans-serif;
  z-index: 1;
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
  @media (max-width: 600px) {
    font-size: 10vw;
  }
`;

const Desc = styled.h2`
  margin: 0;
  grid-area: h2;
  font-size: 3rem;
  font-weight: lighter;
  color: ${(props) => props.theme.textHighlight};
  filter: brightness(1.3);
  @media (max-width: 1400px) {
    font-size: 4.5vw;
  }
`;

const Para = styled.div`
  margin: 0;
  font-weight: lighter;
  grid-area: p;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'txt btn';
`;

const ParaText = styled.p`
  grid-area: txt;
  color: ${(props) => props.theme.textMain};
  font-size: 1rem;
  @media (max-width: 1400px) {
    font-size: max(1vw, 0.7rem);
  }
`;

const ParaButton = styled.div`
  grid-area: btn;
`;

const Canv = styled.div`
  position: absolute;
  width: 550px;
  height: 550px;
  right: 10%;
  top: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  @media (max-width: 1100px), (max-height: 600px) {
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
        <Para>
          <ParaText>
            I am based in Seattle, WA and I enjoy making cool things for the
            web. I build functional and fun websites and aplications. Make sure
            to take a look at my creative coding projects!
          </ParaText>
          <ParaButton />
        </Para>
      </HeroCentered>
      <Canv>
        <HeroShape />
      </Canv>
    </HeroWrapper>
  );
};

export default Hero;
