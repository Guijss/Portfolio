import Home from './components/Home';
import Apps from './components/Apps';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <PageWrapper>
      <Router forceRefresh={true}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Apps" component={Apps} />
          <Route path="/Contact" component={Contact} />
        </Switch>
      </Router>
    </PageWrapper>
  );
}

export default App;
