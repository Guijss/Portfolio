import { ThemeProvider } from 'styled-components';
import Home from './components/Home';

const theme = {
  bgMain: 'rgb(18, 19, 24)',
  navMain: 'rgb(17, 17, 22)',
  textMain: 'rgb(147, 152, 159)',
  textHighlight: 'rgb(140, 155, 210)',
  logoCol: 'rgb(150, 170, 200)',
  scrollCol: 'rgb(9, 10, 15)',
  thumbCol: 'rgb(70, 71, 76)',
  thumbHovCol: 'rgb(50, 51, 56)',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
