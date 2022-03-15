import PegSolitaire from '../sketches/pegSolitaire/PegSolitaire';
import styled from 'styled-components';
import Button from './Button';
import { PageWrapper } from './commonStyledComponents';

const ContactCont = styled.div`
  position: absolute;
  width: 40rem;
  left: 20%;
  font-family: 'Fredoka', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 850px) {
    width: 20rem;
  }
`;

const GetInTouch = styled.span`
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

const ContactText = styled.span`
  position: relative;
  padding-bottom: 5rem;
  font-size: 1.3rem;
  text-align: center;
  color: ${(props) => props.theme.textMain};
  @media (max-width: 850px) {
    font-size: 1rem;
  }
`;

const PegSolitaireContainer = styled.div`
  position: absolute;
  width: 430px;
  height: 400px;
  right: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  z-index: 0;
  @media (max-width: 1550px), (max-height: 600px) {
    visibility: hidden;
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
        <GetInTouch>Get In Touch!</GetInTouch>
        <ContactText>
          I would love to hear what you think! Don't hesitate to ask me any
          questions you might have or perhaps send some good advice. Good jokes
          are also welcome.
        </ContactText>
        <Button
          sty={{
            btnText: 'Contact Me!',
            width: '15rem',
            height: '5rem',
            fontSize: '1.5rem',
            hoverCol: 'rgba(36, 44, 66, 0.4)',
            rotation: '0',
            pEvents: true,
          }}
          to="#"
          hasHandler={true}
          clickHandler={clickHandler}
        />
      </ContactCont>
      <PegSolitaireContainer>
        <PegSolitaire />
      </PegSolitaireContainer>
      <BaseBoard href="https://github.com/Guijss/Portfolio" target="_blank">
        <span>Designed and coded by Gui Silva.</span>
      </BaseBoard>
    </PageWrapper>
  );
};

export default Contact;
