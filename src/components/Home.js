import React from 'react';
import styled from 'styled-components';
import Puzzle15 from '../sketches/Puzzle15';

const HomeWrapper = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  background-color: ${(props) => props.theme.bgMain};
  top: 10vh;
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FrontGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bgMain};
  opacity: 0.6;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Puzzle15 />
      <FrontGround />
    </HomeWrapper>
  );
};

export default Home;
