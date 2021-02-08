import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  position: fixed;
  margin-top: 20vh;
  left: -1vw;
  height: 60vh;
  width: 15vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 999;
  cursor: pointer;
`;

const SidebarItem = styled.div`
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.primaryTextCol};
  &:hover {
    color: ${(props) => props.theme.secondaryTextCol};
  }
`;

const SidebarText = styled.span`
  width: 55%;
  font-family: 'Roboto', sans-serif;
  height: 2rem;
`;

const ProgressBar = styled.div`
  position: absolute;
  left: 2vw;
  width: 0.1rem;
  height: 100%;
  background: ${(props) => props.theme.secondaryBgCol};
  border-radius: 999px;
`;

const ProgressThumb = styled.div`
  position: relative;
  height: 25%;
  filter: brightness(60%);
  background: ${(props) => props.theme.extraCol};
  transition: transform 1s ease-in-out;
  transform: translate(0, ${(props) => props.yPos}%);
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
    switch (selectedPage) {
      case 'about':
        return 100;
      case 'projects':
        return 200;
      case 'contact':
        return 300;
      default:
        return 0;
    }
  };

  return (
    <>
      <SidebarContainer>
        <ProgressBar>
          <ProgressThumb yPos={handleThumb} />
        </ProgressBar>
        <SidebarItem onClick={() => handleClick(0)}>
          <SidebarText>Home</SidebarText>
        </SidebarItem>
        <SidebarItem onClick={() => handleClick(1)}>
          <SidebarText>About</SidebarText>
        </SidebarItem>
        <SidebarItem onClick={() => handleClick(2)}>
          <SidebarText>Projcets</SidebarText>
        </SidebarItem>
        <SidebarItem onClick={() => handleClick(3)}>
          <SidebarText>Contact</SidebarText>
        </SidebarItem>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
