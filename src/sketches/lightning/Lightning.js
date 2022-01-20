import Sketch from 'react-p5';
import Drop from './drop';

let drops = [];
let numDrops = 200;
// let animating = false;
// let animFrame = 0;
// let bolt1, bolt2, bolt3;
// let bolt1Alpha, bolt2Alpha, bolt3Alpha;
let parentRef;
let cnv;

const Lightning = () => {
  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    const h = parentRef.clientHeight;
    const w = parentRef.clientWidth;
    cnv = p5.createCanvas(w, h).parent(parentRef);
    for (let d = 0; d < numDrops; d++) {
      drops[d] = new Drop(p5);
    }
  };

  const draw = (p5) => {};
  return (
    <Sketch
      setup={setup}
      draw={draw}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '0',
      }}
    />
  );
};

export default Lightning;
