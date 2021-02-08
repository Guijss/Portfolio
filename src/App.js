import { ThemeProvider } from 'styled-components';
import About from './components/About';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Sidebar from './components/Sidebar';

const theme = {
  primaryBgCol: '#0B0C10',
  secondaryBgCol: '#1F2833',
  primaryTextCol: '#C5C6C7',
  secondaryTextCol: '#66FCF1',
  extraCol: '#45A29E',
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
