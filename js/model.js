class Model {
  constructor(gl, vertices, indices) {
    //-----------create vertex buffer object-----------------
    this.vertex_buffer = gl.createBuffer();
    //Bind the vertex buffer with gl.ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);
    //Pass the verticies data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    //-----------create vertex buffer object-----------------
    this.index_buffer = gl.createBuffer();
    //Bind the index buffer with gl.ELEMENT_ARRAY_BUFFER
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
    //Pass the index data to the buffer

    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      gl.STATIC_DRAW
    );
    this.indices_length = indices.length;
  }
}
