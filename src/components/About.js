import React from 'react';
import styled from 'styled-components';

const AboutWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.bgMain} 20%,
    ${(props) => props.theme.navMain} 80%
  );
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AboutCentered = styled.div`
  width: 70%;
  height: 70%;
  font-family: 'Alata', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoWrapper = styled.div`
  position: relative;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const PicWrapper = styled.div`
  position: relative;
  width: 40%;
  height: 100%;
`;

const TitleWrapper = styled.header`
  position: absolute;
  top: 0;
  font-family: 'Alata', sans-serif;
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* @media (max-width: 850px) {
    visibility: hidden;
  } */
`;

const Title = styled.span`
  position: relative;
  width: auto;
  height: auto;
  min-width: 220px;
  color: ${(props) => props.theme.textHighlight};
  font-size: 3rem;
`;

const Separator = styled.div`
  position: relative;
  margin-left: 2rem;
  margin-top: 2rem;
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.textMain};
  opacity: 0.3;
`;

const About = (props) => {
  return (
    <AboutWrapper ref={props.fRef}>
      <AboutCentered>
        <InfoWrapper>
          <TitleWrapper>
            <Title>About Me</Title>
            <Separator />
          </TitleWrapper>
        </InfoWrapper>
        <PicWrapper></PicWrapper>
      </AboutCentered>
    </AboutWrapper>
  );
};

export default About;
