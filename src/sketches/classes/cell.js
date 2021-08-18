export default class Cell {
  constructor(p5, x, y, sizeX, sizeY, i, j, grid) {
    this.p = p5;
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.wall = false;
    this.start = i === 0 && j === 0;
    this.end = i === grid.length - 1 && j === grid[0].length - 1;
  }

  render() {
    this.p.stroke(255, 15);
    if (this.wall) {
      this.p.fill(15);
    } else if (this.start) {
      this.p.fill(140, 5, 30);
    } else if (this.end) {
      this.p.fill(5, 140, 30);
    } else {
      this.p.fill(30);
    }
    this.p.rect(this.x, this.y, this.sizeX, this.sizeY, 7);
  }

  setSize(newSizeX, newSizeY) {
    this.sizeX = newSizeX;
    this.sizeY = newSizeY;
  }

  setPosition(newX, newY) {
    this.x = newX;
    this.y = newY;
  }

  setWall(state) {
    if (this.start || this.end) {
      return;
    }
    this.wall = state;
  }

  setStart(state) {
    if (this.wall) {
      this.wall = false;
    }
    this.start = state;
  }

  setEnd(state) {
    if (this.wall) {
      this.wall = false;
    }
    this.end = state;
  }
}
