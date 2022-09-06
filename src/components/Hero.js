import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeroShape from '../sketches/heroShape/HeroShape';
import Fifteen from '../sketches/fifteen/Fifteen';
import Button from './Button';

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.bgMain};
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'roboto', sans-serif;
`;

const HeroCentered = styled.div`
  width: 45%;
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
  z-index: 2;
`;

const Hello = styled.h1`
  margin: 0;
  padding-top: 1rem;
  grid-area: h1;
  font-size: 1rem;
  font-weight: lighter;
  letter-spacing: 0.1rem;
  color: ${(props) => props.theme.textHighlight};
  transform: translate(
    ${(props) => (props.animTimeOuts.first ? 0 : '-130%')},
    0
  );
  transition: transform ease-in 0.7s;
  @media (max-width: 1400px) {
    font-size: max(1vw, 0.7rem);
  }
`;

const Name = styled.h3`
  margin: 0;
  grid-area: h3;
  font-size: 5rem;
  font-family: 'Roboto Slab', serif;
  font-weight: bold;
  color: ${(props) => props.theme.textMain};
  transform: translate(
    ${(props) => (props.animTimeOuts.first ? 0 : '-130%')},
    0
  );
  transition: transform ease-in 0.7s;
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
  transform: translate(
    ${(props) => (props.animTimeOuts.first ? 0 : '-140%')},
    0
  );
  transition: transform ease-in 0.7s;
  @media (max-width: 1400px) {
    font-size: 4.5vw;
  }
`;

const Para = styled.div`
  margin: 0;
  font-weight: lighter;
  grid-area: p;
  display: grid;
  grid-template-rows: 1fr 1.5fr;
  grid-template-areas:
    'txt'
    'btn';
  transform: translate(
    0,
    ${(props) => (props.animTimeOuts.second ? 0 : '200%')}
  );
  transition: transform ease-in 0.7s;
`;

const ParaText = styled.p`
  grid-area: txt;
  padding-right: 50%;
  color: ${(props) => props.theme.textMain};
  font-size: 1rem;
  min-width: 200px;
  @media (max-width: 1400px) {
    font-size: max(1vw, 0.7rem);
  }
`;

const ParaButton = styled.div`
  grid-area: btn;
  padding-left: 35%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  @media only screen and (max-width: 1700px), (max-height: 700px) {
    display: none;
  }
`;

const DasherContainer = styled.div`
  position: absolute;
  width: 1000px;
  height: 1000px;
  left: -7%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1400px), (max-height: 600px) {
    visibility: hidden;
  }
`;

const FifteenContainer = styled.div`
  position: absolute;
  width: 430px;
  height: 400px;
  right: 7%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  transform: translate(
    ${(props) => (props.animTimeOuts.third ? 0 : '180%')},
    0
  );
  transition: transform ease-in 0.5s;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1400px), (max-height: 600px) {
    visibility: hidden;
  }
`;

const Hero = (props) => {
  const [animTimeOuts, setAnimTimeOuts] = useState({
    first: false,
    second: false,
    third: false,
  });

  useEffect(() => {
    const first = () => {
      setAnimTimeOuts({ first: true, second: false, third: false });
    };
    const second = () => {
      setAnimTimeOuts({ first: true, second: true, third: false });
    };
    const third = () => {
      setAnimTimeOuts({ first: true, second: true, third: true });
    };
    setTimeout(() => {
      first();
    }, 300);
    setTimeout(() => {
      second();
    }, 600);
    setTimeout(() => {
      third();
    }, 1000);
  }, []);

  return (
    <HeroWrapper ref={props.fRef}>
      <HeroCentered>
        <Hello animTimeOuts={animTimeOuts}>Hello, my name is</Hello>
        <Name animTimeOuts={animTimeOuts}>Gui Silva.</Name>
        <Desc animTimeOuts={animTimeOuts}> Front-end developer.</Desc>
        <Para animTimeOuts={animTimeOuts}>
          <ParaText>
            I am based in Seattle, WA and I enjoy making cool things for the
            web. I build functional and fun websites and aplications. Make sure
            to take a look at my creative coding projects!
          </ParaText>
          <ParaButton>
            <Button
              sty={{
                btnText: 'Projects',
                width: '130px',
                height: '60px',
                fontSize: '1.3rem',
                hoverCol: 'rgba(36, 44, 66, 0.2)',
                rotation: '0',
                pEvents: 'auto',
              }}
              hasHandler={true}
              clickHandler={() => props.scrollToComp(props.aboutRef)}
            />
          </ParaButton>
        </Para>
      </HeroCentered>
      <DasherContainer>
        {props.activePage === 0 && <HeroShape />}
      </DasherContainer>
      <FifteenContainer animTimeOuts={animTimeOuts}>
        <Fifteen contrast={props.contrast} mainPage={true} />
      </FifteenContainer>
    </HeroWrapper>
  );
};

export default Hero;
