import PathFinding from './sketches/PathFinding';
import Tetris from './sketches/Tetris';
import Space from './sketches/Space';

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
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  {
    key: 1,
    linkText: 'Tetris',
    path: '/apps/tetris',
    to: '/apps/tetris',
    component: Tetris,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  {
    key: 2,
    linkText: 'Synthesizer',
    path: '/apps/synth',
    to: '/apps/synth',
    component: Tetris,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  {
    key: 3,
    linkText: 'ScaleViewer',
    path: '/apps/scale',
    to: '/apps/scale',
    component: Tetris,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  {
    key: 4,
    linkText: 'Minesweeper',
    path: '/apps/minesweeper',
    to: '/apps/minesweeper',
    component: Tetris,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  {
    key: 5,
    linkText: 'Space',
    path: '/apps/space',
    to: '/apps/space',
    component: Space,
    style: {
      color: 'rgb(93, 99, 116)',
    },
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
