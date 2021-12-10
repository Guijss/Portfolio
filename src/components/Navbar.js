import React from 'react';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as LogoImg } from '../assets/Logo.svg';

const List = styled.ol`
  position: relative;
  margin-right: 5rem;
  margin-top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Item = styled.li`
  position: relative;
  width: 10rem;
  height: 100%;
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textMain};
  text-decoration: none;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const LogoWrapper = styled.div`
  position: relative;
  left: 0;
  width: 10vh;
  min-width: 3rem;
  height: 100%;
  min-height: 3rem;
  background-color: transparent;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(LogoImg)`
  position: relative;
  height: 60%;
  width: 60%;
`;

const Navbar = (props) => {
  const theme = useTheme();
  return (
    <>
      <LogoWrapper>
        <Logo fill={theme.logoCol} />
      </LogoWrapper>
      <List>
        {props.navData.map((obj) => {
          return (
            <Item key={obj.key} onClick={() => props.scrollToComp(obj.ref)}>
              <span>{obj.name}</span>
            </Item>
          );
        })}
      </List>
    </>
  );
};

export default Navbar;
