export default class Cell {
  constructor(p5, i, j, x, y, size) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    this.s = size;
    this.e = true;
    this.p5 = p5;
  }

  render() {
    this.p5.stroke(40, 43, 47);
    this.p5.strokeWeight(4);
    if (this.e) {
      this.p5.noFill();
    } else {
      this.p5.fill(70, 71, 76);
    }

    this.p5.square(this.x, this.y, this.s, 10);
  }
}
