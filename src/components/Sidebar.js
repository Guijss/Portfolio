import React from 'react';
import styled, { useTheme } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { sidebarLinks } from '../appLinks';

const SidebarWrapper = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  width: 10%;
  min-width: 7rem;
  margin: 0;
  padding: 0;
  background-color: ${(prosp) => prosp.theme.navMain};
  display: flex;
  flex-direction: column;
  box-shadow: -1px 0px 1px 0px rgba(110, 110, 110, 0.5);
  -webkit-box-shadow: -1px 0px 1px 0px rgba(110, 110, 110, 0.5);
  -moz-box-shadow: -1px 0px 1px 0px rgba(110, 110, 110, 0.5);
  overflow-y: scroll;
  overflow-x: hidden;
  @media (max-width: 800px) {
    width: 20%;
  }

  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const SideBarNav = styled.ul`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
`;

const LinkCont = styled(NavLink)`
  list-style: none;
  width: 100%;
  height: 10vh;
  min-height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  border: 1px solid transparent;
  &:hover {
    backdrop-filter: brightness(1.2);
    cursor: pointer;
  }
`;

const NLink = styled.div`
  width: 100%;
  height: 45%;
  color: ${(props) => props.theme.textMain};
  align-items: center;
  padding-top: 0.7rem;
  font-size: 1rem;
  text-align: center;
`;

const Sidebar = () => {
  const theme = useTheme();
  return (
    <SidebarWrapper>
      <SideBarNav>
        {sidebarLinks.map((obj) => {
          return (
            <LinkCont
              key={obj.key}
              to={obj.to}
              activeStyle={{ color: theme.textHighlight }}
            >
              <NLink>{obj.linkText}</NLink>
            </LinkCont>
          );
        })}
      </SideBarNav>
    </SidebarWrapper>
  );
};

export default Sidebar;
