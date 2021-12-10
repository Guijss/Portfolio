import { useRef } from 'react';
import styled from 'styled-components';

import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Contact from './Contact';

const NavbarWrapper = styled.div`
  position: fixed;
  background-color: ${(props) => props.theme.navMain};
  z-index: 99;
  width: 100vw;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.6);
`;

const MainWeapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.bgMain};
  width: 100vw;
  height: calc(300vh - 12rem);
  top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navData = [
    {
      key: 0,
      name: 'Home',
      ref: homeRef,
    },
    {
      key: 1,
      name: 'About',
      ref: aboutRef,
    },
    {
      key: 2,
      name: 'Contact',
      ref: contactRef,
    },
  ];
  const scrollToComp = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <NavbarWrapper>
        <Navbar navData={navData} scrollToComp={scrollToComp} />
      </NavbarWrapper>
      <MainWeapper>
        <Hero fRef={homeRef} />
        <About fRef={aboutRef} />
        <Contact fRef={contactRef} />
      </MainWeapper>
      ;
    </>
  );
};

export default Home;
