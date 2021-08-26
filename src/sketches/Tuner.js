// import React from 'react';
// import Sketch from 'react-p5';
// import 'p5/lib/addons/p5.sound';
// import ml5 from 'ml5';

// const model_url =
//   'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
// let pitch;
// let mic;
// let freq;
// let parentRef;
// let audioContext;

// const Tuner = () => {
//   const setup = (p5, canvasParentRef) => {
//     parentRef = canvasParentRef;
//     const h = 400;
//     const w = 400;
//     p5.createCanvas(w, h).parent(parentRef);
//     freq = 0;
//   };

//   const draw = (p5) => {
//     p5.background(100);
//     if (pitch !== undefined && p5.frameCount % 20 === 0) {
//       pitch.getPitch(p);
//     }
//     if (p5.getAudioContext().state !== 'running') {
//       p5.textSize(62);
//       p5.textAlign(p5.CENTER, p5.CENTER);
//       p5.text('Click anywhere', p5.width / 2, p5.height / 2);
//     } else {
//       p5.textSize(62);
//       p5.textAlign(p5.CENTER, p5.CENTER);
//       p5.text(freq.toFixed(2), p5.width / 2, p5.height / 2);
//       if (!p5.focused) {
//         p5.getAudioContext().suspend();
//         mic.stop();
//       }
//     }
//   };

//   const listening = () => {
//     pitch = ml5.pitchDetection(
//       model_url,
//       audioContext,
//       mic.stream,
//       modelLoaded
//     );
//   };

//   const modelLoaded = () => {
//     pitch.getPitch(p);
//   };

//   const p = (err, frequency) => {
//     if (err) {
//       console.error(err);
//     } else {
//       if (frequency) {
//         freq = frequency;
//       }
//     }
//   };

//   const mousePressed = (p5) => {
//     if (p5.getAudioContext().state !== 'running') {
//       p5.userStartAudio();
//       audioContext = p5.getAudioContext();
//       mic = new p5.constructor.AudioIn();
//       mic.start(listening);
//     }
//   };

//   return <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />;
// };

// export default Tuner;
