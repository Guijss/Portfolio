export default class Cell {
  constructor(p5, i, x, y, size, blank) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.t = i;
    this.s = size;
    this.b = blank;
    this.p5 = p5;
  }

  render() {
    if (!this.b) {
      //rect
      this.p5.stroke(32, 35, 42);
      this.p5.strokeWeight(4);
      this.p5.noFill();
      this.p5.square(this.x, this.y, this.s, 20);
      //text
      this.p5.fill(40, 43, 47);
      this.p5.noStroke();
      this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
      this.p5.textSize(36);
      this.p5.text(this.t + 1, this.x + this.s / 2, this.y + this.s / 2);
    }
  }
}
