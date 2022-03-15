import styled from 'styled-components';
import LightsOut from '../sketches/lightsOut/LightsOut';
import { PageWrapper } from './commonStyledComponents';

const AboutCont = styled.div`
  position: absolute;
  width: 40rem;
  right: 20%;
  font-family: 'Fredoka', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 850px) {
    width: 20rem;
  }
`;

const AboutTitle = styled.span`
  position: relative;
  padding: 2rem;
  font-size: 4rem;
  font-family: 'Roboto Slab', serif;
  font-weight: bold;
  color: ${(props) => props.theme.textHighlight};
  @media (max-width: 850px) {
    font-size: 2rem;
  }
`;

const AboutText = styled.span`
  position: relative;
  padding-bottom: 5rem;
  font-size: 1.2rem;
  text-align: center;
  color: ${(props) => props.theme.textMain};
  @media (max-width: 850px) {
    font-size: 1rem;
  }
`;

const LightsOutContainer = styled.div`
  position: absolute;
  width: 430px;
  height: 400px;
  left: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  z-index: 0;
  @media (max-width: 1550px), (max-height: 600px) {
    visibility: hidden;
  }
`;

const About = (props) => {
  return (
    <PageWrapper ref={props.fRef}>
      <AboutCont>
        <AboutTitle>About</AboutTitle>
        <AboutText>
          Hello! My name is Guilherme Silva. I am a mechanical engineer that
          always had a passion for coding fun and engaging things. Recently I
          have decided to make a life change and pursue a place in the industry
          that I actually want to be in. <br />
          My coding journey started back in my teenage years where I learned it
          to use in an online game. Shortly after that I came in contact with
          JavaScript and more recently with ReactJS. <br />
          Like almost everything else in my life, my coding knowledge was
          acquired through self teaching and it is in a constant improving
          state.
        </AboutText>
      </AboutCont>

      <LightsOutContainer>
        <LightsOut />
      </LightsOutContainer>
    </PageWrapper>
  );
};

export default About;
