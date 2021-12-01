export default class Piece {
  constructor(p5, i, j, x, y, s, visible) {
    this.p = p5;
    this.i = i;
    this.j = j;
    this.pos = p5.createVector(x, y);
    this.s = s;
    this.visible = visible;
    this.animating = false;
  }

  slide(dir) {
    if (this.animating) {
      this.pos.add(dir);
    }
  }

  render() {
    if (this.visible) {
      //   this.p.noStroke();
      //   this.p.fill(18, 18, 23);
      //   this.p.triangle(
      //     this.pos.x,
      //     this.pos.y,
      //     this.pos.x,
      //     this.pos.y + this.s,
      //     this.pos.x + this.s,
      //     this.pos.y + this.s
      //   );
      //   this.p.fill(26, 26, 31);
      //   this.p.triangle(
      //     this.pos.x,
      //     this.pos.y,
      //     this.pos.x + this.s,
      //     this.pos.y,
      //     this.pos.x + this.s,
      //     this.pos.y + this.s
      //   );
      //   this.p.fill(22, 22, 27);
      //   this.p.square(this.pos.x + 7, this.pos.y + 7, this.s - 14);

      this.p.stroke(50);
      this.p.fill(22, 22, 27);
      this.p.circle(this.pos.x + this.s / 2, this.pos.y + this.s / 2, this.s);
    }
  }
}
