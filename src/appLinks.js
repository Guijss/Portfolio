import PathFinding from './sketches/PathFinding';
import Tetris from './sketches/Tetris';
import Space from './sketches/Space';
import BeatMaker from './sketches/BeatMaker';
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
    linkText: 'Minesweeper',
    path: '/apps/minesweeper',
    to: '/apps/minesweeper',
    component: Tetris,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  {
    key: 3,
    linkText: 'Beat Maker',
    path: '/apps/beat',
    to: '/apps/beat',
    component: BeatMaker,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  {
    key: 4,
    linkText: 'Synthesizer',
    path: '/apps/synth',
    to: '/apps/synth',
    component: Synth,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  {
    key: 5,
    linkText: 'Scale Viewer',
    path: '/apps/scale',
    to: '/apps/scale',
    component: Tetris,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  {
    key: 6,
    linkText: 'Lightning',
    path: '/apps/lightning',
    to: '/apps/lightning',
    component: Lightning,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
  {
    key: 7,
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
