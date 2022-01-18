export const a_star = (p5, grid, openList, closedList, goal) => {
  if (openList.length > 0) {
    let current = findLowestF(openList);
    if (current === goal) {
      const path = makePath(goal);
      return [false, path, openList, closedList];
    }
    openList.splice(openList.indexOf(current), 1);
    current.setOpen(false);
    closedList.push(current);
    current.setClosed(true);
    let ns = getNeighbors(current, grid);
    for (let i = 0; i < ns.length; i++) {
      const n = ns[i];
      if (!closedList.includes(n)) {
        let tempG = current.g + calcH(p5, n, current);
        let newPath = false;
        if (openList.includes(n)) {
          if (tempG < n.g) {
            n.setG(tempG);
            newPath = true;
          }
        } else {
          n.setG(tempG);
          newPath = true;
          openList.push(n);
          n.setOpen(true);
        }
        if (newPath) {
          n.setH(calcH(p5, n, goal));
          n.setF(n.g + n.h);
          n.setParent(current);
        }
      }
    }
    return [true, [], openList, closedList];
  } else {
    return [false, [], openList, closedList];
  }
};

export const dij = (p5, grid, openList, closedList, goal) => {
  if (openList.length > 0) {
    let current = findLowestF(openList);
    if (current === goal) {
      const path = makePath(goal);
      return [false, path, openList, closedList];
    }
    openList.splice(openList.indexOf(current), 1);
    closedList.push(current);
    current.setClosed(true);
    let ns = getNeighbors(current, grid);
    for (let i = 0; i < ns.length; i++) {
      const n = ns[i];
      if (!closedList.includes(n)) {
        let tempF = current.f + calcH(p5, n, current);
        if (tempF < n.f) {
          n.f = tempF;
          n.parent = current;
        }
      }
    }
    return [true, [], openList, closedList];
  } else {
    return [false, [], openList, closedList];
  }
};

export const breadth_f = (p5, grid, openList, closedList, goal) => {};

export const depth_f = (p5, grid, openList, closedList, goal) => {};

const getNeighbors = (c, grid) => {
  let nArr = [];
  const ci = c.i;
  const cj = c.j;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (
        (i === 0 && j === 0) ||
        ci + i < 0 ||
        ci + i >= grid.length ||
        cj + j < 0 ||
        cj + j >= grid[0].length
      ) {
        continue;
      } else if (
        grid[ci + i][cj + j].wall ||
        (i * j !== 0 &&
          grid[ci + i + -1 * i][cj + j].wall &&
          grid[ci + i][cj + j + -1 * j].wall)
      ) {
        continue;
      } else {
        nArr.push(grid[ci + i][cj + j]);
      }
    }
  }
  return nArr;
};

const calcH = (p5, cell1, cell2) => {
  return p5.dist(cell1.i, cell1.j, cell2.i, cell2.j);
};

const findLowestF = (arr) => {
  let lowest = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].f < arr[lowest].f) {
      lowest = i;
    }
  }
  return arr[lowest];
};

const makePath = (cell) => {
  const p = [];
  while (cell !== null) {
    p.push(cell);
    cell = cell.parent;
  }
  return p;
};
