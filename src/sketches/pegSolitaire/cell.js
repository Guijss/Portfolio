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

  render(contrast) {
    let r = 70 * contrast;
    let g = 71 * contrast;
    let b = 76 * contrast;
    if (this.p) {
      //draw empty spots.
      this.p5.noFill();
      this.p5.strokeWeight(2);
      if (this.sel) {
        this.p5.stroke(120, 135, 180);
      } else {
        this.p5.stroke(70, 71, 76);
      }
      this.p5.circle(this.x, this.y, this.s);
      if (!this.e) {
        //draw pieces.
        this.p5.fill(r, g, b);
        //this.p5.stroke(70, 71, 76);
        this.p5.circle(this.x, this.y, this.s / 1.5);
      }
    }
  }
}
