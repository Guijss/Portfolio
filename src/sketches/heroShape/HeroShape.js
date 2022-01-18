import Sketch from 'react-p5';
import Dasher from './dasher';

let d;
let parentRef;
const HeroShape = () => {
  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    const w = canvasParentRef.clientWidth;
    const h = canvasParentRef.clientHeight;
    p5.createCanvas(w, h).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.frameRate(30);
    d = new Dasher(p5, parentRef, h / 5, p5.width / 2, p5.height / 2);
  };

  const draw = (p5) => {
    p5.clear();
    d.update();
    d.render();
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default HeroShape;
