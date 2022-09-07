import PegSolitaire from '../sketches/pegSolitaire/PegSolitaire';
import styled from 'styled-components';
import { PageWrapper } from './commonStyledComponents';
import LightsOut from '../sketches/lightsOut/LightsOut';

const ContactCont = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: 'Roboto', serif;
  display: grid;
  grid-template-areas:
    'title text'
    'title text';
  grid-template-columns: 0.2fr 1.5fr;
  grid-template-rows: 1fr 1fr;
`;

const PageTitle = styled.div`
  position: relative;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'Roboto Slab', serif;
  font-weight: bold;
  color: ${(props) => props.theme.textHighlight};
  font-size: 8rem;
  border-right: 3px solid ${(props) => props.theme.textMain};
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: title;
  margin-top: 10vh;
  margin-bottom: 10vh;
  white-space: nowrap;
  right: 0;
  @media only screen and (max-width: 1700px), (max-height: 700px) {
    display: none;
  }
`;

const TextContainer = styled.div`
  position: relative;
  grid-area: text;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 15rem;
  z-index: 1;
  pointer-events: none;
  @media only screen and (max-width: 1550px), (max-height: 600px) {
    margin-right: 0;
  }
`;

const ContactText = styled.span`
  position: relative;
  width: 30rem;
  font-size: 1.7rem;
  text-align: center;
  color: ${(props) => props.theme.textMain};
  grid-area: text;
  @media only screen and (max-width: 850px) {
    font-size: 1.3rem;
    width: 15rem;
  }
`;

const Btn = styled.div`
  position: relative;
  text-decoration: none;
  width: 20rem;
  height: 5rem;
  margin-top: 3rem;
  color: ${(props) => props.theme.textMain};
  border: 1px solid ${(props) => props.theme.textHighlight};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.bgMain};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: filter 0.2s ease;
  pointer-events: auto;
  &:hover {
    cursor: pointer;
    filter: brightness(2);
  }
  @media only screen and (max-width: 850px) {
    width: 10rem;
  }
`;

const GameContainer = styled.div`
  position: absolute;
  width: 280px;
  height: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  z-index: 0;
  &:hover {
    cursor: pointer;
  }
  @media only screen and (max-width: 1550px), (max-height: 900px) {
    display: none;
  }
`;

const BaseBoard = styled.a`
  position: absolute;
  font-family: 'Alata', sans-serif;
  color: ${(props) => props.theme.textMain};
  font-size: 0.7rem;
  font-weight: lighter;
  text-decoration: none;
  bottom: 1rem;
`;

const clickHandler = (e) => {
  window.location.href = 'mailto:guijsilva4@gmail.com';
  e.preventDefault();
};

const Contact = (props) => {
  return (
    <PageWrapper ref={props.fRef}>
      <ContactCont>
        <PageTitle>Get In Touch!</PageTitle>
        <TextContainer>
          <ContactText>
            I would love to hear what you think! Don't hesitate to contact me
            with any questions you might have or perhaps send me some good
            advice! Good jokes are always welcome.
          </ContactText>
          <Btn onClick={(e) => clickHandler(e)}>Contact Me!</Btn>
        </TextContainer>
      </ContactCont>
      <GameContainer style={{ top: '10%', right: '10%' }}>
        <PegSolitaire contrast={props.contrast} mainPage={true} />
      </GameContainer>
      <GameContainer style={{ bottom: '10%', right: '10%' }}>
        <LightsOut contrast={props.contrast} mainPage={true} />
      </GameContainer>
      <BaseBoard href="https://github.com/Guijss/Portfolio" target="_blank">
        <span>Designed and coded by Gui Silva.</span>
      </BaseBoard>
    </PageWrapper>
  );
};

export default Contact;
