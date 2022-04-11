let song, teapot;
let whichObj;
let blinn_phong;
let cantObj = 6;
let objs = [];

function preload() {
  teapot = loadModel('objs/teapot.obj');
  song = loadSound('mp3s/TheCaretakerTheirStoryIsLost.mp4');
  
  objs.push(loadModel("objs/justice-ODouglas.obj"));
  /*objs.push(loadModel("objs/kogan2Mal.obj"));
  objs.push(loadModel("objs/painter.obj"));
  objs.push(loadModel("objs/eternal-Kiss.obj"));
  objs.push(loadModel("objs/twoareone.obj"));
  objs.push(loadModel("objs/noAnswer.obj"));*/
}

function setup() {
  whichObj = 0;
  blinn_phong = true;
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  song.play();
  rotateX(HALF_PI);
  
}
function draw() {
  if (!song.isPlaying()) {
    song.play();
  }
  background(0);
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
  

  // display a glass box
  //stroke(0, 0, 100);
  //box(184, 274, 2);
  //model(kogen2);
}

function mouseClicked() {
  whichObj = ++whichObj%cantObj;
  blinn_phong = !blinn_phong;
  //++cancantObj%=cancantObj;
}