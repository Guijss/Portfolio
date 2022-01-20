import { Vector } from 'p5';

export default class Drop {
  constructor(p5) {
    this.p5 = p5;
    this.pos = p5.createVector(p5.random(0, p5.width + 100), 0);
    this.head = Vector.fromAngle((1.2 * p5.PI) / 2, p5.random(5, 9));
    this.a = 255;
    this.s = p5.random(0.5, 0.9);
    this.started = false;
  }

  update() {
    let speed = Vector.mult(this.head, this.s);
    this.pos.add(speed);
    this.a = this.p5.map(this.pos.y, 0, this.p5.height, 255, 0);

    if (this.a < 1) {
      this.pos = this.p5.createVector(
        this.p5.random(0, this.p5.width + 100),
        0
      );
      this.head = Vector.fromAngle(
        (1.2 * this.p5.PI) / 2,
        this.p5.random(this.p5.height / 100, this.p5.height / 60)
      );
      this.a = 255;
      this.s = this.p5.random(0.5, 0.9);
      this.started = true;
    }
  }

  render() {
    if (this.started) {
      this.p5.push();
      this.p5.stroke(100, 100, 100, this.a);
      let wgt = this.p5.map(this.head.mag(), 5, 9, 1, 2);
      this.p5.strokeWeight(wgt);
      this.p5.line(
        this.pos.x,
        this.pos.y,
        this.pos.x + this.head.x,
        this.pos.y + this.head.y
      );
      this.p5.pop();
    }
  }
}
