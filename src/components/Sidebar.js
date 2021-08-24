import React from 'react';
import styled from 'styled-components';
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
  background-color: rgb(20, 20, 20);
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
  margin: 0;
  padding: 0;
`;

const LinkCont = styled.li`
  list-style: none;
  width: 100%;
  height: 3vh;
  min-height: 3rem;
  display: flex;
  justify-content: space-around;
  border: 1px solid transparent;
  &:hover {
    backdrop-filter: brightness(1.2);
  }
`;

const NLink = styled(NavLink)`
  width: 100%;
  height: 100%;
  color: rgb(180, 180, 180);
  align-items: center;
  padding-top: 0.7rem;
  font-size: 1rem;
  text-decoration: none;
  text-align: center;
`;

const Sidebar = (props) => {
  return (
    <SidebarWrapper>
      <SideBarNav>
        {sidebarLinks.map((obj) => {
          return (
            <LinkCont key={obj.key}>
              <NLink to={obj.to} activeStyle={obj.style}>
                {obj.linkText}
              </NLink>
            </LinkCont>
          );
        })}
      </SideBarNav>
    </SidebarWrapper>
  );
};

export default Sidebar;
