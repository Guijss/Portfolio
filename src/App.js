import Navbar from './components/Navbar';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { navbarLinks } from './appLinks';

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <PageWrapper>
      <Router>
        <Navbar />
        <Switch>
          {navbarLinks.map((obj) => {
            return (
              <Route
                key={obj.key}
                path={obj.path}
                exact={obj.exact}
                component={obj.component}
              />
            );
          })}
        </Switch>
      </Router>
    </PageWrapper>
  );
}

export default App;
