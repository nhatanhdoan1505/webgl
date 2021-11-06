var main = function () {
  // get the canvas element
  var canvas = document.getElementById("my_canvas");
  // access to a webGl context
  var gl = canvas.getContext("webgl");
  //Only continue if WebGl is available and working
  if (gl == null) {
    alert(
      "Unable to initialize webGl. Your browser or machine may not support it."
    );
    return;
  }
  //--------------- create models----------
  var vertices = [
    -0.5,
    0.5,
    0.0, // position of vertex A
    -0.5,
    -0.5,
    0.0, //position of vertex B
    0.5,
    -0.5,
    0.0, // position of vertex C
  ];
  var indices = [0, 1, 2];
  var triangle_model = new Model(gl, vertices, indices);
  //-----------create shaders-------------------
  var vertex_shader_source = document.getElementById("vertex-shader").innerHTML;
  var fragment_shader_source =
    document.getElementById("fragment-shader").innerHTML;
  var triangle_shader = new Shader(
    gl,
    vertex_shader_source,
    fragment_shader_source
  );
  //------------Create Scene-------------

  var object_data = [
    {
      model: triangle_model,
      shader: triangle_shader,
      position: [0.5, 0.0, 0.0],
      scaling: [0.5, 0.5, 0.5],
      rotation: { angle: 0, axis: "Oz" },
      color: [0.5, 0.5, 0.5],
      amim: { positionParam: 0, rotationParam: 1.0, scalingParam: 0 },
    },
    {
      model: triangle_model,
      shader: triangle_shader,
      position: [0.0, 0.0, 0.0],
      scaling: [0.5, 0.5, 1],
      rotation: { angle: 60, axis: "Oy" },
      color: [0.3, 1.0, 0.5],
      amim: { positionParam: 0.001, rotationParam: 0, scalingParam: 0 },
    },
    {
      model: triangle_model,
      shader: triangle_shader,
      position: [-0.5, 0.0, 0.0],
      scaling: [0.5, 0.5, 1],
      rotation: { angle: 60, axis: "Oy" },
      color: [0.3, 0.1, 0.5],
      amim: { positionParam: 0.005, rotationParam: 0, scalingParam: 0.001 },
    },
  ];
  var scene = new Scene(object_data.length, object_data);

  let lastTime = new Date().getTime();
  let deltaTime = 0;
  let FPS = 0;
  const anim = () => {
    let currentTime = new Date().getTime();
    deltaTime = currentTime - lastTime;
    FPS = 1000 / deltaTime;
    lastTime = currentTime;
    // set clean color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
    // set the view port
    gl.viewport(0, 0, canvas.width, canvas.height);
    // Render the scene
    scene.update(deltaTime);
    scene.draw(gl);
    requestAnimationFrame(anim);
  };

  requestAnimationFrame(anim);
};
