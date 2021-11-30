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
    linkText: 'PathFinding',
    path: '/apps/pathfinding',
    to: '/apps/pathfinding',
    component: PathFinding,
  },
  {
    key: 1,
    linkText: 'Tetris',
    path: '/apps/tetris',
    to: '/apps/tetris',
    component: Tetris,
  },
  {
    key: 2,
    linkText: 'Minesweeper',
    path: '/apps/minesweeper',
    to: '/apps/minesweeper',
    component: Minesweeper,
  },
  {
    key: 3,
    linkText: 'Synthesizer',
    path: '/apps/synth',
    to: '/apps/synth',
    component: Synth,
  },
  {
    key: 4,
    linkText: 'Scale Viewer',
    path: '/apps/scale',
    to: '/apps/scale',
    component: Tetris,
  },
  {
    key: 5,
    linkText: 'Lightning',
    path: '/apps/lightning',
    to: '/apps/lightning',
    component: Lightning,
  },
  {
    key: 6,
    linkText: 'Space',
    path: '/apps/space',
    to: '/apps/space',
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
  {
    key: 1,
    linkText: 'Apps',
    path: '/apps',
    to: '/apps',
    exact: false,
    component: Apps,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  {
    key: 2,
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
