var maxTries = 10000;

var radioStep = 1;

var minRadio = 5;

var maxRadio = 100;

var ballsCount = 100;

var balls = [];

function setup() {
  createCanvas(1200, 800);

  let radio = maxRadio;
  let tries = 0;
  while (balls.length < ballsCount) {
    var ball = new Ball(random(width), random(height), radio);

    var overlaps = false;
    for (var i = 0; i < balls.length; i++) {
      if (ball.overlaps(balls[i])) {
        overlaps = true;
      }
    }

    if (!overlaps) {
      tries = 0;
      balls.push(ball);
    } else {
      tries++;

      if (tries > maxTries) {
        if (radio < minRadio) {
          console.log("I give up! " + balls.length);
          break;
        } else {
          radio -= radioStep;
          tries = 0;
        }
      }
    }
  }
}

function draw() {
  background(255);

  noStroke();
  fill(200);

  for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
  }
}
