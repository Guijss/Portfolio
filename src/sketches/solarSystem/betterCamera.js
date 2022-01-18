import Quaternion from './quaternion';

export default class BetterCamera {
  constructor(
    p5,
    pos = [0, 0, 1],
    rot = [1, 0, 0, 0],
    up = [0, 1, 0],
    euler = [0, 0, 0],
    distance = 1000,
    center = [0, 0, 0]
  ) {
    this.p5 = p5;
    this.cam = p5.createCamera();
    this.cam.perspective(p5.PI / 3, p5.width / p5.height, 0.01, 20000);
    this.cam.camera(
      pos[0] * distance,
      pos[1] * distance,
      pos[2] * distance,
      center[0],
      center[1],
      center[2],
      up[0],
      up[1],
      up[2]
    );
    this.initialPos = [0, 0, 1];
    this.pos = pos;
    this.rotation = rot;
    this.center = center;
    this.initialUp = [0, 1, 0];
    this.up = up;
    this.distance = distance;
    this.eulerAngles = euler; // [yaw, pitch, roll].
    this.initialDrag = true;
    this.inverter = 1;
  }

  updateCamera(btn) {
    if (btn !== 0) {
      if (btn === 3) {
        if (this.initialDrag) {
          this.inverter = this.up[2] >= 0 ? -1 : 1;
          this.initialDrag = false;
        }
        this.eulerAngles[0] += this.inverter * this.p5.movedX * 0.003;
        this.eulerAngles[1] += this.p5.movedY * 0.003;

        this.setRotation();
        this.setPosition();
        this.setUp();
      } else if (btn === 2) {
        this.translate([-this.p5.movedX, -this.p5.movedY, 0]);
      } else if (btn === 1 || btn === -1) {
        this.distance += btn * 50;
        if (this.distance < 250) {
          this.distance = 250;
        }
        if (this.distance > 4900) {
          this.distance = 4900;
        }
      }
      this.cam.camera(
        this.center[0] + this.pos[0] * this.distance,
        this.center[1] + this.pos[1] * this.distance,
        this.center[2] + this.pos[2] * this.distance,
        this.center[0],
        this.center[1],
        this.center[2],
        this.up[0],
        this.up[1],
        this.up[2]
      );
      console.log(this.distance);
    } else {
      this.initialDrag = true;
    }
  }

  forceUpdate() {
    this.cam.camera(
      this.center[0] + this.pos[0] * this.distance,
      this.center[1] + this.pos[1] * this.distance,
      this.center[2] + this.pos[2] * this.distance,
      this.center[0],
      this.center[1],
      this.center[2],
      this.up[0],
      this.up[1],
      this.up[2]
    );
  }

  setRotation() {
    this.rot = Quaternion.eulerToQuaternion(
      this.eulerAngles[0],
      this.eulerAngles[1],
      this.eulerAngles[2]
    );
  }

  getRotation() {
    return this.rot;
  }

  setUp() {
    this.up = Quaternion.rotateVec(
      [this.initialUp[0], this.initialUp[1], this.initialUp[2]],
      this.rot
    );
  }

  getUp() {
    return this.up;
  }

  setCenter() {}

  getCenter() {
    return this.center;
  }

  setPosition() {
    this.pos = Quaternion.rotateVec(
      [this.initialPos[0], this.initialPos[1], this.initialPos[2]],
      this.rot
    );
  }

  getPosition() {
    return [this.pos, this.distance];
  }

  translate(vec) {
    const local = this.getLocalAxis();

    const dx = [local.x[0] * vec[0], local.x[1] * vec[0], local.x[2] * vec[0]];
    const dy = [local.y[0] * vec[1], local.y[1] * vec[1], local.y[2] * vec[1]];
    const dz = [local.z[0] * vec[2], local.z[1] * vec[2], local.z[2] * vec[2]];

    this.center = [
      this.center[0] + dx[0] + dy[0] + dz[0],
      this.center[1] + dx[1] + dy[1] + dz[1],
      this.center[2] + dx[2] + dy[2] + dz[2],
    ];
  }

  getLocalAxis() {
    //http://learnwebgl.brown37.net/07_cameras/camera_linear_motion.html
    //https://github.com/processing/p5.js/blob/main/src/webgl/p5.Camera.js

    let z0 = this.cam.eyeX - this.cam.centerX;
    let z1 = this.cam.eyeY - this.cam.centerY;
    let z2 = this.cam.eyeZ - this.cam.centerZ;

    const eyeDist = Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    if (eyeDist !== 0) {
      z0 /= eyeDist;
      z1 /= eyeDist;
      z2 /= eyeDist;
    }

    // calculate camera Y vector
    let y0 = this.cam.upX;
    let y1 = this.cam.upY;
    let y2 = this.cam.upZ;

    // compute camera local X vector as up vector (local Y) cross local Z
    let x0 = y1 * z2 - y2 * z1;
    let x1 = -y0 * z2 + y2 * z0;
    let x2 = y0 * z1 - y1 * z0;

    // recompute y = z cross x
    y0 = z1 * x2 - z2 * x1;
    y1 = -z0 * x2 + z2 * x0;
    y2 = z0 * x1 - z1 * x0;

    // cross product gives area of parallelogram, which is < 1.0 for
    // non-perpendicular unit-length vectors; so normalize x, y here:
    const xmag = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (xmag !== 0) {
      x0 /= xmag;
      x1 /= xmag;
      x2 /= xmag;
    }

    const ymag = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (ymag !== 0) {
      y0 /= ymag;
      y1 /= ymag;
      y2 /= ymag;
    }

    return {
      x: [x0, x1, x2],
      y: [y0, y1, y2],
      z: [z0, z1, z2],
    };
  }
}
