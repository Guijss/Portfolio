export default class Cell {
  constructor(p5, x, y, sizeX, sizeY, i, j, grid) {
    this.p = p5;
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.i = i;
    this.j = j;
    this.wall = false;
    this.start = false;
    this.end = false;
    this.parent = null;
    this.g = Infinity;
    this.f = Infinity;
    this.h = 0;
    this.open = false;
    this.closed = false;
  }

  render() {
    this.p.stroke(255, 15);
    if (this.wall) {
      this.p.fill(15);
    } else if (this.start) {
      this.p.fill(140, 5, 30);
    } else if (this.end) {
      this.p.fill(5, 140, 30);
    } else if (this.closed) {
      this.p.fill(90, 20);
    } else if (this.open) {
      this.p.fill(90, 90, 150, 40);
    } else {
      this.p.fill(22, 22, 27);
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
    return this;
  }

  setEnd(state) {
    if (this.wall) {
      this.wall = false;
    }
    this.end = state;
    return this;
  }

  setG(g) {
    this.g = g;
  }

  setF(f) {
    this.f = f;
  }

  setH(h) {
    this.h = h;
  }

  setParent(parent) {
    this.parent = parent;
  }

  setOpen(state) {
    this.open = state;
  }

  setClosed(state) {
    this.closed = state;
  }
}
