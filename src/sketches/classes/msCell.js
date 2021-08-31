export default class Cell {
  constructor(p5, x, y, size, colors) {
    this.p = p5;
    this.x = x;
    this.y = y;
    this.size = size;
    this.opened = false;
    this.flag = false;
    this.colors = colors;
    if (this.p.random() < 0.15) {
      this.bomb = true;
      this.bombsAround = -1;
    } else {
      this.bomb = false;
      this.bombsAround = 0;
    }
  }

  render() {
    this.p.stroke(255, 15);
    if (this.opened) {
      if (this.bomb) {
        this.p.fill(50, 0, 20);
      } else {
        this.p.fill(50);
      }
    } else {
      this.p.fill(30);
    }
    this.p.square(this.x, this.y, this.size, this.opened ? 0 : 7);
    if (this.opened) {
      if (this.bomb) {
        this.p.push();
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.textSize(18);
        this.p.fill(255, 255, 0);
        this.p.text('B', this.x + this.size / 2, this.y + this.size / 2);
        this.p.pop();
      } else if (this.bombsAround > 0) {
        let currColor;
        if (this.bombsAround > 4) {
          currColor = this.colors[3];
        } else {
          currColor = this.colors[this.bombsAround - 1];
        }
        this.p.push();
        this.p.textAlign(this.p.CENTER, this.p.CENTER);
        this.p.textSize(18);
        this.p.fill(currColor);
        this.p.text(
          this.bombsAround,
          this.x + this.size / 2,
          this.y + this.size / 2
        );
        this.p.pop();
      }
    } else if (this.flag) {
      this.p.push();
      this.p.textAlign(this.p.CENTER, this.p.CENTER);
      this.p.textStyle(this.p.BOLD);
      this.p.textSize(20);
      this.p.fill(0);
      this.p.text('?', this.x + this.size / 2, 1 + this.y + this.size / 2);
      this.p.pop();
    }
  }

  setFlag(state) {
    this.flag = state;
  }

  setOpened(state) {
    this.opened = state;
  }
}
