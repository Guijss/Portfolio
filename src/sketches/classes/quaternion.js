export default class Quaternion {
  //en.wikipedia.org/wiki/Quaternion for further information on quaternion mathematics.

  static identity() {
    return [1, 0, 0, 0];
  }

  static eulerToQuaternion(yaw, pitch, roll) {
    const cy = Math.cos(yaw / 2);
    const sy = Math.sin(yaw / 2);
    const cp = Math.cos(pitch / 2);
    const sp = Math.sin(pitch / 2);
    const cr = Math.cos(roll / 2);
    const sr = Math.sin(roll / 2);

    return [
      cy * cp * cr - sy * sp * sr,
      cy * cr * sp - cp * sy * sr,
      cy * cp * sr + cr * sy * sp,
      cp * cr * sy + cy * sp * sr,
    ];
  }

  static rotateVec(vec, rot) {
    //https://www.xarg.org/proof/vector-rotation-using-quaternions/
    let t = [0, 0, 0];
    t[0] = 2 * (rot[2] * vec[2] - rot[3] * vec[1]);
    t[1] = 2 * (rot[3] * vec[0] - rot[1] * vec[2]);
    t[2] = 2 * (rot[1] * vec[1] - rot[2] * vec[0]);
    return [
      vec[0] + rot[0] * t[0] + rot[2] * t[2] - rot[3] * t[1],
      vec[1] + rot[0] * t[1] + rot[3] * t[0] - rot[1] * t[2],
      vec[2] + rot[0] * t[2] + rot[1] * t[1] - rot[2] * t[0],
    ];
  }

  static hamiltonProduct(a, b) {
    //https://en.wikipedia.org/wiki/Quaternion#Hamilton_product. Combination of two rotations.
    let q = [0, 0, 0, 0];
    q[0] = a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3];
    q[1] = a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2];
    q[2] = a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1];
    q[3] = a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0];
    return q;
  }
}
