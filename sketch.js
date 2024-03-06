let xOffs = [];
let colors = [];
let waveOff = [];
const s = 20;
const start = 200;
const w = 620, h = 600;
let seed = 0;
let time = 0;
const dim = [];

function setup() {
  // console.warn(randomSeed());
  const cnv = createCanvas(600, 600);
  const container = document.getElementById('myCanvas');
  cnv.parent(container);
  // frameRate(60);
  background(0, 0);
  for (let i = 0; i < 20; i ++) {
    dim.push({x: random(-10, 10), width: random(-40, 40)});
  }
}

function draw() {
  // if (frameCount <= 314) {
  //   if (frameCount % 4 == 0) saveCanvas('boat' + frameCount / 4 + '.png');
  // }
  push();
  rectMode(CORNER);
  // background(0);
  clear();

  noStroke();

  for (let i = 0; i < 10; i ++) {
    fill(100, 100, 255, 15);
    circle(width/2, height/2 - 30, 300 + i * 10);
  }
  fill(220, 220, 255, 255);
  circle(width/2, height/2 - 30, 300);
    
  fill(0);
  rect(0, height/2 - 10, width, 300);


  rectMode(CENTER);
  const start = {x: width/2, y: height/2 - 5}
  const f = 0.05, a = 5;
  const d = 7;
  for (let i = 0; i < d + 1; i ++) {
    const w = sqrt(sq(150) - sq((200/d) * i - 30));
    const off = i * 2;
    const x = start.x + cos(time * f + off) * a * 2;
    const y = start.y + i * 15;// + sin(time * f + off) * a;
    if (i == 0 && time == 5)
      console.warn(x);
    fill(0);
    // rect(x, y + 138, width, 300);
    fill(220, 220, 255);
    rect(x, y, 2 * w, 2 - i / 4);
  }


  rectMode(CORNER);
  const freq = 0.02, amp = 10;
  const x = cos(time * freq) * amp + cos(time * freq * 2 + 6) * amp / 2;
  const y = sin(time * freq) * amp + sin(time * freq * 2 + 6) * amp / 2;
  const s = 0.2, sx = s * x, sy = s * y;
  const r = sx * 0.01 + sy * 0.01
  push();
  translate(width/2 - sx * 3, height/2 + sy);

  // Boat
  push();
  rotate(r);
  scale(1.2);
  boat();
  pop();

  // Shadow
  // rotate(PI - r);
  scale(1.2, -1);
  boat(true);
  pop();




  pop();

  time += 1;

  // if (time == 314) {
  //   console.warn('loop');
  //   setup();
  // }
}

function keyReleased() {
  if (keyCode == 32) {
    seed += 1;
    setup();
  }
}

function boat(shadow) {
  push();
  translate(0, -20);
  noStroke();
  fill(0);
  // Boat
  arc(0, 0, 100, 60, -0.1, PI + 0.1);
  // Mast
  rect(-2, -70, 6, 70);
  if (!shadow) fill(0, 0, 70, 220);
  let freq = 1 / 3, amp = 0.3;
  // Back sail
  beginShape();
  for (let i = 0; i < 3; i++) {
    const theta = time * freq + i;
    vertex(4 + i * 14 + cos(theta) * amp * i, -70 + i * 20 + sin(theta) * amp * i);
  } 
  vertex(46, -10); // Tip
  for (let i = 1; i < 4; i++) {
    const theta = time * freq - i;
    vertex(46 - i * 14 + cos(-theta) * amp * -(i - 3), -8 + sin(-theta) * amp * -(i - 3));
  }
  endShape();
  // Fore sail
  beginShape();
  for (let i = 0; i < 3; i++) {
    const theta = time * freq + i + 1;
    vertex(1 - i * 14 + cos(theta) * amp * i, -66 + i * 19 + sin(theta) * amp * i);
  } 
  vertex(-45, -5);
  for (let i = 1; i < 4; i++) {
    const theta = time * freq - i + 1;
    vertex(-45 + i * 10 + cos(-theta) * amp, -5 + sin(-theta) * amp);
  }
  endShape();

  // Flag
  amp = 1;
  beginShape();
  for (let i = 0; i < 4; i++) {
    const theta = time * freq + i + 2;
    vertex(-2 - i * 8 + cos(theta) * amp * i, -68 + i * 2 + sin(theta) * amp * i);
  } for (let i = 1; i < 4; i++) {
    const theta = time * freq - i + 2;
    vertex(-28 + i * 7 + cos(-theta) * amp * -(i - 3), -62 + i * 2 + sin(-theta) * amp * -(i - 3));
  }
  endShape();

  // Boom
  fill(0);
  rect(0, -10, 46, 4);
  pop();
}