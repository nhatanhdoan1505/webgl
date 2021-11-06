class Object {
  initialDirect = 1;
  constructor(model, shader, position, scaling, rotation, color, amim) {
    this.model = model;
    this.shader = shader;
    this.position = position;
    this.scaling = scaling;
    this.rotation = rotation;
    this.color = color;
    this.amim = amim;
    this.modelMatrix = null;
  }
  draw(gl) {
    //Bind the vertex buffer object ( VBO)
    gl.useProgram(this.shader.shaderProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.model.vertex_buffer);
    //Bind the index buffer object (IBO)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.model.index_buffer);
    // get the location of attributes
    var aVertexPosition_Loc = gl.getAttribLocation(
      this.shader.shaderProgram,
      "aVertexPosition"
    );
    ////point an attribute to the currently bound VBO
    gl.vertexAttribPointer(aVertexPosition_Loc, 3, gl.FLOAT, false, 0, 0);
    //Enable the attribute
    gl.enableVertexAttribArray(aVertexPosition_Loc);
    // get the location of uniform color
    var uniformColor_Loc = gl.getUniformLocation(
      this.shader.shaderProgram,
      "uColor"
    );
    // specify values of uniform variables.
    //   3f= 3float         location    ,  values: red , green, blue
    gl.uniform3f(uniformColor_Loc, this.color[0], this.color[1], this.color[3]);
    // send model Matrix to GPU
    var modelMatrix_Loc = gl.getUniformLocation(
      this.shader.shaderProgram,
      "u_modelMatrix"
    );
    gl.uniformMatrix4fv(modelMatrix_Loc, false, this.modelMatrix);
    /*-------------- render object ---------------------------*/
    // Draw the object
    gl.drawElements(
      gl.TRIANGLES,
      this.model.indices_length,
      gl.UNSIGNED_SHORT,
      0
    );
    //  console.log("Complete render objects");
  }
  update(deltaTime) {
    let { positionParam, rotationParam, scalingParam } = this.amim;

    let currentInitialDirect =
      this.position[1] < -0.5 && this.initialDirect === -1
        ? 1
        : this.position[1] > 0.5 && this.initialDirect === 1
        ? -1
        : this.initialDirect;
    this.initialDirect = currentInitialDirect;

    let distance = positionParam * deltaTime;

    this.position[1] += distance * currentInitialDirect;

    var transMatrix = MY_LIBS.translate(this.position);
    this.rotation.angle += rotationParam * deltaTime;
    var rotationMatrix = MY_LIBS.rotate(
      this.rotation.angle,
      this.rotation.axis
    );

    // console.log(currentInitialDirect)
    // this.scaling[1] =
    //   this.scaling[1] + currentInitialDirect * deltaTime * scalingParam;
    // console.log(this.scaling);
    var scalingMatrix = MY_LIBS.scale(this.scaling);

    var TR = MY_LIBS.multiplyMatrix4(transMatrix, rotationMatrix);
    this.modelMatrix = MY_LIBS.multiplyMatrix4(TR, scalingMatrix);
  }
}
