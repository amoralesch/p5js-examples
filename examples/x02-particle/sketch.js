var position;
var previousPoints = [];

var size = 50
var step = 5;
var limit = 1000;

function setup() {
  createCanvas(1200, 800);
  position = createVector(width / 2, height / 2);
}

function draw() {
  background(255);
  updateHistory(previousPoints, position, limit);
  position = newPosition(position, step);
  drawHistory(previousPoints, size / 2);
  drawPrincipal(position, size);
}

function updateHistory(previous, current, limit) {
  if (!previous.includes(current)) {
    previous.push(current);
  }

  if (previous.length > limit) {
    previous.shift();
  }
}

function newPosition(previous, step) {
  let x = previous.x + round(random(-step, step));
  let y = previous.y + round(random(-step, step));

  if (x > width) {
    x = 0;
  } else if (x < 0) {
    x = width;
  }

  if (y > height) {
    y = 0;
  } else if (y < 0) {
    y = height;
  }

  return createVector(x, y);
}

function drawPrincipal(pos, size) {
  noStroke();
  fill(100);
  circle(pos.x, pos.y, size);
}

function drawHistory(previous, max) {
  for (var i = 0; i < previous.length; i++) {
    let d = map(i, 0, previous.length, 0, 100);

    fill(150, d);
    circle(previous[i].x, previous[i].y, map(i, 0, previous.length, 0, max));
  }
}
