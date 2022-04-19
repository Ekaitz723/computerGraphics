let upper_yrot = 0;
let upper_zrot = 0;
let forearm_yrot = 0;
let forearm_zrot = 0;
let cn = 0;
let c=0;
let mag_cn = 45/360;
let cn_change = false;

function preload() {
  bg = loadImage('rickBackground.jpg');
  song = loadSound('song.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  strokeWeight(1);
  
  upper_zrot = radians(100);
  upper_yrot = radians(180);
  forearm_zrot = radians(1);
  forearm_yrot = radians(140);
  
  upper_zrot2 =radians(280);
  upper_yrot2 = radians(180);
  forearm_zrot2 = radians(200);
  forearm_yrot2 = radians(220);
  frameRate(45);
}
function draw() {
  
  background(255);
  
  lights();
  
  orbitControl(10,10,10);
  rotateX(HALF_PI);
  
  noStroke();
  fill(250);
  
  
  if (mouseIsPressed === true) {
    
    if (!song.isPlaying()) {
      song.play();
    }
    //background(bg);
    background(172,173,201);
    push();
      RenderArm((upper_zrot2+mag_cn*sin(cn+HALF_PI/4)),-upper_yrot2,(forearm_zrot2+mag_cn/2*cos(cn)),(forearm_yrot2+mag_cn/8*sin(c)));
      push();
        translate(-30,0,-125);
        RenderP(0,0,color(0,0,0),50,50,125);
        //translate(0,0,125);
        translate(-75/2,0,0);
        RenderP(0,0,color(250,250,250),25,50,125);

        push();
          translate(0,0,125);
          RenderP(0,0,color(252, 208, 180),75,35,75);
          push();
            translate(0,0,75);
            RenderP(0,0,color(198,109,45),75,35,10);
          pop();
          push();
            translate(0,80,-10);
            RenderP(0,0,color(125,125,125),20,20,30);
            translate(0,0,-150);
            RenderP(0,0,color(200,200,200),5,5,150);
          pop();
        pop();


        translate(-25/2 - 50/2,0,0);
        RenderP(0, 0, color(0,0,0),50,50,125);

        translate(-50/2-30/4,0,125);
        RenderArm(-(upper_zrot-mag_cn*sin(cn)),upper_yrot,(forearm_zrot+mag_cn/2*cos(cn)),(forearm_yrot+mag_cn/8*sin(c)));

      pop();
    pop();
    if(cn>360*2) {
      cn_change = true;
    }
    else if(cn<0) {
      ch_change = false;
    }
    if(cn_change) {
      cn-=12*deltaTime*0.001;
    }
    else{
      cn+=12*deltaTime*0.001;
    }
    c+=8*deltaTime*0.001;
  }
  else {
    if (song.isPlaying()) {
      song.stop();
    }
  }
}

function RenderP(zrot, yrot, c,bx,by,bz) {
  // rotate frame of reference first around z and then y axis
  rotateZ(zrot);
  rotateY(yrot);
  
  push();
  translate(0, 0, bz/2);
  noStroke();
  fill(c);
  box(bx, by, bz);
  pop();
}

function RenderArm(upper_zrot,upper_yrot,forearm_zrot,forearm_yrot) {
  push();
  RenderP(upper_zrot, -upper_yrot, color(0,0,0),30,30,100);
  push();
  translate(0, 0, 100);
  RenderP(forearm_zrot, forearm_yrot, color(0,0,0),30,30,100);
  push();
  translate(0,0,100)
  RenderP(0, 0, color(252, 208, 180),30,30,20);
  pop();
  pop();
  pop();
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
  }
  song.play();
}
