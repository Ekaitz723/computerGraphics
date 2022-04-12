let song, teapot;
let whichObj;
let cantObj = 5;
let objs = [];
let names = [];
let angle = 0;

let blinn_phong;

function preload() {
  teapot = loadModel('objs/teapot.obj');
  song = loadSound('mp3s/TheCaretakerTheirStoryIsLost.mp4');
  
  /*objs.push(loadModel("objs/justice-ODouglas.obj"));
  objs.push(loadModel("objs/kogan2.obj"));
  objs.push(loadModel("objs/painter.obj"));
  objs.push(loadModel("objs/twoareone.obj"));
  objs.push(loadModel("objs/noAnswer.obj"));*/
  
  names.push(loadSound('mp3s/kogan2.mp3'));
  names.push(loadSound('mp3s/justice-ODouglas.mp3'));
  names.push(loadSound('mp3s/painter.mp3'));
  names.push(loadSound('mp3s/twoareone.mp3'));
  names.push(loadSound('mp3s/noAnswer.mp3'));
}

function setup() {
  whichObj = 0;
  blinn_phong = true;
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  outputVolume(0.3);
  song.play();
  rotateX(HALF_PI);
  
}
function draw() {
  if (!song.isPlaying()) {
    song.play();
  }
  //angle+=0.1;
  //angle%=4*HALF_PI;
  //background(map(angle,0,4*HALF_PI,50,0));
  background(random(5,9));
  ellipse(random(width),random(height),5,5);
  ellipse(random(width),random(height),5,5);
  colorMode(RGB, 1);
  scale(10);
  // set light
  ambientLight(0.2); //La
  specularColor(1, 1, 1); // Ls
  directionalLight(1, 1, 1, 0, 0, -1); // Ld and Ls
  // let mouse X control rotation
  let rx = map(mouseX, 0, width, -radians(50), radians(50));
  rotateY(-rx);
  let ry = map(mouseY, 0, height, -radians(50), radians(50));
  rotateX(HALF_PI-ry);
  // display mona lisa
  noStroke();
  beginShape();
  //texture(mona);
  //plane(184, 274, 100, 100);
  model(teapot);
  
  endShape();
  // let mouse Y control color hue
  let hy = map(mouseY, 0, height, 1, 360/2);
  let hx = map(mouseX, 0, height, 60, 95);
  colorMode(HSB, 360, 100, 100, 100);
  
  // material setting
  if(blinn_phong) {
      specularMaterial(hy,100,100, hx); // parameters set both Ka and Kd
   shininess(map(hy*hx,25,360*85,7,13)); // shininess of specular region, ns
  }
  else {
    fill(hy, 100, 100, hx); // lambert only model, Kd
  }
}

function mouseClicked() {
  whichObj = ++whichObj%cantObj;
  blinn_phong = !blinn_phong;
  names[whichObj].play();
  
}