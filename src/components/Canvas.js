import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router';
import { sidebarLinks } from '../appLinks';
import { VscFileCode } from 'react-icons/vsc';
import { useLocation } from 'react-router-dom';

const CanvasWrapper = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    width: 80%;
  }
`;

const GHLink = styled.a`
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 10;
`;

const Canvas = () => {
  const location = useLocation();
  const [source, setSource] = useState('');
  useEffect(() => {
    sidebarLinks.map((obj) => {
      if (obj.path === location.pathname) {
        setSource(obj.source);
      }
      return '';
    });
  }, [location]);
  return (
    <CanvasWrapper>
      {location.pathname !== '/projects' && (
        <GHLink
          href={
            'https://github.com/Guijss/Portfolio/tree/master/src/sketches/' +
            source
          }
          target="_blank"
        >
          <VscFileCode size={50} color="rgb(70, 71, 76)" />
        </GHLink>
      )}
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
