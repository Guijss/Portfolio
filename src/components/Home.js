import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Contact from './Contact';
import Banner from './Banner';
import Button from './Button';

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
  height: calc(100vh - 4rem);
  top: 4rem;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 16px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.scrollCol};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.thumbCol};
    border: 3px solid ${(props) => props.theme.scrollCol};
    border-radius: 10px;
    &:hover {
      background-color: ${(props) => props.theme.thumbHovCol};
    }
  }
`;

const Home = () => {
  const mainRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const mainDOM = mainRef.current;
    mainDOM.addEventListener('scroll', handleScroll);
    return () => mainDOM.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    const currentPos = mainRef.current.scrollTop;
    if (currentPos < aboutRef.current.offsetTop) {
      setActivePage(0);
    } else if (
      currentPos >= aboutRef.current.offsetTop &&
      currentPos < contactRef.current.offsetTop
    ) {
      setActivePage(1);
    } else if (currentPos >= contactRef.current.offsetTop) {
      setActivePage(2);
    }
  };

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
    mainRef.current.scrollTo({
      top: ref.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  };

  const cardTranslator = () => {
    if (activePage > 0) {
      return 0;
    }
    return '-9.5rem';
  };

  return (
    <>
      <NavbarWrapper>
        <Navbar
          navData={navData}
          scrollToComp={scrollToComp}
          activePage={activePage}
        />
      </NavbarWrapper>
      <MainWeapper ref={mainRef}>
        <Banner
          cardTranslator={cardTranslator}
          sty={{
            top: '4rem',
            left: 'calc(100vw - 15rem)',
            width: '10rem',
            height: '5rem',
            diagWidth: '10rem',
            diagHeight: '2rem',
          }}
        >
          <Button
            sty={{
              btnText: 'Projects',
              width: '8rem',
              height: '4rem',
              left: '1rem',
              top: '1rem',
              hoverCol: 'rgba(36, 44, 66)',
              rotation: '0',
            }}
            to="/projects"
          />
        </Banner>
        <Hero fRef={homeRef} activePage={activePage} />
        <About fRef={aboutRef} />
        <Contact fRef={contactRef} />
      </MainWeapper>
      ;
    </>
  );
};

export default Home;
