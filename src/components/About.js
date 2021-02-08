import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.primaryBgCol};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const About = () => {
  return <AboutContainer></AboutContainer>;
};

export default About;
