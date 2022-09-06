import styled, { useTheme } from 'styled-components';
import { ReactComponent as LogoImg } from '../assets/Logo.svg';

const List = styled.ol`
  position: relative;
  margin-right: 10rem;
  margin-top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 800px) {
    visibility: hidden;
  }
`;

const Item = styled.li`
  position: relative;
  width: 7rem;
  height: 100%;
  font-size: 1.2rem;
  font-family: 'Fredoka', sans-serif;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textMain};
  text-decoration: none;
  text-align: center;
  transition: color 0.2s ease;
  &:hover {
    color: ${(props) => props.theme.textHighlight};
    cursor: pointer;
  }
`;

const Deco = styled.div`
  position: relative;
  margin-right: 0.5rem;
  margin-top: 0.2rem;
  width: 0.3rem;
  height: 0.2rem;
  background-color: ${(props) => props.col};
  transition: background-color 0.3s ease;
`;

const LogoWrapper = styled.div`
  position: relative;
  left: 0;
  width: 10vh;
  min-width: 3rem;
  height: 100%;
  min-height: 3rem;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(LogoImg)`
  position: relative;
  height: 60%;
  width: 60%;
`;

const Navbar = (props) => {
  const theme = useTheme();

  const setDecoCol = (page, obj) => {
    if (page === obj.key) {
      return 'rgba(120, 135, 180, 1)';
    }
    return 'rgba(120, 135, 180, 0.2)';
  };

  return (
    <>
      <LogoWrapper>
        <Logo fill={theme.logoCol} />
      </LogoWrapper>
      <List>
        {props.navData.map((obj) => {
          return (
            <Item key={obj.key} onClick={() => props.scrollToComp(obj.ref)}>
              <Deco col={() => setDecoCol(props.activePage, obj)} />
              <span>{obj.name}</span>
            </Item>
          );
        })}
      </List>
    </>
  );
};

export default Navbar;
