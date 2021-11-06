class Shader {
  constructor(gl, vertex_shader_source, fragment_shader_source) {
    //Create a vectex shader
    var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    // Attach the vertex shader source code
    gl.shaderSource(vertex_shader, vertex_shader_source);
    // Complile the vertex shader
    gl.compileShader(vertex_shader);
    if (!gl.getShaderParameter(vertex_shader, gl.COMPILE_STATUS)) {
      alert(
        "An error occurred compiling the vertex shaders: " +
          gl.getShaderInfoLog(vertex_shader)
      );
      gl.deleteShader(vertex_shader);
    }
    //Create a vectex shader
    var fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach the vertex shader source code
    gl.shaderSource(fragment_shader, fragment_shader_source);
    gl.shaderSource(fragment_shader, fragment_shader_source);
    // Complile the vertex shader
    gl.compileShader(fragment_shader);
    if (!gl.getShaderParameter(fragment_shader, gl.COMPILE_STATUS)) {
      alert(
        "An error occurred compiling the fragment shaders: " +
          gl.getShaderInfoLog(fragment_shader)
      );
      gl.deleteShader(fragment_shader);
    }
    this.shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(this.shaderProgram, vertex_shader);
    // Attach a fragment shader
    gl.attachShader(this.shaderProgram, fragment_shader);
    // Link both programs
    gl.linkProgram(this.shaderProgram);
    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
      alert(
        "Unable to initialize the shader program: " +
          gl.getProgramInfoLog(shaderProgram)
      );
    }
  }
}
