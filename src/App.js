import { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { routes } from './appLinks';

const theme = {
  bgMain: 'rgb(18, 19, 24)',
  bgMainAlpha: 'rgba(22, 22, 27, 50)',
  navMain: 'rgb(17, 17, 22)',
  textMain: 'rgb(147, 152, 159)',
  textHighlight: 'rgb(120, 135, 180)',
  logoCol: 'rgb(150, 170, 200)',
  scrollCol: 'rgb(9, 10, 15)',
  thumbCol: 'rgb(70, 71, 76)',
  thumbHovCol: 'rgb(50, 51, 56)',
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
