import React from 'react';
import Space from '../sketches/Space';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background: rgb(30, 30, 30);
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: row;
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Space />
    </HomeWrapper>
  );
};

export default Home;