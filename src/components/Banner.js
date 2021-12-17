import styled from 'styled-components';

const BannerWrapper = styled.div`
  position: fixed;
  left: ${(props) => props.sty.left};
  top: 4rem;
  width: ${(props) => props.sty.width};
  height: ${(props) => props.sty.height};
  border-bottom: 1rem solid ${(props) => props.theme.navMain};
  border-bottom-left-radius: 20%;
  border-bottom-right-radius: 20%;
  z-index: 1;
  background-color: ${(props) => props.theme.navMain};
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.6);
  transform: translateY(calc(${(props) => props.cardTranslator}));
  transition: transform 0.7s ease-in-out;
`;

const Banner = (props) => {
  return (
    <BannerWrapper sty={props.sty} cardTranslator={props.cardTranslator}>
      {props.children}
    </BannerWrapper>
  );
};

export default Banner;
