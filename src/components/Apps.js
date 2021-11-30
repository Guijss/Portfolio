import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';
import Sidebar from './Sidebar';

const AppsWrapper = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  background-color: ${(props) => props.theme.bgMain};
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  z-index: 10;

  .app-enter {
    transform: translateX(1);
    z-index: 10;
  }

  .app-enter-active {
    transform: translateX(0);
    transition: transform 1.5s cubic-bezier(0.61, 1.59, 0.13, 0.73);
    z-index: 10;
  }

  .app-exit {
    transform: translateX(0);
    z-index: 10;
  }

  .app-exit-active {
    transform: translateX(1);
    transition: transform 1.5s ease-in-out;
    z-index: 10;
  }
`;

const Apps = () => {
  const [posX, setPosX] = useState(0);
  const myRef = useRef(null);
  const divX =
    myRef.current === null ? null : myRef.current.getBoundingClientRect().x;
  useEffect(() => {
    setPosX(
      myRef.current.getBoundingClientRect().x /
        myRef.current.getBoundingClientRect().width
    );
  }, [posX, divX]);
  return (
    <AppsWrapper ref={myRef} posX={posX}>
      <Canvas />
      <Sidebar />
    </AppsWrapper>
  );
};

export default Apps;
