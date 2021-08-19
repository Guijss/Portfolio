import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router';
import { sidebarLinks } from '../appLinks';

const CanvasWrapper = styled.div`
  position: relative;
  background: rgb(30, 30, 30);
  padding: 0;
  margin: 0;
  width: 90%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Canvas = (props) => {
  return (
    <CanvasWrapper>
      <Switch>
        {sidebarLinks.map((obj) => {
          return (
            <Route
              key={obj.key}
              path={obj.path}
              render={() => (
                <obj.component
                  isSelected={props.selectedApp === obj.linkText}
                />
              )}
            />
          );
        })}
      </Switch>
    </CanvasWrapper>
  );
};

export default Canvas;
