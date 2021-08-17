export default class Cell {
  constructor(p5, x, y, sizeX, sizeY) {
    this.p = p5;
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.wall = false;
  }

  render() {
    this.p.stroke(255, 15);
    if (!this.wall) {
      this.p.fill(30);
    } else {
      this.p.fill(15);
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
    this.wall = state;
  }
}
