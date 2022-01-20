import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Canvas from './Canvas';
import Sidebar from './Sidebar';

const AppsWrapper = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  background-color: ${(props) => props.theme.bgMain};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  z-index: 10;
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
      <Sidebar />
      <Canvas />
    </AppsWrapper>
  );
};

export default Apps;
