export default class Cell {
  constructor(p5, inPlay, i, j, x = 1, y = 1, size = 1, empty = false) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    this.s = size;
    this.p = inPlay;
    this.e = empty;
    this.sel = false;
    this.p5 = p5;
  }

  render() {
    if (this.p) {
      this.p5.strokeWeight(2);
      if (this.sel) {
        this.p5.stroke(120, 135, 180);
      } else {
        this.p5.stroke(32, 35, 42);
      }
      if (this.e) {
        this.p5.noFill();
      } else {
        this.p5.fill(40, 43, 47);
      }
      this.p5.circle(this.x, this.y, this.s);
    }
  }
}
