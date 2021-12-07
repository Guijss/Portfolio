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
        this.translate([this.p5.movedX, this.p5.movedY, 0]);
        return;
      } else if (btn === 1 || btn === -1) {
        this.distance += btn * 50;
      }
      this.cam.camera(
        this.pos[0] * this.distance + this.center[0],
        this.pos[1] * this.distance + this.center[1],
        this.pos[2] * this.distance + this.center[2],
        this.center[0],
        this.center[1],
        this.center[2],
        this.up[0],
        this.up[1],
        this.up[2]
      );
    } else {
      this.initialDrag = true;
    }
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
    this.cam.move(vec[0], vec[1], vec[2]);
    this.center = [this.cam.centerX, this.cam.centerY, this.cam.centerZ];
  }
}
