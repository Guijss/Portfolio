import styled from 'styled-components';

const BannerWrapper = styled.div`
  position: fixed;
  left: ${(props) => props.sty.left};
  top: 4rem;
  z-index: 1;
  background-color: ${(props) => props.theme.navMain};
  transform: translateY(calc(${(props) => props.cardTranslator}));
  transition: transform 0.5s ease-out;
`;

const BannerMain = styled.div`
  position: absolute;
  width: ${(props) => props.sty.width};
  height: ${(props) => props.sty.height};
  background-color: inherit;
`;

const BannerLeft = styled.div`
  position: absolute;
  width: ${(props) => props.sty.diagWidth};
  height: ${(props) => props.sty.diagHeight};
  top: ${(props) => props.sty.height};
  background-color: inherit;
  transform-origin: top left;
  transform: skewX(45deg);
`;

const BannerRight = styled.div`
  position: absolute;
  width: ${(props) => props.sty.diagWidth};
  height: ${(props) => props.sty.diagHeight};
  top: ${(props) => props.sty.height};
  left: calc(${(props) => props.sty.width} - ${(props) => props.sty.diagWidth});
  background-color: inherit;
  transform-origin: top right;
  transform: skewX(-45deg);
`;

const Banner = (props) => {
  return (
    <BannerWrapper sty={props.sty} cardTranslator={props.cardTranslator}>
      <BannerMain sty={props.sty} />
      <BannerLeft sty={props.sty} />
      <BannerRight sty={props.sty} />
      {props.children}
    </BannerWrapper>
  );
};

export default Banner;
