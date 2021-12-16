export default class Slider {
  constructor(p5, x, y, width, height, trackWidth, val, setVal) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.isDragging = false;
    this.isHovering = false;
    this.tw = trackWidth;
    this.val = val;
    this.setVal = setVal;
  }

  handleClick() {
    //thumb control.
    const mX = this.p5.mouseX;
    const mY = this.p5.mouseY;
    if (
      mX > this.x - this.w &&
      mX < this.x + this.w &&
      mY > this.y - this.h &&
      mY < this.y + this.h
    ) {
      this.isHovering = true;
      this.p5.cursor('pointer');
    } else {
      this.isHovering = false;
      this.p5.cursor('default');
    }
    if (!this.isDragging) {
      if (this.isHovering && this.p5.mouseIsPressed) {
        if (this.p5.mouseButton === this.p5.LEFT) {
          this.isDragging = true;
        }
      }
    } else if (!this.p5.mouseIsPressed) {
      this.isDragging = false;
    }
  }

  update() {
    if (this.isDragging) {
      const step = this.p5.height / 6;
      let val = this.val;
      if (this.p5.mouseY < step) {
        this.y = step;
        val = 1;
      } else if (this.p5.mouseY > 5 * step) {
        this.y = 5 * step;
        val = 5;
      } else {
        this.y = step * this.p5.floor(this.p5.mouseY / step);
        val = this.p5.floor(this.p5.mouseY / step);
      }
      if (this.val !== val) {
        this.setVal(val);
      }
    }
  }

  render(alpha) {
    //slider track.
    this.p5.fill(18, 18, 21, alpha / 2.5);
    this.p5.noStroke();
    this.p5.rect(this.x - this.tw / 2, 0, this.tw, this.p5.height, 10);

    //slider thumb.
    this.p5.fill(147, 152, 159, alpha);
    this.p5.rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h, 5);
  }
}
