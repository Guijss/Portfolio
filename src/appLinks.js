import PathFinding from './sketches/PathFinding';
import Tetris from './sketches/Tetris';

export const appLinks = [
  {
    key: 0,
    linkText: 'PathFinding',
    path: '/Apps/PathFinding',
    to: '/Apps/PathFinding',
    component: PathFinding,
    style: {
      color: 'rgb(69, 104, 123)',
    },
  },
  {
    key: 1,
    linkText: 'Tetris',
    path: '/Apps/Tetris',
    to: '/Apps/Tetris',
    component: Tetris,
    style: {
      color: 'rgb(69, 104, 123)',
    },
  },
];
