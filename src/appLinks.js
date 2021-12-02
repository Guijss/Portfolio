import SolarSystem from './sketches/SolarSystem';
import PathFinding from './sketches/PathFinding';
import Tetris from './sketches/Tetris';
import Minesweeper from './sketches/Minesweeper';
import Space from './sketches/Space';
import Synth from './sketches/Synth';
import Lightning from './sketches/Lightning';

import Home from './components/Home';
import Apps from './components/Apps';
import Contact from './components/Contact';

export const sidebarLinks = [
  {
    key: 0,
    linkText: 'Solar System',
    path: '/projects/solar',
    to: '/projects/solar',
    component: SolarSystem,
  },
  {
    key: 1,
    linkText: 'PathFinding',
    path: '/projects/pathfinding',
    to: '/projects/pathfinding',
    component: PathFinding,
  },
  {
    key: 2,
    linkText: 'Tetris',
    path: '/projects/tetris',
    to: '/projects/tetris',
    component: Tetris,
  },
  {
    key: 3,
    linkText: 'Minesweeper',
    path: '/projects/minesweeper',
    to: '/projects/minesweeper',
    component: Minesweeper,
  },
  {
    key: 4,
    linkText: 'Synthesizer',
    path: '/projects/synth',
    to: '/projects/synth',
    component: Synth,
  },
  {
    key: 5,
    linkText: 'Scale Viewer',
    path: '/projects/scale',
    to: '/projects/scale',
    component: Tetris,
  },
  {
    key: 6,
    linkText: 'Lightning',
    path: '/projects/lightning',
    to: '/projects/lightning',
    component: Lightning,
  },
  {
    key: 7,
    linkText: 'Space',
    path: '/projects/space',
    to: '/projects/space',
    component: Space,
  },
];

export const navbarLinks = [
  {
    key: 0,
    linkText: 'Home',
    path: '/',
    to: '/',
    exact: true,
    component: Home,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  // {
  //   key: 1,
  //   linkText: 'About',
  //   path: '/about',
  //   to: '/about',
  //   exact: false,
  //   component: About,
  //   style: {
  //     color: 'rgb(93, 99, 116)',
  //   },
  // },
  {
    key: 2,
    linkText: 'Projects',
    path: '/projects',
    to: '/projects',
    exact: false,
    component: Apps,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  {
    key: 3,
    linkText: 'Contact',
    path: '/contact',
    to: '/contact',
    exact: false,
    component: Contact,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
];
