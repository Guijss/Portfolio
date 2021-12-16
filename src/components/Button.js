import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Btn = styled(Link)`
  position: relative;
  text-decoration: none;
  font-family: 'Alata', sans-serif;
  font-size: 1.3rem;
  width: ${(props) => props.sty.width};
  height: ${(props) => props.sty.height};
  left: ${(props) => props.sty.left};
  top: ${(props) => props.sty.top};
  color: ${(props) => props.theme.textMain};
  border: 1px solid ${(props) => props.theme.textHighlight};
  border-radius: 10px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  transform: rotate(${(props) => props.sty.rotation});
  &:hover {
    background-color: ${(props) => props.sty.hoverCol};
  }
`;

const Button = (props) => {
  return (
    <Btn sty={props.sty} to={props.to}>
      <span>{props.sty.btnText}</span>
    </Btn>
  );
};

export default Button;
