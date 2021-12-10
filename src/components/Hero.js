import React from 'react';
import styled from 'styled-components';

const HeroWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.bgMain};
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Hero = (props) => {
  return <HeroWrapper ref={props.fRef} />;
};

export default Hero;
