let customModel;
let modelLayer;
let patternLayer;

let columns =  [
    { x: 0, width: 165, minHeight: -50, maxHeight: 250, step: 160},
    { x: 165, width: 20, minHeight: -50, maxHeight: 80, step: 24},
    { x: 185, width: 80, minHeight: -50, maxHeight: 100, step: 50},
    { x: 265, width: 60, minHeight: -50, maxHeight: 60, step: 40},
    { x: 325, width: 130, minHeight: -50, maxHeight: 150, step: 80},
    { x: 455, width: 120, minHeight: -50, maxHeight: 40, step: 20},
    { x: 575, width: 125, minHeight: -50, maxHeight: 40, step: 20},
    { x: 700, width: 20, minHeight: -50, maxHeight: 100, step: 40},
    { x: 720, width: 60, minHeight: -50, maxHeight: 100, step: 40},
    { x: 780, width: 20, minHeight: -50, maxHeight: 100, step: 40},
    ]

let noiseOffset = 0.0;
let noiseScale = 0.02;

function preload() {
  customModel = loadModel('OBJ/test_4.obj', true)
}

function setup() {
  createCanvas(800, 800);

  modelLayer = createGraphics(800, 800, WEBGL);
  patternLayer = createGraphics(800, 800);
}

function draw() {
  background('blue');

  blendMode(BLEND);
  drawPatternLayer();
  image(patternLayer, 0, 0)

  push();
  blendMode(EXCLUSION);
  tint('white')
  drawModelLayer();
  image(modelLayer, 50, 75);
  pop();


}

function drawModelLayer() {
    modelLayer.clear();
  
    modelLayer.push();
    modelLayer.scale(3);
    modelLayer.rotateZ(frameCount * 0.0005);
    modelLayer.rotateX(frameCount * 0.0005);
    modelLayer.rotateY(frameCount * 0.0005);
    
    // Set up lights
    modelLayer.directionalLight(255, 255, 255, 0.25, -1, -1); // Directional light from top-left
    modelLayer.ambientMaterial(255); 
    modelLayer.ambientLight(100); // Ambient light to lighten shadows
    
    modelLayer.normalMaterial();
    modelLayer.specularMaterial(255); // Material for specular highlights
    
    modelLayer.model(customModel);
    modelLayer.pop();

}


function drawPatternLayer() {
  
    patternLayer.clear()
    patternLayer.background('#b19ca8')
    
    patternLayer.noStroke();
    patternLayer.fill('rgb(0, 0, 0)');
    
      // Update noise offset for smooth variation over time
    noiseOffset += 0.001;
  
    for (let col of columns) {
      for (let i = 0; i < height/col.step; i++) {
        
        let noiseValue = noise(noiseOffset + col.x * noiseScale, i * col.step * noiseScale);
        
        let rectHeight = map(noiseValue, 0, 1, col.minHeight, col.maxHeight, true);
        
        patternLayer.rect(col.x, i * col.step, col.width, rectHeight);
        
      }
    }
    
  }