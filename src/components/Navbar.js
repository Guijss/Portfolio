import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as LogoImg } from '../Logo.svg';
import { navbarLinks } from '../appLinks';

const NavbarWrapper = styled.div`
  position: relative;
  background: rgb(26, 26, 26);
  z-index: 99;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 10vh;
  min-height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 1);
  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 1);
`;

const List = styled.li`
  position: relative;
  margin-left: 1rem;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Item = styled(NavLink)`
  position: relative;
  margin: 0;
  padding-bottom: 1rem;
  padding-left: 0;
  position: relative;
  width: 7rem;
  height: 1rem;
  font-size: 1.2rem;
  color: rgb(180, 180, 180);
  text-decoration: none;
  text-align: center;
`;

const LogoWrapper = styled.div`
  position: relative;
  left: 0;
  width: 10vh;
  min-width: 3rem;
  height: 10vh;
  min-height: 3rem;
  background: transparent;
  color: white;
  display: flex;
  justify-content: center;
`;

const Logo = styled(LogoImg)`
  position: relative;
  margin-top: 10%;
  height: 80%;
  width: 80%;
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <LogoWrapper>
        <Logo fill="rgb(157, 177, 186)" />
      </LogoWrapper>
      <List>
        {navbarLinks.map((obj) => {
          return (
            <Item
              key={obj.key}
              to={obj.to}
              exact={obj.exact}
              activeStyle={obj.style}
            >
              {obj.linkText}
            </Item>
          );
        })}
      </List>
    </NavbarWrapper>
  );
};

export default Navbar;
