import PegSolitaire from '../sketches/pegSolitaire/PegSolitaire';
import styled from 'styled-components';
import {
  PageWrapper,
  PageCentered,
  TitleWrapper,
  Title,
  Separator,
} from './commonStyledComponents';

const PegSolitaireContainer = styled.div`
  position: absolute;
  width: 430px;
  height: 400px;
  right: 7%;
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

const Contact = (props) => {
  return (
    <PageWrapper ref={props.fRef}>
      <TitleWrapper>
        <Title>Contact</Title>
        <Separator />
      </TitleWrapper>
      <PageCentered>
        <PegSolitaireContainer>
          <PegSolitaire />
        </PegSolitaireContainer>
      </PageCentered>
    </PageWrapper>
  );
};

export default Contact;
