import React, { useState } from 'react';
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
  const [selectedApp, setSelectedApp] = useState(null);
  const handleClick = (sel) => {
    setSelectedApp(sel);
  };
  return (
    <AppsWrapper>
      <Canvas selectedApp={selectedApp} />
      <Sidebar handleClick={handleClick} />
    </AppsWrapper>
  );
};

export default Apps;
