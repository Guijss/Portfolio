import styled from 'styled-components';
import { Switch, Route } from 'react-router';
import { sidebarLinks } from '../appLinks';

const CanvasWrapper = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    width: 80%;
  }
`;

const Canvas = () => {
  return (
    <CanvasWrapper>
      <Switch>
        {sidebarLinks.map((obj) => {
          return (
            <Route
              exact
              key={obj.key}
              path={obj.path}
              component={obj.component}
            />
          );
        })}
      </Switch>
    </CanvasWrapper>
  );
};

export default Canvas;
