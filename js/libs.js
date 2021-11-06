var MY_LIBS = {
  //------------- convert from degree to radian-----------------
  degToRad: function (angle) {
    return (angle * Math.PI) / 180;
  },
  translate: function (T) {
    var transMatrix = new Float32Array([
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      T[0],
      T[1],
      T[2],
      1,
    ]);
    return transMatrix;
  },
  rotate: function (angle, axis) {
    var angle_radian = (angle * Math.PI) / 180;
    var sin_angle = Math.sin(angle_radian);
    var cos_angle = Math.cos(angle_radian);

    // Rotation 60 degrees around Ox axis
    if (axis === "Ox") {
      var rotationMatrix_X = new Float32Array([
        1,
        0.0,
        0.0,
        0.0,
        0.0,
        cos_angle,
        sin_angle,
        0.0,
        0.0,
        -sin_angle,
        cos_angle,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
      ]);
      return rotationMatrix_X;
    }

    if (axis === "Oy") {
      var rotationMatrix_Y = new Float32Array([
        cos_angle,
        0.0,
        -sin_angle,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        sin_angle,
        0.0,
        cos_angle,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
      ]);
      return rotationMatrix_Y;
    }
    if (axis === "Oz") {
      var rotationMatrix_Z = new Float32Array([
        cos_angle,
        sin_angle,
        0.0,
        0.0,
        -sin_angle,
        cos_angle,
        0.0,
        0.0,
        0.0,
        1.0,
        1.0,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
      ]);
      return rotationMatrix_Z;
    }
    return null;
  },
  scale: function (S) {
    var scalingMatrix = new Float32Array([
      S[0],
      0.0,
      0.0,
      0.0,
      0.0,
      S[1],
      0.0,
      0.0,
      0.0,
      0.0,
      S[2],
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ]);
    return scalingMatrix;
  },
  multiplyMatrix4: function (A, B) {
    var R = new Float32Array(16);

    R[0] = A[0] * B[0] + A[4] * B[1] + A[8] * B[2] + A[12] * B[3];
    R[1] = A[1] * B[0] + A[5] * B[1] + A[9] * B[2] + A[13] * B[3];
    R[2] = A[2] * B[0] + A[6] * B[1] + A[10] * B[2] + A[14] * B[3];
    R[3] = A[3] * B[0] + A[7] * B[1] + A[11] * B[2] + A[15] * B[3];

    R[4] = A[0] * B[4] + A[4] * B[5] + A[8] * B[6] + A[12] * B[7];
    R[5] = A[1] * B[4] + A[5] * B[5] + A[9] * B[6] + A[13] * B[7];
    R[6] = A[2] * B[4] + A[6] * B[5] + A[10] * B[6] + A[14] * B[7];
    R[7] = A[3] * B[4] + A[7] * B[5] + A[11] * B[6] + A[15] * B[7];

    R[8] = A[0] * B[8] + A[4] * B[9] + A[8] * B[10] + A[12] * B[11];
    R[9] = A[1] * B[8] + A[5] * B[9] + A[9] * B[10] + A[13] * B[11];
    R[10] = A[2] * B[8] + A[6] * B[9] + A[10] * B[10] + A[14] * B[11];
    R[11] = A[3] * B[8] + A[7] * B[9] + A[11] * B[10] + A[15] * B[11];

    R[12] = A[0] * B[12] + A[4] * B[13] + A[8] * B[14] + A[12] * B[15];
    R[13] = A[1] * B[12] + A[5] * B[13] + A[9] * B[14] + A[13] * B[15];
    R[14] = A[2] * B[12] + A[6] * B[13] + A[10] * B[14] + A[14] * B[15];
    R[15] = A[3] * B[12] + A[7] * B[13] + A[11] * B[14] + A[15] * B[15];
    return R;
  },
};
