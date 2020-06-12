var position;
var previousPoints = [];

var limit = 1000;

function setup() {
  createCanvas(1200, 800);
  position = createVector(width / 2, height / 2);
}

function draw() {
  background(0);
  updateHistory(previousPoints, position, limit);
  position = newPosition(position);
  drawPrincipal(position);
  drawHistory(previousPoints);
}

function updateHistory(previous, current, limit) {
  if (!previous.includes(current)) {
    previous.push(current);
  }

  if (previous.length > limit) {
    previous.shift();
  }
}

function newPosition(previous) {
  let x = previous.x + round(random(-5, 5));
  let y = previous.y + round(random(-5, 5));

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

function drawPrincipal(pos) {
  noStroke();
  fill(150);
  circle(pos.x, pos.y, 50);
}

function drawHistory(previous) {
  fill(255);
  for (var i = 0; i < previous.length; i++) {
    circle(previous[i].x, previous[i].y, 5);
  }
}
