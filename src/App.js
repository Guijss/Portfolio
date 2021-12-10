import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { routes } from './appLinks';

const theme = {
  bgMain: 'rgb(22, 22, 27)',
  bgMainAlpha: 'rgba(22, 22, 27, 50)',
  navMain: 'rgb(18, 19, 24)',
  textMain: 'rgb(180, 180, 180)',
  textHighlight: 'rgb(93, 99, 116)',
  logoCol: 'rgb(157, 177, 186)',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        {routes.map((obj) => (
          <Route
            key={obj.key}
            path={obj.path}
            exact={obj.exact}
            component={obj.component}
          />
        ))}
      </Switch>
    </ThemeProvider>
  );
}

export default App;
