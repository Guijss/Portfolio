export default class Dasher {
  constructor(p5, parent, radius, x, y) {
    this.p5 = p5;
    this.parent = parent;
    this.r = radius;
    this.pos = p5.createVector(x, y);
    this.showSlider = false;
    this.segments = [];
    const r1 = this.r;
    const r2 = (this.r * 5) / 8;
    for (let i = 0; i >= -1800; i -= 5) {
      this.segments.push(
        this.p5.createVector(
          (r1 + r2) * this.p5.cos(i) - r2 * this.p5.cos((r1 / r2 + 1) * i),
          (r1 + r2) * this.p5.sin(i) - r2 * this.p5.sin((r1 / r2 + 1) * i),
          i
        )
      );
    }
  }

  update() {
    const a = this.segments[0].z + 5;
    const r1 = this.r;
    const r2 = (this.r * 5) / 8;
    this.segments.unshift(
      this.p5.createVector(
        (r1 + r2) * this.p5.cos(a) - r2 * this.p5.cos((r1 / r2 + 1) * a),
        (r1 + r2) * this.p5.sin(a) - r2 * this.p5.sin((r1 / r2 + 1) * a),
        a
      )
    );
    this.segments.pop();
  }

  render(step) {
    const rect = this.parent.getBoundingClientRect();
    let d = this.p5.map(
      this.p5.dist(
        this.p5.winMouseX,
        this.p5.winMouseY,
        rect.left + this.p5.width / 2,
        rect.top + this.p5.height / 2
      ),
      0,
      this.p5.width,
      0,
      100
    );
    if (d > 100) {
      d = 100;
    } else if (
      d < 0 ||
      this.p5.winMouseX - (rect.left + this.p5.width / 2) > 0
    ) {
      this.showSlider = true;
      d = 0;
    } else {
      this.showSlider = false;
    }
    let alpha = this.p5.map(d, 0, 100, 0.2, 0.01);
    if (alpha > 0.2) {
      alpha = 0.2;
    } else if (alpha < 0.01) {
      alpha = 0.01;
    }
    this.p5.push();
    for (let i = 0; i < this.segments.length - 1; i++) {
      this.p5.colorMode(this.p5.HSB);
      this.p5.stroke((i * step) % 360, 100 - d, 100, alpha);
      this.p5.line(
        this.pos.x + this.segments[i].x,
        this.pos.y + this.segments[i].y,
        this.pos.x + this.segments[i + 1].x,
        this.pos.y + this.segments[i + 1].y
      );
    }
    this.p5.pop();
  }
}
