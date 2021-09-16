import React from 'react';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  background-color: ${(props) => props.theme.bgMain};
  top: 10vh;
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  background-color: teal;
  border-radius: 50%;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Circle />
    </HomeWrapper>
  );
};

export default Home;
