let cam_x, cam_y, cam_z;
let cam_cx, cam_cy, cam_cz;
let cam_dx, cam_dy, cam_dz;
let pan, tilt;
let seed;
const WORLD_SIZE = 1000;
let Bldgs = [];
const WALL_SIZE = 50;
const WALL_NUM = 200;
let img;

function preload() {
  img = loadImage('backroomWall1.png');
}

class Wall {
  constructor(x, y, w, d, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.d = d;
    this.h = h;
  }
  render() {
    push();
    translate(this.x, this.y, WALL_SIZE/2);
    stroke(0);
    strokeWeight(3);
    rotateX(-HALF_PI);
    // rotateZ(radians(random(0,1)*90))
    texture(img);
    box(this.w, this.d, this.h);
    pop();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  cam_x = 0;
  cam_y = 400;
  cam_z = 20;
  cam_dx = 0;
  cam_dy = -1;
  cam_dz = 0;
  pan = 0;
  tilt = 0;
  updateCamCenter();

  seed = second();
  randomSeed(seed);
  for (let i = 0; i < WALL_NUM; i++) {
    let w = random(30, 180);
    let h = random(10, 11);
    let x = random(-WORLD_SIZE / 2, WORLD_SIZE / 2);
    let y = random(-WORLD_SIZE / 2, WORLD_SIZE / 2);
    let options = [w,h];
    let fw = random(options);
    let fh;
    if(fw==w) fh = h;
    else fh = w;
    let b = new Wall(x, y, fw, WALL_SIZE, fh);
    Bldgs.push(b);
  }
}

function draw() {
  background(102,90,37,200);

  directionalLight(164, 151, 84, 0.2, 0, 0.5); 
  directionalLight(230, 230, 230, 0, 0.2, 0.5);

  ambientLight(150, 150, 150, 100);
  directionalLight(100, 100, 100, 0, 0, 1);
  
  camera(cam_x, cam_y, cam_z, cam_cx, cam_cy, cam_cz, 0, 0, -1);
  perspective(radians(50), width / height, 10, 500);

  drawWalls();

  if (keyIsPressed) handleUserInput();
}

function handleUserInput() {
  let s = 3.5;
  switch (keyCode) {
    case UP_ARROW:
      cam_x += s * cam_dx;
      cam_y += s * cam_dy;
      break;
    case DOWN_ARROW:
      cam_x -= s * cam_dx;
      cam_y -= s * cam_dy;
      break;
    case LEFT_ARROW:
      pan -= 0.04;
      break;
    case RIGHT_ARROW:
      pan += 0.04;
      break;
  }
  
  updateCamCenter();
}

function updateCamCenter() {
  cam_dx = cos(pan) * cos(tilt);
  cam_dy = sin(pan) * cos(tilt);
  cam_dz = sin(tilt);
  
  cam_cx = cam_x + cam_dx;
  cam_cy = cam_y + cam_dy;
  cam_cz = cam_z + cam_dz;
}

function drawWalls() {
  noStroke();
  fill(138,126,58,200);
  plane(2 * WORLD_SIZE, 2 * WORLD_SIZE);
  push();
  fill(55,36,5,215);
  translate(0,0,50);
  plane(2 * WORLD_SIZE, 2 * WORLD_SIZE);
  pop();
  
  for (let b of Bldgs) {
    b.render();
  }
}