export default class Dasher {
  constructor(p5, radius, x, y) {
    this.p5 = p5;
    this.r = radius;
    this.pos = p5.createVector(x, y);
    this.segments = [];
    for (let i = 0; i >= -360; i--) {
      this.segments.push(
        p5.createVector(radius * p5.cos(5 * i), radius * p5.sin(7 * i), i)
      );
    }
  }

  update() {
    const a = this.segments[0].z + 1;
    this.segments.unshift(
      this.p5.createVector(
        this.r * this.p5.cos(5 * a),
        this.r * this.p5.sin(7 * a),
        a
      )
    );
    this.segments.pop();
  }

  render() {
    for (let i = 0; i < this.segments.length - 1; i++) {
      const d = this.p5.map(
        this.p5.dist(
          this.p5.mouseX,
          this.p5.mouseY,
          this.p5.width / 2,
          this.p5.height / 2
        ),
        0,
        2 * this.p5.width,
        100,
        0
      );
      let alpha = this.p5.map(d, 100, 0, 0.7, 0.1);
      if (alpha > 0.7) {
        alpha = 0.7;
      } else if (alpha < 0.1) {
        alpha = 0.1;
      }

      this.p5.stroke(i, d, 100, alpha);

      this.p5.line(
        this.pos.x + this.segments[i].x,
        this.pos.y + this.segments[i].y,
        this.pos.x + this.segments[i + 1].x,
        this.pos.y + this.segments[i + 1].y
      );
    }
  }

  setPos(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  setRadius(r) {
    this.r = r;
  }
}
