export default class Pad {
  constructor(p5, x, y, s, col) {
    this.p = p5;
    this.x = x;
    this.y = y;
    this.s = s;
    this.col = col;
    this.hovered = false;
    this.activated = false;
    this.mouseControl = false;
  }

  update() {
    if (
      this.p.mouseX > this.x &&
      this.p.mouseX < this.x + this.s &&
      this.p.mouseY > this.y &&
      this.p.mouseY < this.y + this.s
    ) {
      if (!this.activated) {
        this.hovered = true;
      }
      if (this.p.mouseIsPressed && !this.mouseControl) {
        this.activated = !this.activated;
        this.mouseControl = true;
      }
    } else {
      this.hovered = false;
    }
    if (!this.p.mouseIsPressed && this.mouseControl) {
      this.mouseControl = false;
    }
  }

  render() {
    this.p.stroke(255, 15);
    if (this.activated) {
      this.p.fill(this.col);
    } else if (this.hovered) {
      this.p.fill(50);
    } else {
      this.p.fill(30);
    }
    this.p.square(this.x, this.y, this.s, 7);
  }
}
