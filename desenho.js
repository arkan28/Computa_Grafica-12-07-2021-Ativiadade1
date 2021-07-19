var gl;

var Tx = 0.0,Ty = 0.0,Tz = 0.0;
var Sx=1.0,Sy=1.0,Sz=1.0;
var theta_x=0.0,theta_y=0.0,theta_z=0.0;

var vertexData,colorData;

var webglUtils = new WebGL_Utils();

var currentMatrix = webglUtils.create();
    
var translateMatrix = webglUtils.create();
var scaleMatrix = webglUtils.create();
var rotateMatrix =  webglUtils.create();

webglUtils.setIdentity(translateMatrix);
webglUtils.setIdentity(scaleMatrix);
webglUtils.setIdentity(rotateMatrix);


window.onload = function() {    
    main();       
  };     
  
  

  function main(){
    
    capturar();
    
    /*
  
  */
}
    
function capturar(){
  var capturando = document.getElementById('valor').value;     
  

  // pega o contexto do WebGL usando jQuery
  var canvas = document.querySelector("#canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }
  // Cria os shaders
   
   
  var program = createShaders(gl); 

  // verificar onde os dados do vértice precisam ir.
  var positionLocation = gl.getAttribLocation(program, "position");
  var colorLocation = gl.getAttribLocation(program, "color");

  // verifica os uniforms
  var matrixLocation = gl.getUniformLocation(program, "matrix");

  // Cria o buffer e armazena as posições lá
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Armazena a geometria no buffer
  setGeometry(gl);

  // Create o buffer e armazena as cores lá
  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  // Armazena as cores no buffer
  setColors(gl);

//   desenha a cena
  drawScene();
  var Tx_limits = gl.canvas.width/38;
  var Ty_limits = gl.canvas.width/38;
  // configura a UI.
  
  function setGeometry(gl){    
    switch (parseInt(capturando)) {
      case 3:
        vertexData = [
          0.0, 0.70, 0,    
          0.40, -0.35, 0,   
          -0.40, -0.35, 0,             
        ];
        break;

        case 4:
          vertexData = [
            -0.40, 0.40, 0,    
            0.40, 0.40, 0,   
            0.40, -0.70, 0,   
            -0.40, -0.70, 0, 
          ];
        break;

        case 5:
          vertexData = [
            -0.60, 0.24, 0,    
            0.0, 0.80, 0,
            0.60, 0.24, 0,   
            0.34, -0.67, 0,   
            -0.34, -0.67, 0,
          ];
        break;

        case 6:
          vertexData = [
            -0.25, 0.50, 0,    
            0.25, 0.50, 0,   
            0.50, 0.0, 0,
            0.25, -0.50, 0,
            -0.25, -0.50, 0,             
            -0.50, 0.0, 0,
            
          ];
        break;

        case 7:
          vertexData = [
            0.0, 0.90, 0,
            0.40, 0.63, 0,
            0.53, 0.05, 0,            
            0.25, -0.58, 0,
            -0.25, -0.58, 0,            
            -0.53, 0.05, 0,
            -0.40, 0.63, 0,
          ];          
        break;

        case 8:
          vertexData = [
            -0.18, 0.83, 0,    
            0.18, 0.83, 0,   
            0.48, 0.35, 0,
            0.48, -0.38, 0,
            0.18, -0.83, 0,             
            -0.18, -0.83, 0,
            -0.48, -0.38, 0,
            -0.48, 0.35, 0,
          ];
        break;

        case 9:
          vertexData = [
            0.0, 0.80, 0,
            0.34, 0.58, 0,
            0.53, 0.15, 0,
            0.48, -0.35, 0,
            0.20, -0.75, 0,
            -0.20, -0.75, 0,
            -0.48, -0.35, 0,
            -0.53, 0.15, 0,
            -0.34, 0.58, 0,
          ];
        break;
        
        case 10:
          vertexData = [
            -0.15, 0.60, 0,    
            -0.40, 0.40, 0,   
            -0.50, 0.0, 0,   
            -0.40, -0.40, 0,
            -0.15, -0.60, 0,
            0.15, -0.60, 0,
            0.40, -0.40, 0,
            0.50, 0.0, 0,
            0.40, 0.40, 0,
            0.15, 0.60, 0,
          ];
        break;
    
      default:
        vertexData = [
          0.0, 0.70, 0,    
          0.40, -0.35, 0,   
          -0.40, -0.35, 0,             
        ];         
        break;
    }
    //vértices
    
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertexData), gl.STATIC_DRAW);

}
function setColors(gl){
    const colorData = [
      
      252/255, 107/255, 3/255,    // vermelho
        0, 1,1,    // verde
        1, 0, 1,    // azul
    ];
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(colorData), gl.STATIC_DRAW);

}
  // Desenha a cena
  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // // Diz ao WebGL como converter do espaço do clipe em pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
    gl.clearColor(0.9, 252/255, 1, 0.9);
    // // Limpa o canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Ativa o culling. Faces voltadas para trás não são eliminadas
    // gl.enable(gl.CULL_FACE);

    // Habilita o buffer de profundidade
    gl.enable(gl.DEPTH_TEST);
    
    gl.depthFunc(gl.LEQUAL);
    
    gl.clearDepth(1.0);
    
    
    // Usa os programas shaders
    gl.useProgram(program);

    // Ativa o atributo de posição
    gl.enableVertexAttribArray(positionLocation);

    // Vincula o buffer de posição
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Diz ao atributo position como obter dados de positionBuffer 
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    
    gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

    // Habilita o atributo cor
    gl.enableVertexAttribArray(colorLocation);

    // Vincula ao buffer de cor.
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // Diz ao atributo color como obter dados de colorBuffer 

    var size = 3;                 // 3 components per iteration
    var type = gl.FLOAT;  // the data is 8bit unsigned values
    var normalize = false;         // normalize the data (convert from 0-255 to 0-1)
    var stride = 0;               // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;               // start at the beginning of the buffer
    gl.vertexAttribPointer(colorLocation, size, type, normalize, stride, offset);

    
       
    // aplica as transformações
      

    webglUtils.multiplySeries(currentMatrix,translateMatrix,rotateMatrix,scaleMatrix);
    // Configura a matriz
    gl.uniformMatrix4fv(matrixLocation, false, currentMatrix);

    // Desenha a geometria
    var primitiveType = gl.TRIANGLE_FAN;
    var offset = 0;
    var count = vertexData.length/3;
    gl.drawArrays(primitiveType, offset, count);    
  }
}

    
function createVertexShader(gl){
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, `
    precision mediump float;
    
    attribute vec3 position;
    attribute vec3 color;
    varying vec3 vColor;
    
    uniform mat4 matrix;
    
    void main() {
        vColor = color;
        gl_Position = matrix * vec4(position, 1);
    }
    `);
    gl.compileShader(vertexShader);
    return vertexShader;

}
function createFragmentShader(gl){
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, `
    precision mediump float;
    
    varying vec3 vColor;
    
    void main() {
        gl_FragColor = vec4(vColor, 1);
    }
    `);
    gl.compileShader(fragmentShader);
    return fragmentShader;
}
  

function createShaders(gl){
    
    vertexShader = createVertexShader(gl);
    fragmentShader = createFragmentShader(gl);
    //cria o programa principal e anexa os shaders
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    
    gl.linkProgram(program);
    return program;
}

