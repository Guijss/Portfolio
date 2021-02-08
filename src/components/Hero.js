import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.primaryBgCol};
`;

const Hero = () => {
  return <HeroContainer></HeroContainer>;
};

export default Hero;
