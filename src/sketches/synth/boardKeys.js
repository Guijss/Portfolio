let ww = 80;
let wh = 270;
let bw = 40;
let bh = 150;

export default class BoardKey {
  constructor(p5, index, type, text) {
    this.index = index;
    this.type = type;
    this.pressed = false;
    this.p = p5;
    this.text = text;
  }

  show(w, h) {
    const offsetX = w / 2 - 3.5 * ww;
    const offsetH = h / 2 - 0.5 * wh;
    if (this.type === 0) {
      drawWhiteKey(this.p, offsetX + this.index * (ww + 3), offsetH);

      if (this.pressed) {
        this.p.noStroke();
        this.p.fill(191, 143, 0);
        this.p.ellipseMode(this.p.CENTER);
        this.p.ellipse(
          offsetX + this.index * (ww + 3) + ww / 2,
          offsetH + wh - 27,
          30
        );
      }
      this.p.fill(48, 48, 45);
      this.p.noStroke();
      this.p.textAlign(this.p.CENTER);
      this.p.textSize(22);
      this.p.text(
        this.text.toUpperCase(),
        offsetX + this.index * (ww + 3) + ww / 2,
        offsetH + wh - 20
      );
    } else {
      let offset = ww + 3;
      if (this.index < 2) {
        offset = 0;
      }
      drawBlackKey(
        this.p,
        offsetX + offset + ww - bw / 2 + this.index * (ww + 3),
        offsetH
      );

      if (this.pressed) {
        this.p.noStroke();
        this.p.fill(191, 143, 0);
        this.p.ellipseMode(this.p.CENTER);
        this.p.ellipse(
          offsetX + offset + ww + this.index * (ww + 3),
          offsetH + bh - 27,
          30
        );
      }

      this.p.fill(245, 245, 220);
      this.p.noStroke();
      this.p.textAlign(this.p.CENTER);
      this.p.textSize(20);
      this.p.text(
        this.text.toUpperCase(),
        offsetX + offset + ww + this.index * (ww + 3),
        offsetH + bh - 20
      );
    }
  }

  setPressed(state) {
    this.pressed = state;
  }
}

function drawWhiteKey(p5, x, y) {
  p5.fill(200, 200, 180);
  p5.noStroke();
  p5.rect(x + 1, y + 1, ww - 2, wh - 2);

  p5.strokeWeight(3);
  p5.stroke(84, 84, 76);
  p5.line(x, y, x + ww, y);
  p5.line(x + ww, y, x + ww, y + wh);

  p5.stroke(255, 255, 230);
  p5.line(x, y, x, y + wh);
  p5.line(x, y + wh, x + ww - 3, y + wh);
}

function drawBlackKey(p5, x, y) {
  p5.fill(48, 48, 45);
  p5.noStroke();
  p5.rect(x + 1, y + 1, bw - 2, bh - 2);

  p5.strokeWeight(3);
  p5.stroke(8, 8, 15);
  p5.line(x, y, x + bw, y);
  p5.line(x + bw, y, x + bw, y + bh);

  p5.stroke(118, 118, 125);
  p5.line(x, y, x, y + bh);
  p5.line(x, y + bh, x + bw - 3, y + bh);
}
