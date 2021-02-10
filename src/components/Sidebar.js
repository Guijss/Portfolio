import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../logo.svg';
import { IconContext } from 'react-icons';
import {
  BsFillHouseFill,
  BsFillPersonFill,
  BsTools,
  BsFillEnvelopeFill,
} from 'react-icons/bs';

const LogoContainer = styled.div`
  position: fixed;
  height: 15vh;
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.secondaryBgCol};
  z-index: 10;
`;

const Logo = styled.img`
  position: relative;
  height: 10vh;
  width: 6rem;
  transform: scale(0.7);
`;

const SidebarContainer = styled.div`
  position: fixed;
  height: 100vh;
  width: 6rem;
  background: ${(props) => props.theme.primaryBgCol};
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  -webkit-box-shadow: 2px 0px 5px 3px #000000;
  box-shadow: 2px 0px 5px 3px #000000;
  &::before {
    content: ' ';
    position: absolute;
    height: 5vh;
    width: 6rem;
    top: 15vh;
    left: 0;
    background: ${(props) => props.theme.secondaryBgCol};
  }

  &::after {
    content: ' ';
    position: absolute;
    height: 20vh;
    width: 6rem;
    bottom: 0;
    left: 0;
    background: ${(props) => props.theme.secondaryBgCol};
  }
`;

const SidebarItem = styled.div`
  position: relative;
  height: 15%;
  width: 100%;
  display: grid;
  place-items: center;
  color: ${(props) => props.theme.primaryTextCol};
  transition: color 0.3s;
  overflow: hidden;
`;

const SidebarItemText = styled.span`
  position: absolute;
  width: 55%;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  height: 2rem;
  opacity: 0;
  transition: opacity 0.5s ease-out;
  z-index: 1;
  ${SidebarItem}:hover & {
    opacity: 1;
  }
`;

const SidebarItemIcon = styled.span`
  position: absolute;
  opacity: 1;
  transition: opacity 0.5s ease-out;
  z-index: 1;
  ${SidebarItem}:hover & {
    opacity: 0;
  }
`;

const SidebarItemBar = styled.div`
  position: absolute;
  left: 10px;
  width: 0.1rem;
  height: 60%;
  border-radius: 999px;
  background: transparent;
  box-shadow: 0 0 0 999px ${(props) => props.theme.secondaryBgCol};
`;
const ProgressThumb = styled.div`
  position: absolute;
  height: 10vh;
  width: 5vw;
  filter: brightness(60%);
  background: ${(props) => props.theme.extraCol};
  transition: transform 0.3s ease-out;
  transform: translate(0, ${(props) => props.yPos}vh);
`;

const Sidebar = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [animating, setAnimating] = useState(false);
  const [timeOut, setTimeOut] = useState(null);

  const handleClick = (loc) => {
    window.clearTimeout(timeOut);
    setAnimating(true);
    window.scrollTo({
      left: 0,
      top: window.innerHeight * loc,
      behavior: 'smooth',
    });
    switch (loc) {
      case 1:
        setSelectedPage('about');
        break;
      case 2:
        setSelectedPage('projects');
        break;
      case 3:
        setSelectedPage('contact');
        break;
      default:
        setSelectedPage('home');
        break;
    }
    setTimeOut(
      window.setTimeout(() => {
        setAnimating(false);
      }, 1000)
    );
  };

  const onScroll = () => {
    if (!animating) {
      if (window.scrollY >= window.innerHeight * 3) {
        setSelectedPage('contact');
      } else if (window.scrollY >= window.innerHeight * 2) {
        setSelectedPage('projects');
      } else if (window.scrollY >= window.innerHeight * 1) {
        setSelectedPage('about');
      } else {
        setSelectedPage('home');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

  const handleThumb = () => {
    const initialPos = -22;
    const spacing = 15;
    switch (selectedPage) {
      case 'about':
        return initialPos + spacing * 1;
      case 'projects':
        return initialPos + spacing * 2;
      case 'contact':
        return initialPos + spacing * 3;
      default:
        return initialPos + spacing * 0;
    }
  };

  return (
    <>
      <IconContext.Provider
        value={{
          size: '25',
          color: '#C5C6C7',
        }}
      >
        <LogoContainer>
          <Logo src={logo} alt="Logo" />
        </LogoContainer>
        <SidebarContainer>
          <ProgressThumb yPos={handleThumb} />
          <SidebarItem onClick={() => handleClick(0)}>
            <SidebarItemBar />
            <SidebarItemText>Home</SidebarItemText>
            <SidebarItemIcon>
              <BsFillHouseFill />
            </SidebarItemIcon>
          </SidebarItem>
          <SidebarItem onClick={() => handleClick(1)}>
            <SidebarItemBar />
            <SidebarItemText>About</SidebarItemText>
            <SidebarItemIcon>
              <BsFillPersonFill />
            </SidebarItemIcon>
          </SidebarItem>
          <SidebarItem onClick={() => handleClick(2)}>
            <SidebarItemBar />
            <SidebarItemText>Projects</SidebarItemText>
            <SidebarItemIcon>
              <BsTools />
            </SidebarItemIcon>
          </SidebarItem>
          <SidebarItem onClick={() => handleClick(3)}>
            <SidebarItemBar />
            <SidebarItemText>Contact</SidebarItemText>
            <SidebarItemIcon>
              <BsFillEnvelopeFill />
            </SidebarItemIcon>
          </SidebarItem>
        </SidebarContainer>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
