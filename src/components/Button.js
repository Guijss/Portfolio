import styled from 'styled-components';

const Btn = styled.div`
  position: relative;
  text-decoration: none;
  font-family: 'Fredoka', sans-serif;
  font-size: ${(props) => props.sty.fontSize};
  width: ${(props) => props.sty.width};
  height: ${(props) => props.sty.height};
  left: ${(props) => props.sty.left};
  top: ${(props) => props.sty.top};
  color: ${(props) => props.theme.textMain};
  border: 1px solid ${(props) => props.theme.textHighlight};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.bgMain};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  transform: rotate(${(props) => props.sty.rotation}) translate(0, 0);
  transition: transform 0.2s ease;
  pointer-events: ${(props) => props.sty.pEvents};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.sty.hoverCol};
  }
`;

const Button = (props) => {
  return (
    <>
      <Btn
        sty={props.sty}
        onClick={props.hasHandler ? (e) => props.clickHandler(e) : undefined}
      >
        <span>{props.sty.btnText}</span>
      </Btn>
    </>
  );
};

export default Button;
