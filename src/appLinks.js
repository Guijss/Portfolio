import SolarSystem from './sketches/solarSystem/SolarSystem';
import PathFinding from './sketches/pathfinding/PathFinding';
import Tetris from './sketches/tetris/Tetris';
import Minesweeper from './sketches/minesweeper/Minesweeper';
import Scale from './sketches/scale/Scale';
import Space from './sketches/space/Space';
import Synth from './sketches/synth/Synth';
import Fifteen from './sketches/fifteen/Fifteen';
import LightsOut from './sketches/lightsOut/LightsOut';
import PegSolitaire from './sketches/pegSolitaire/PegSolitaire';

import Home from './components/Home';
import Apps from './components/Apps';

export const sidebarLinks = [
  {
    key: 0,
    linkText: 'Solar System',
    path: '/projects/solar',
    to: '/projects/solar',
    source: 'solarSystem',
    component: SolarSystem,
  },
  {
    key: 1,
    linkText: 'PathFinding',
    path: '/projects/pathfinding',
    to: '/projects/pathfinding',
    source: 'pathfinding',
    component: PathFinding,
  },
  {
    key: 2,
    linkText: 'Scale Viewer',
    path: '/projects/scale',
    to: '/projects/scale',
    source: 'scale',
    component: Scale,
  },
  {
    key: 3,
    linkText: 'Tetris',
    path: '/projects/tetris',
    to: '/projects/tetris',
    source: 'tetris',
    component: Tetris,
  },
  {
    key: 4,
    linkText: 'Minesweeper',
    path: '/projects/minesweeper',
    to: '/projects/minesweeper',
    source: 'minesweeper',
    component: Minesweeper,
  },
  {
    key: 5,
    linkText: 'Synthesizer',
    path: '/projects/synth',
    to: '/projects/synth',
    source: 'synth',
    component: Synth,
  },
  {
    key: 6,
    linkText: 'Space',
    path: '/projects/space',
    to: '/projects/space',
    source: 'space',
    component: Space,
  },
  {
    key: 7,
    linkText: 'Fifteen Slide',
    path: '/projects/fifteen',
    to: '/projects/fifteen',
    source: 'fifteen',
    component: Fifteen,
  },
  {
    key: 8,
    linkText: 'Peg Solitaire',
    path: '/projects/peg',
    to: '/projects/peg',
    source: 'pegSolitaire',
    component: PegSolitaire,
  },
  {
    key: 9,
    linkText: 'Lights Out',
    path: '/projects/lightsout',
    to: '/projects/lightsout',
    source: 'lightsOut',
    component: LightsOut,
  },
];

export const routes = [
  {
    key: 0,
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
    path: '/projects',
    to: '/projects',
    exact: false,
    component: Apps,
    style: {
      color: 'rgb(93, 99, 116)',
    },
  },
];
