import styled from 'styled-components';

export const PageWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.bgMain} 20%,
    ${(props) => props.theme.navMain} 80%
  );
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PageCentered = styled.div`
  width: 50%;
  height: 70%;
  font-family: 'Alata', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleWrapper = styled.header`
  position: relative;
  margin-left: 10%;
  font-family: 'Alata', sans-serif;
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Title = styled.span`
  position: relative;
  width: auto;
  height: auto;
  min-width: 220px;
  color: ${(props) => props.theme.textHighlight};
  font-size: 2rem;
`;

export const Separator = styled.div`
  position: relative;
  margin-left: 2rem;
  margin-top: 2rem;
  width: 20%;
  height: 1px;
  background-color: ${(props) => props.theme.textMain};
  opacity: 0.3;
`;
