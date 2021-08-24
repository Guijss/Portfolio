import React from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';
import Sidebar from './Sidebar';

const AppsWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background-color: rgb(30, 30, 30);
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: row;
`;

const Apps = () => {
  return (
    <AppsWrapper>
      <Canvas />
      <Sidebar />
    </AppsWrapper>
  );
};

export default Apps;
