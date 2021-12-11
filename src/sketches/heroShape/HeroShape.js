import Sketch from 'react-p5';
import Dasher from './dasher';

let d;
let col;
let parentRef;
const HeroShape = () => {
  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    const w = canvasParentRef.clientWidth;
    const h = canvasParentRef.clientHeight;
    const s = p5.floor(p5.min(w, h));
    p5.createCanvas(s, s).parent(canvasParentRef);
    col = p5.color(22, 22, 27);
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB);
    d = new Dasher(p5, s / 2.6, p5.width / 2, p5.height / 2 + 20);
  };

  const draw = (p5) => {
    p5.background(col);
    d.update();
    d.render();
  };

  const windowResized = (p5) => {
    if (parentRef === undefined) {
      return;
    }
    const h = p5.max(parentRef.clientHeight, 100);
    const w = p5.max(parentRef.clientWidth, 100);
    const s = p5.min(w, h);
    d = new Dasher(p5, s / 2.6, p5.width / 2, p5.height / 2 + 20);
    p5.resizeCanvas(s, s);
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default HeroShape;
