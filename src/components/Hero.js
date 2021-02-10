import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  height: 100vh;
  width: calc(100vw - 6rem);
  margin-left: 6rem;
  background: ${(props) => props.theme.primaryBgCol};
`;

const Hero = () => {
  return <HeroContainer></HeroContainer>;
};

export default Hero;
