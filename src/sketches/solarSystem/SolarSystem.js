import { useState } from 'react';
import Sketch from 'react-p5';
import BetterCamera from './betterCamera';
import DatePicker from 'react-datepicker';

import mercury from '../../assets/images/mercury.jpg';
import venus from '../../assets/images/venus.jpg';
import earth from '../../assets/images/earth.jpg';
import mars from '../../assets/images/mars.jpg';
import jupiter from '../../assets/images/jupiter.jpg';
import saturn from '../../assets/images/saturn.jpg';
import saturnRingTex from '../../assets/images/saturn_ring.png';
import uranus from '../../assets/images/uranus.jpg';
import neptune from '../../assets/images/neptune.jpg';
import sun from '../../assets/images/sun.jpg';
import stars from '../../assets/images/stars.jpg';
import saturnRingObj from '../../assets/models/saturnRing.obj';
import skyBox from '../../assets/models/skyBox.obj';
import Sun from '../../assets/models/sun.obj';

import 'react-datepicker/dist/react-datepicker.css';
import './solar.css';

import styled from 'styled-components';

const DatePickerContainer = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 5%;
`;

let parentRef;
let d;
let planetIds = [
  'mercure',
  'venus',
  'terre',
  'mars',
  'jupiter',
  'saturne',
  'uranus',
  'neptune',
];
let planets = new Array(planetIds.length).fill({});
let loading;
let cam, camChanged;
let sunRadius;
let days;
let textures = [];
let models = [];
const SolarSystem = () => {
  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    p5.setAttributes('antialias', true);
    const w = parentRef.clientWidth;
    const h = parentRef.clientHeight;
    p5.createCanvas(w, h, p5.WEBGL).parent(parentRef);
    cam = new BetterCamera(p5);
    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);
    document.oncontextmenu = () => false; //Prevent contextmenu on right click.
    loading = true;
    days = getDaysDiff(startDate);
    camChanged = 0;
    getData(p5);
  };

  const draw = (p5) => {
    p5.lights();
    if (loading) {
      const r = 50;
      p5.push();
      const mult = p5.ceil(p5.frameCount / 5);
      p5.rotateZ((mult * 360) / 8);
      for (let i = 0; i < 360; i += 360 / 8) {
        p5.push();
        p5.noStroke();
        p5.fill(255, (200 * (i + 360 / 8)) / 360);
        p5.translate(p5.cos(i) * r, p5.sin(i) * r, 0);
        p5.rotateZ(i);
        p5.rect(0, 0, 20, 10);
        p5.pop();
      }
      p5.pop();
    } else {
      cam.updateCamera(camChanged); //performs all the camera controls based on mouse events.
      camChanged = 0;
      p5.push();
      p5.rotateX(-90);
      p5.noStroke();
      p5.texture(textures[10]);
      p5.push();
      p5.scale(sunRadius);
      p5.model(models[2]);
      p5.pop();
      p5.scale(5000);
      p5.texture(textures[9]);
      p5.model(models[1]);
      p5.pop();
      let planetNum = 0;
      for (const planet of planets) {
        p5.noFill();
        p5.stroke(255, 10);
        const o = -planet.longAscNode;
        const i = -planet.inclination;
        const w = -planet.argPeriapsis;
        const e = planet.eccentricity;
        const n = -planet.mainAnomaly;
        const a = getScaledDist(planet.semimajorAxis, p5);
        const b = a * p5.sqrt(1 - e * e);
        const p = getScaledDist(planet.perihelion, p5);
        const t = planet.sideralOrbit;

        //https://en.wikipedia.org/wiki/Orbital_elements#Euler_angle_transformations
        const x1 = p5.cos(o) * p5.cos(w) - p5.sin(o) * p5.cos(i) * p5.sin(w);
        const x2 = p5.sin(o) * p5.cos(w) + p5.cos(o) * p5.cos(i) * p5.sin(w);
        const x3 = p5.sin(i) * p5.sin(w);

        const y1 = -p5.cos(o) * p5.sin(w) - p5.sin(o) * p5.cos(i) * p5.cos(w);
        const y2 = -p5.sin(o) * p5.sin(w) + p5.cos(o) * p5.cos(i) * p5.cos(w);
        const y3 = p5.sin(i) * p5.cos(w);

        //We don't really need to compute z since everything will sit on the orbital ellipse (XY plane). No z translations.
        // const z1 = sin(i) * sin(o);
        // const z2 = -sin(i) * cos(o);
        // const z3 = cos(i);

        const x = p5.createVector(x1, x2, x3).normalize().mult(a);
        const y = p5.createVector(y1, y2, y3).normalize().mult(b);
        //const z = createVector(z1, z2, z3);

        //Drawing the orbit.
        p5.beginShape();
        for (let v = 0; v <= 360; v++) {
          p5.vertex(
            p - a + x.x * p5.cos(v) + y.x * p5.sin(v),
            x.y * p5.cos(v) + y.y * p5.sin(v),
            x.z * p5.cos(v) + y.z * p5.sin(v)
          );
        }
        p5.endShape();

        //Positioning and drawing the planet.
        p5.push();
        const anomalyTimeCorrection = getCorrectedAnomaly(t, p5);
        const anomaly = 180 + n + anomalyTimeCorrection;
        p5.translate(
          p - a + x.x * p5.cos(anomaly) + y.x * p5.sin(anomaly),
          x.y * p5.cos(anomaly) + y.y * p5.sin(anomaly),
          x.z * p5.cos(anomaly) + y.z * p5.sin(anomaly)
        );
        p5.noStroke();
        p5.rotateX(-90);
        p5.texture(textures[planetNum]);
        p5.sphere(getScaledDiameter(2 * planet.equaRadius, p5));
        if (planetNum === 5) {
          p5.rotateY(30);
          p5.rotateX(-20);
          p5.texture(textures[8]);
          p5.scale(getScaledDiameter(2 * planet.equaRadius, p5));
          p5.model(models[0]);
        }
        p5.pop();
        planetNum++;
      }
    }
  };

  const getScaledDist = (dist, p5) => {
    const neptuneOrbitWidth = planets[7].perihelion + planets[7].aphelion;
    return p5.map(dist, 0, neptuneOrbitWidth, sunRadius, 4000);
  };

  const getScaledDiameter = (dia, p5) => {
    const jupiterDiameter = 2 * planets[4].equaRadius;
    return p5.map(dia, 0, jupiterDiameter, 0, 40);
  };

  const getData = async (p5) => {
    const url =
      'https://api.le-systeme-solaire.net/rest/bodies?data=id,semimajorAxis,perihelion,aphelion,longAscNode,inclination,argPeriapsis,eccentricity,mainAnomaly,sideralOrbit,equaRadius/';
    const data = await fetch(url);
    d = await data.json();
    for (const body of d.bodies) {
      if (planetIds.includes(body.id)) {
        planets[planetIds.indexOf(body.id)] = body;
      }
    }
    sunRadius = 10 * getScaledDiameter(planets[4].equaRadius, p5);
    textures[1] = p5.loadImage(venus);
    textures[2] = p5.loadImage(earth);
    textures[3] = p5.loadImage(mars);
    textures[4] = p5.loadImage(jupiter);
    textures[5] = p5.loadImage(saturn);
    textures[6] = p5.loadImage(uranus);
    textures[7] = p5.loadImage(neptune);
    textures[8] = p5.loadImage(saturnRingTex);
    textures[9] = p5.loadImage(stars);
    textures[10] = p5.loadImage(sun);
    models[0] = p5.loadModel(saturnRingObj);
    models[1] = p5.loadModel(skyBox);
    models[2] = p5.loadModel(Sun);

    textures[0] = p5.loadImage(mercury, () => {
      //These are the parameters for an arbitraty camera position/orientation that I picked to be the initial position after playing around with it.
      cam.pos = [-0.9595179717511547, 0.218394918478944, 0.17784521772914136];
      cam.rot = [
        0.5998432678775825, -0.5011531578321564, -0.39990361780094846,
        0.4786550562216109,
      ];
      cam.up = [
        -0.17341010444129995, 0.039469699096688515, -0.9840584731258983,
      ];
      cam.eulerAngles = [1.3110000000000004, -1.3740000000000014, 0];
      cam.distance = 2800;
      cam.forceUpdate();
      loading = false;
    }); //Mercury texture is the largest file, so we load it last and control the loading variable through it.
  };

  const getDaysDiff = (date) => {
    const epoch = new Date('2000-01-01');
    return (Date.parse(date) - Date.parse(epoch)) / (1000 * 60 * 60 * 24);
  };

  const getCorrectedAnomaly = (t, p5) => {
    return -1 * p5.map(days % t, 0, t - 1, 0, 359); //transforming days since periapsis to degrees in orbit.
  };

  const mouseDragged = (p5) => {
    if (p5.mouseButton === p5.LEFT) {
      return;
    }
    const btn = p5.mouseButton === p5.RIGHT ? 3 : 2;
    camChanged = btn;
  };

  const mouseWheel = (p5, e) => {
    if (camChanged > 1) {
      return;
    }
    camChanged = Math.sign(e.delta);
  };

  const handleChange = (date) => {
    setStartDate(date);
    //reposition planets to new date.
    days = getDaysDiff(date);
  };

  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <DatePickerContainer>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleChange(date)}
          showYearDropdown={true}
          calendarClassName="cal"
          className="datePicker"
        />
      </DatePickerContainer>
      <Sketch
        setup={setup}
        draw={draw}
        mouseDragged={mouseDragged}
        mouseWheel={mouseWheel}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: '0',
        }}
      />
    </>
  );
};

export default SolarSystem;
