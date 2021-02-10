import { ThemeProvider } from 'styled-components';
import About from './components/About';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Sidebar from './components/Sidebar';

const theme = {
  primaryBgCol: '#0E0E11',
  secondaryBgCol: '#1F1F23',
  primaryTextCol: '#C5C6C7',
  secondaryTextCol: '#66FCF1',
  extraCol: '#45A29E',
  cardLightCol: '#3c3c44',
  cardDarkCol: '#242429',
};

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Sidebar />
        <Hero />
        <About />
        <Projects />
        <Contact />
      </ThemeProvider>
    </>
  );
}

export default App;
