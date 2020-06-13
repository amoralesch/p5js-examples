var redraw = true;
var points = [];

function setup() {
  createCanvas(1200, 800);

  for (let i = 0; i < 100; i++) {
    points.push({ x : random(width), y : random(height) });
  }
}

function draw() {
  if (redraw) {
    background(255);

    stroke(0);
    drawShortestTree();

    noStroke();
    fill(0);

    for(let i = 0; i < points.length; i++) {
      circle(points[i].x, points[i].y, 10);
    }

    redraw = false;
  }
}

function mousePressed() {
  points.push({ x : mouseX, y : mouseY });
  redraw = true;
}

function drawShortestTree() {
  let reached = [];
  let unreached = [].concat(points);

  reached.push(unreached[0]);
  unreached.splice(0, 1);

  while (unreached.length > 0) {
    let minDistance = 100000;

    let rIndex;
    let uIndex;
    for (let i = 0; i < reached.length; i++) {
      for (let j = 0; j < unreached.length; j++) {
        let d = distance(reached[i], unreached[j]);

        if (d < minDistance) {
          minDistance = d;
          rIndex = i;
          uIndex = j;
        }
      }
    }

    line(
      reached[rIndex].x, reached[rIndex].y,
      unreached[uIndex].x, unreached[uIndex].y);

    reached.push(unreached[uIndex]);
    unreached.splice(uIndex, 1);
  }
}

function distance(pointA, pointB) {
  return dist(pointA.x, pointA.y, pointB.x, pointB.y)
}