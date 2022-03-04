import styled from 'styled-components';
import LightsOut from '../sketches/lightsOut/LightsOut';
import {
  PageWrapper,
  PageCentered,
  TitleWrapper,
  Title,
  Separator,
} from './commonStyledComponents';

const InfoText = styled.div`
  position: absolute;
  width: 40rem;
  right: 25%;
  font-family: 'Alata', sans-serif;
  color: ${(props) => props.theme.textMain};
  z-index: 1;
`;

const LightsOutContainer = styled.div`
  position: absolute;
  width: 430px;
  height: 400px;
  left: 7%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  opacity: 0.5;
  z-index: 0;
  @media (max-width: 1400px), (max-height: 600px) {
    visibility: hidden;
  }
`;

const About = (props) => {
  return (
    <PageWrapper ref={props.fRef}>
      <TitleWrapper>
        <Title>About Me</Title>
        <Separator />
      </TitleWrapper>
      <PageCentered>
        <InfoText>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque at
          aliquid sed laborum quisquam hic explicabo rerum recusandae libero
          voluptatum voluptatem, voluptatibus, alias blanditiis incidunt cum
          minima nihil inventore, harum odio non voluptates perspiciatis eveniet
          autem. Possimus ullam neque est eum? Ipsum quam, ut, enim ea, sit
          fugiat quisquam inventore veniam ducimus dolor quaerat vero suscipit
          itaque voluptates! Obcaecati dignissimos eveniet quisquam dolores
          maxime sunt molestiae labore! Eaque, culpa ipsum!
        </InfoText>
        <LightsOutContainer>
          <LightsOut />
        </LightsOutContainer>
      </PageCentered>
    </PageWrapper>
  );
};

export default About;
