import Sketch from 'react-p5';

import mercury from '../assets/images/mercury.jpg';
import venus from '../assets/images/venus.jpg';
import earth from '../assets/images/earth.jpg';
import mars from '../assets/images/mars.jpg';
import jupiter from '../assets/images/jupiter.jpg';
import saturn from '../assets/images/saturn.jpg';
import saturnRingTex from '../assets/images/saturn_ring.png';
import uranus from '../assets/images/uranus.jpg';
import neptune from '../assets/images/neptune.jpg';
import sun from '../assets/images/sun.jpg';
import stars from '../assets/images/stars.jpg';
import saturnRingObj from '../assets/models/saturnRing.obj';
import skyBox from '../assets/models/skyBox.obj';

const SolarSystem = () => {
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
  let cam, camPos, camChanged;
  let pitch, yaw, distance, maxDistance, minDistance;
  let sunRadius;
  let days;
  let textures = [];
  let models = [];
  const setup = (p5, canvasParentRef) => {
    parentRef = canvasParentRef;
    p5.setAttributes('antialias', true);
    const w = parentRef.clientWidth;
    const h = parentRef.clientHeight;
    p5.createCanvas(w, h, p5.WEBGL).parent(parentRef);
    cam = p5.createCamera();
    cam.perspective(p5.PI / 3, p5.width / p5.height, 0, 20000);
    p5.angleMode(p5.DEGREES);
    document.oncontextmenu = () => false; //Prevent contextmenu on right click.
    loading = true;
    const epoch = new Date('2000-01-01');
    days = getDaysDiff(epoch);
    pitch = 0;
    yaw = 0;
    distance = 1000;
    maxDistance = 4900;
    minDistance = 500;
    camChanged = false;
    camPos = camParamsToVector(pitch, yaw, distance, p5);
    cam.setPosition(camPos.x, camPos.y, camPos.z);
    cam.lookAt(0, 0, 0);
    getData(p5);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.lights();
    // if (cam.getDistance() > 1000) {
    //   strokeWeight(0.5);
    // } else if (cam.getDistance() > 500) {
    //   strokeWeight(0.4);
    // } else {
    //   strokeWeight(0.3);
    // }

    if (loading) {
      p5.fill(255);
      p5.sphere(200);
    } else {
      cameraControl(p5);
      p5.push();
      p5.rotateX(-90);
      p5.noStroke();
      p5.texture(textures[10]);
      p5.sphere(sunRadius);
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

        const x1 = p5.cos(o) * p5.cos(w) - p5.sin(o) * p5.cos(i) * p5.sin(w);
        const x2 = p5.sin(o) * p5.cos(w) + p5.cos(o) * p5.cos(i) * p5.sin(w);
        const x3 = p5.sin(i) * p5.sin(w);

        const y1 = -p5.cos(o) * p5.sin(w) - p5.sin(o) * p5.cos(i) * p5.cos(w);
        const y2 = -p5.sin(o) * p5.sin(w) + p5.cos(o) * p5.cos(i) * p5.cos(w);
        const y3 = p5.sin(i) * p5.cos(w);

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
    textures[0] = p5.loadImage(mercury);
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
    loading = false;
  };

  const getDaysDiff = (date) => {
    const mDate = Date.parse(date);
    return (Date.now() - mDate) / (1000 * 60 * 60 * 24);
  };

  const getCorrectedAnomaly = (t, p5) => {
    return -1 * p5.map(days % t, 0, t - 1, 0, 359); //transforming days since periapsis to degrees in orbit.
  };

  const cameraControl = (p5) => {
    const center = p5.createVector(cam.centerX, cam.centerY, cam.centerZ);
    if (p5.mouseIsPressed) {
      if (p5.mouseButton === p5.RIGHT) {
        yaw += p5.movedX * 0.3;
        pitch -= p5.movedY * 0.3;
        if (pitch > 89) {
          pitch = 89;
        }
        if (pitch < -89) {
          pitch = -89;
        }
      }
      camChanged = true;
    }
    if (camChanged) {
      camPos = camParamsToVector(pitch, yaw, distance, p5);
      cam.setPosition(camPos.x, camPos.y, camPos.z);
      cam.lookAt(center.x, center.y, center.z);
      camChanged = false;
    }
  };

  const camParamsToVector = (p, y, d, p5) => {
    let vec = p5.createVector();
    vec.x = p5.cos(p) * p5.cos(y);
    vec.y = p5.sin(p);
    vec.z = p5.cos(p) * p5.sin(y);
    vec.setMag(d);
    return vec;
  };

  const mouseWheel = (p5, event) => {
    distance += event.delta;
    if (distance > maxDistance) {
      distance = maxDistance;
    }
    if (distance < minDistance) {
      distance = minDistance;
    }
    camChanged = true;
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mouseWheel={mouseWheel}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '0',
      }}
    />
  );
};

export default SolarSystem;
