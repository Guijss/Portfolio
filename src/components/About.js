import styled from 'styled-components';
import {
  PageWrapper,
  PageCentered,
  TitleWrapper,
  Title,
  Separator,
} from './commonStyledComponents';

const InfoWrapper = styled.div`
  position: relative;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const CornerBorder = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 7rem;
  height: 7rem;
  background: transparent;
  border-bottom: 1px solid rgba(147, 152, 159, 0.1);
  border-right: 1px solid rgba(147, 152, 159, 0.1);
`;

const PicWrapper = styled.div`
  position: relative;
  width: 40%;
  height: 100%;
`;

const About = (props) => {
  return (
    <PageWrapper ref={props.fRef}>
      <TitleWrapper>
        <Title>About Me</Title>
        <Separator />
      </TitleWrapper>
      <PageCentered>
        <InfoWrapper>
          <CornerBorder />
        </InfoWrapper>
        <PicWrapper></PicWrapper>
      </PageCentered>
    </PageWrapper>
  );
};

export default About;
