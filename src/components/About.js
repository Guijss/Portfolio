import styled from 'styled-components';
import { PageWrapper } from './commonStyledComponents';
import { images } from '../appLinks';
import { GoMarkGithub } from 'react-icons/go';

const AboutCont = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  font-family: 'Roboto', serif;
  display: grid;
  grid-template-areas:
    'proj title'
    'proj title';
  grid-template-columns: 1.5fr 0.2fr;
  grid-template-rows: 1fr 1fr;
`;

const PageTitle = styled.div`
  position: relative;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'Roboto Slab', serif;
  font-weight: bold;
  color: ${(props) => props.theme.textHighlight};
  font-size: 10rem;
  border-left: 3px solid ${(props) => props.theme.textMain};
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: title;
  margin-top: 10vh;
  margin-bottom: 10vh;
  //border: 1px solid white;
  right: 0;
  @media only screen and (max-width: 1700px), (max-height: 700px) {
    display: none;
  }
`;

const Images = styled.div`
  position: relative;
  grid-area: proj;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-area: ${(props) => props.area};
  min-width: 10rem;
  min-height: calc(10rem / 1.66);
`;

const ImageName = styled.span`
  position: absolute;
  width: 100%;
  color: ${(props) => props.theme.textMain};
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -3rem;
  filter: brightness(1.3);
  transition: color ease 0.5s;
  @media only screen and (max-width: 1700px) {
    font-size: 1rem;
  }
`;

const Image = styled.img`
  position: absolute;
  width: 100%; //calc(1345px * 0.3);
  height: 100%; //calc(810px * 0.3);
  border-radius: 1rem;
  filter: grayscale(0.8);
  transform: translate(0, 0);
  transition: filter ease-in-out 0.5s, transform ease-in-out 0.5s;
  &:hover {
    filter: grayscale(0);
    transform: translate(3px, -3px);
    cursor: pointer;
  }
`;

const ImageDesc = styled.span`
  position: absolute;
  color: ${(props) => props.theme.textMain};
  font-size: 1rem;
  margin-top: 0.3rem;
  bottom: -3rem;
  @media only screen and (max-width: 1500px) {
    display: none;
  }
`;

const ImageBackdrop = styled.a`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.textMain};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover + ${ImageName} {
    color: ${(props) => props.theme.textHighlight};
  }
`;

const GHLink = styled.a`
  position: absolute;
  right: 1rem;
  color: ${(props) => props.theme.textMain};
  transition: filter ease-in-out 0.5s;
  filter: brightness(1);
  &:hover {
    cursor: pointer;
    filter: brightness(2);
  }
  @media only screen and (max-width: 1500px) {
    display: none;
  }
`;

const About = (props) => {
  return (
    <PageWrapper ref={props.fRef}>
      <AboutCont>
        <Images>
          {images.map((e, i) => {
            return (
              <ImageContainer
                key={i}
                area={e.area}
                style={{
                  width: props.screenSize.w / 5,
                  height: props.screenSize.w / (5 * 1.66),
                  margin: '2rem',
                }}
              >
                <ImageBackdrop href={e.url} target="_blank">
                  <Image src={e.source} />
                </ImageBackdrop>
                <ImageName>
                  {e.name}
                  <GHLink href={e.ghUrl} target="_blank">
                    <GoMarkGithub size={20} />
                  </GHLink>
                </ImageName>
                <ImageDesc>{e.desc}</ImageDesc>
              </ImageContainer>
            );
          })}
        </Images>
        <PageTitle>Projects</PageTitle>

        {/* <AboutCont>
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
        <LightsOut contrast={props.contrast} />
      </LightsOutContainer> */}
      </AboutCont>
    </PageWrapper>
  );
};

export default About;
