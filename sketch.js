let sphere_sl, rotate_A_sl, rotate_B_sl, light_side_A_sl, light_side_B_sl, light_color_A_sl, light_color_B_sl, sphere_detail_X_sl, sphere_detail_Y_sl;
let last_rotation=-1, current_rotation;
let ENCLOSURE_SIZE = 800;
let MAX_SPACE = 40;
let gridSz = ENCLOSURE_SIZE / MAX_SPACE;
let map = [];

function preload() {
  //font_typewr = loadFont('TYPEWR__.TTF'); // https://www.1001freefonts.com/
  font_vonique = font_typewr = loadFont('Vonique 64.ttf');
}

function resetMap() {
  for (let i = 0; i < gridSz; i++)
    for (let j = 0; j < gridSz; j++) {
      map[i][j] = false;
    }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //colorMode(HSB, 360, 100, 100, 1);
  colorMode(RGB,1);
  textSize(30);
  textFont(font_vonique)
  
  // init map
  for (let i = 0; i < gridSz; i++) {
    map[i] = [];
    for (let j = 0; j < gridSz; j++) {
      map[i][j] = false;
    }
  }
  sphere_sl = createSlider(1, 300, 3);
  sphere_sl.position(10, 30);
  
  rotate_A_sl = createSlider(0, 360, 0, 15);
  rotate_A_sl.position(10, 50);
  rotate_B_sl = createSlider(0, 360, 0, 15);
  rotate_B_sl.position(10, 70);
  
  light_side_A_sl = createSlider(0, 360, 0, 15);
  light_side_A_sl.position(10, 90);
  light_side_B_sl = createSlider(0, 360, 0, 15);
  light_side_B_sl.position(10, 110);
  
  light_color_A_sl = createSlider(0, 360, 0, 15);
  light_color_A_sl.position(10, 130);
  light_color_B_sl = createSlider(0, 350, 0, 15);
  light_color_B_sl.position(10, 150);
  
  sphere_detail_X_sl = createSlider(5, 10, 1);
  sphere_detail_X_sl.position(10, 170);
  sphere_detail_Y_sl = createSlider(5, 10, 1);
  sphere_detail_Y_sl.position(10, 190);
}

function draw() {
  randomSeed(0);
  lights();
  let r_light_side_A = radians(light_side_A_sl.value());
  let r_light_side_B = radians(light_side_B_sl.value());
  let r_light_A = radians(light_color_A_sl.value());
  let r_light_B = radians(light_color_B_sl.value());
  let r_rotate_A = radians(rotate_A_sl.value());
  let r_rotate_B = radians(rotate_B_sl.value());
  
  current_rotation = pow(r_rotate_A,2)+pow(r_rotate_B,3);
  if(last_rotation!=current_rotation) {
    clear();
  }
  
  directionalLight(cos(r_light_A)*sin(r_light_B),sin(r_light_A)*sin(r_light_B),cos(r_light_A),cos(r_light_side_A)*sin(r_light_side_B),sin(r_light_side_A)*sin(r_light_side_B),cos(r_light_side_B));
  
  
  rotateY(sin(r_rotate_A)*sin(r_rotate_B));
  rotateZ(cos(r_rotate_B));
  rotateX(cos(r_rotate_A)*sin(r_rotate_B));
  
  fill(0.2);
  fill(0.5);
  
  noStroke();
  let num_sphere = sphere_sl.value();
  translate(-ENCLOSURE_SIZE / 2, -ENCLOSURE_SIZE / 2);
  for (let i = 0; i < num_sphere; i++) {
    let isEmpty = false;
    let x = 0,
    y = 0;
    
    //Loop until it finds an empty spot
    while (isEmpty == false) {
      x = floor(random(0, gridSz));
      y = floor(random(0, gridSz));
      if (map[x][y] == false) {
        isEmpty = true;
        map[x][y] = true;
      }
    }
    
    //Select random values
    let heigh_diff = random(10, 1000);
    let tam = random(10, MAX_SPACE/2);
    let dX = random(3, sphere_detail_X_sl.value());
    let dY = random(3, sphere_detail_Y_sl.value());
    
    //Render a sphere
    push();
    translate(x * MAX_SPACE, y * MAX_SPACE, heigh_diff/2);
    sphere(tam, int(dX),int(dY));
    pop();
  }
  resetMap();
}