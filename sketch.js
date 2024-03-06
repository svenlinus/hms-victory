let xOffs = [];
let colors = [];
let waveOff = [];
const s = 20;
const start = 200;
const w = 620, h = 600;
let seed = 0;
let time = 0;

function setup() {
  frameRate(60);
  randomSeed(seed);
  xOffs = [], colors = [], waveOff = [];
  time = 0;
  const cnv = createCanvas(760, h - start * 2);
  const container = document.getElementById('myCanvas');
  const sd = document.getElementById('seed');
  sd.innerText = seed;
  cnv.parent(container);
  for (let i = 0; i < h; i += s) {
    xOffs.push(random(-40, 40));
    waveOff.push(random(-1, 1));
    if (i >= h / 2 - s) {
      colors.push(color(16, 181 + random(40), 225));
    }
    else {
      // const r = map(i, 0, h/2, 0, 255);
      // const g = map(i, 0, h/2, 0, 255);
      // const b = map(i, 0, h/2, 255, 100);
      // colors.push(color(r + random(-10, 10), g, b + random(20)));
      const normal = map(i, 200, h/2, 0, 1);
      const c1 = color(238,94,63);
      const c2 = color(215,207,13);
      colors.push(lerpColor(c1, c2, normal))
    }
  }
  background(0, 0);
}

function draw() {
  // if (frameCount <= 314) {
  //   if (frameCount % 4 == 0) saveCanvas('boat' + frameCount / 4 + '.png');
  // }
  push();
  translate(0, -start);
  rectMode(CORNER);
  // background(0);
  clear();
  noStroke();
  const freq = 0.02, amp = 10;
  for (let i = start; i < h - start; i += s) {
    index = floor(i / s);
    fill(colors[index]);
    const radius = sqrt(sq(200) - sq(i-300)) * w/h;
    const off = index * 1;
    const wave = i >= h / 2 - s
      ? sin(off * 2) * 70 + sin(time * freq + off) * amp
      : 0;
    const c = colors[index];
    // fill(red(c), green(c) + wave, blue(c) + wave);
    if (index == floor(h / 2 / s) + 1) {
      const x = cos(time * freq + off) * amp + cos(time * freq * 2 + off + 6) * amp / 2;
      const y = sin(time * freq + off) * amp + sin(time * freq * 2 + off + 6) * amp / 2;
      const s = 0.2, sx = s * x, sy = s * y;
      push();
      translate(width/2 - sx * 2, h/2 + 25);
      rotate(sx * 0.01 + sy * 0.01);
      scale(1.2);
      boat();
      pop();
    }
    rect(width/2 - radius + xOffs[index] + wave, i, radius * 2, s);
    // if (index == floor(h / 2 / s) - 2) {
    //   for (let j = 0; j < 20; j ++) {
    //     fill(255, 255 / 20);
    //     circle(width/2, h/2+120, 300 + pow(j, 1.8));
    //   }
    //   fill(0);
    //   rect(0, h/2, width, h/2);
    // }
  }
  pop();

  time ++;

  if (time == 314) {
    console.warn('loop');
    setup();
  }
}

function keyReleased() {
  if (keyCode == 32) {
    seed += 1;
    setup();
  }
}

// const vertices = [
//   {x: , y: },
//   {x: , y: },
//   {x: , y: },
// ];

function boat() {
  push();
  translate(0, -20);
  noStroke();
  fill(32, 20, 0);
  // Boat
  arc(0, 0, 100, 60, -0.1, PI + 0.1);
  // Mast
  rect(-2, -70, 6, 70);
  fill(255);
  // Back sail
  beginShape();
  for (let i = 0; i < 3; i++) {
    const theta = time / 3 + i;
    vertex(4 + i * 14 + cos(theta) * i, -70 + i * 20 + sin(theta) * i);
  } 
  vertex(46, -10); // Tip
  for (let i = 1; i < 4; i++) {
    const theta = time / 3 - i;
    vertex(46 - i * 14 + cos(-theta) * -(i - 3), -8 + sin(-theta) * -(i - 3));
  }
  endShape();
  // Fore sail
  beginShape();
  for (let i = 0; i < 3; i++) {
    const theta = time / 3 + i + 1;
    vertex(-2 - i * 13 + cos(theta) * i, -66 + i * 19 + sin(theta) * i);
  } 
  vertex(-45, -5);
  for (let i = 1; i < 4; i++) {
    const theta = time / 3 - i + 1;
    vertex(-45 + i * 10 + cos(-theta), -5 + sin(-theta));
  }
  endShape();

  // Boom
  fill(32, 20, 0);
  rect(0, -10, 46, 4);
  pop();
}