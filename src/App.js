import Navbar from './components/Navbar';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { navbarLinks } from './appLinks';

const theme = {
  bgMain: 'rgb(22, 22, 27)',
  navMain: 'rgb(18, 19, 24)',
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
  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <Navbar />
        <div>
          <Switch>
            {navbarLinks.map((obj) => (
              <Route
                path={obj.path}
                exact={obj.exact}
                component={obj.component}
              />
            ))}
          </Switch>
        </div>
        {/* <Route
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
        /> */}
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App;
