import React from 'react';
import styled from 'styled-components';

const ProjectImage = styled.div`
  position: relative;
  background: #000;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
  &:hover {
    transform: translate(8px, -8px);
  }
  z-index: 2;
`;

const BorderLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 8px;
  width: 8px;
  background: ${(props) => props.theme.secondaryBgCol};
  transform-origin: top left;
  transform: rotate(-45deg) scale(0);
  transition: transform 0.3s;
  .img:hover + & {
    transform: rotate(-45deg) scale(1.41);
  }
`;

const FixedBorderLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: calc(15rem - 10px);
  width: 10px;
  background: ${(props) => props.theme.secondaryBgCol};
  &::after {
    content: ' ';
    position: absolute;
    bottom: -7px;
    left: 0;
    width: 8px;
    height: 100%;
    background: ${(props) => props.theme.secondaryBgCol};
    transform: skewY(-45deg);
  }
`;

const BorderBot = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 8px;
  width: 8px;
  filter: brightness(50%);
  background: ${(props) => props.theme.secondaryBgCol};
  transform-origin: bottom right;
  transform: rotate(45deg) scale(0);
  transition: transform 0.3s;
  .img:hover ~ & {
    transform: rotate(45deg) scale(1.41);
  }
`;

const FixedBorderBot = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 10px;
  width: calc(15rem - 10px);
  filter: brightness(50%);
  background: ${(props) => props.theme.secondaryBgCol};
  &::after {
    content: ' ';
    position: absolute;
    left: -7px;
    bottom: 0;
    width: 100%;
    height: 8px;
    background: ${(props) => props.theme.secondaryBgCol};
    transform: skewX(-45deg);
  }
`;

const Background = styled.div`
  position: relative;
  height: 15rem;
  width: 15rem;
`;

const Card = () => {
  return (
    <>
      <Background>
        <ProjectImage className="img" />
        <BorderLeft />
        <FixedBorderLeft />
        <BorderBot />
        <FixedBorderBot />
      </Background>
    </>
  );
};

export default Card;
