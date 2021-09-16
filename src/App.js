import { useState } from 'react';
import Navbar from './components/Navbar';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Apps from './components/Apps';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const theme = {
  bgMain: 'rgb(30, 30, 30)',
  navMain: 'rgb(26, 26, 26)',
  textMain: 'rgb(180, 180, 180)',
  textHighlight: 'rgb(93, 99, 116)',
  logoCol: 'rgb(157, 177, 186)',
};

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const location = useLocation();
  const [inApp, setInApp] = useState(false);
  const handleApp = (objName) => {
    setInApp(objName === 'Apps');
  };
  const genKey = (path) => {
    return path.includes('/apps') ? '/apps' : path;
  };

  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <Navbar handleApp={handleApp} />
        <Route path="/" children={<Home />} />
        <Route
          render={() => (
            <>
              <TransitionGroup>
                <CSSTransition
                  in={inApp}
                  key={genKey(location.pathname)} //IMPORTANT!!
                  timeout={1500}
                  classNames="app"
                  unmountOnExit
                >
                  <Switch location={location}>
                    <Route path="/apps" children={<Apps />} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </>
          )}
        />
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App;
