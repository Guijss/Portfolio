export default class Pad {
  constructor(p5, x, y, s) {
    this.p = p5;
    this.x = x;
    this.y = y;
    this.s = s;
  }

  render() {
    this.p.fill(30);
    this.p.stroke(255, 15);
    this.p.square(this.x, this.y, this.s, 7);
  }
}
