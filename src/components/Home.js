import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Contact from './Contact';
import { ImBrightnessContrast } from 'react-icons/im';

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

const ContrastCont = styled.div`
  position: absolute;
  width: 15vw;
  right: 10%;
  top: 5vh;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const ContrastIcon = styled.div`
  position: relative;
  width: 15%;
  height: auto;
  margin-top: 7px;
`;

const ContrastSlider = styled.input`
  position: relative;
  -webkit-appearance: none;
  width: 80%;
  background: transparent;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    background-color: ${(props) => props.theme.scrollCol};
    border-radius: 5px;
    border: 0px solid ${(props) => props.theme.scrollCol};
  }
  &::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 25px;
    width: 25px;
    margin-left: 1px;
    margin-top: -6px;
    border-radius: 12px;
    background-color: ${(props) => props.theme.thumbCol};
    cursor: pointer;
    -webkit-appearance: none;
  }
  &::-moz-range-track {
    width: 100%;
    height: 10px;
    background-color: ${(props) => props.theme.scrollCol};
    border-radius: 5px;
    border: 0px solid ${(props) => props.theme.scrollCol};
  }
  &::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 25px;
    width: 25px;
    margin-left: 1px;
    margin-top: -6px;
    border-radius: 12px;
    background-color: ${(props) => props.theme.thumbCol};
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 10px;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: ${(props) => props.theme.scrollCol};
    border: 0px solid #000000;
    border-radius: 28px;
    box-shadow: 1px 1px 1px ${(props) => props.theme.scrollCol};
  }
  &::-ms-fill-upper {
    background: ${(props) => props.theme.scrollCol};
    border: 0px solid #000000;
    border-radius: 28px;
    box-shadow: 1px 1px 1px ${(props) => props.theme.scrollCol};
  }
  &::-ms-thumb {
    box-shadow: 0px 0px 0px #000000;
    border: 0px solid #000000;
    height: 10px;
    width: 20px;
    margin-left: 1px;
    margin-top: -2px;
    border-radius: 12px;
    background: ${(props) => props.theme.thumbCol};
    cursor: pointer;
  }
`;

const Home = () => {
  const mainRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const [buttonVisibility, setButtonVisibility] = useState(0);
  const [isClickable, setIsClickable] = useState('none');
  const [contrast, setContrast] = useState(1);

  useEffect(() => {
    const mainDOM = mainRef.current;
    mainDOM.addEventListener('scroll', handleScroll);
    return () => mainDOM.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    const currentPos = mainRef.current.scrollTop;
    if (currentPos < aboutRef.current.offsetTop) {
      setActivePage(0);
      setButtonVisibility(0);
      setIsClickable('none');
    } else if (
      currentPos >= aboutRef.current.offsetTop &&
      currentPos < contactRef.current.offsetTop
    ) {
      setActivePage(1);
      setButtonVisibility(1);
      setIsClickable('auto');
    } else if (currentPos >= contactRef.current.offsetTop) {
      setActivePage(2);
      setButtonVisibility(1);
      setIsClickable('auto');
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

  const handleChange = (e) => {
    setContrast(e.target.value);
  };

  return (
    <>
      <NavbarWrapper>
        <Navbar
          navData={navData}
          scrollToComp={scrollToComp}
          activePage={activePage}
          buttonVisibility={buttonVisibility}
          isClickable={isClickable}
        />
      </NavbarWrapper>
      <MainWeapper ref={mainRef}>
        <ContrastCont>
          <ContrastIcon>
            <ImBrightnessContrast size={25} color="rgb(120, 120, 120)" />
          </ContrastIcon>
          <ContrastSlider
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={contrast}
            onChange={handleChange}
          />
        </ContrastCont>
        <Hero fRef={homeRef} activePage={activePage} contrast={contrast} />
        <About fRef={aboutRef} contrast={contrast} />
        <Contact fRef={contactRef} contrast={contrast} />
      </MainWeapper>
      ;
    </>
  );
};

export default Home;
