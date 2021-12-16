import Sketch from 'react-p5';
import Dasher from './dasher';
import Slider from './slider';

let d;
let parentRef;
let slider;
const HeroShape = (props) => {
  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    const w = canvasParentRef.clientWidth;
    const h = canvasParentRef.clientHeight;
    p5.createCanvas(w, h).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.frameRate(30);
    d = new Dasher(p5, parentRef, h / 5, p5.width / 2, p5.height / 2);
    slider = new Slider(
      p5,
      p5.width - 25,
      (props.sliderPos * p5.height) / 6,
      15,
      30,
      4,
      props.sliderPos,
      props.setSliderPos
    );
  };

  const draw = (p5) => {
    p5.background(22, 22, 27);
    d.update();
    d.render(props.sliderPos);
    const alpha = d.showSlider ? 255 : 0;
    slider.handleClick();
    slider.update();
    slider.render(alpha);
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
