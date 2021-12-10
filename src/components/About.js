import React from 'react';
import styled from 'styled-components';

const AboutWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background-color: ${(props) => props.theme.bgMain};
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const About = (props) => {
  return <AboutWrapper ref={props.fRef} />;
};

export default About;
