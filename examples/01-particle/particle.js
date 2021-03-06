class Particle {
  wiggle = true;

  step = 15;

  wiggleStep = this.step / 5;

  maxAlphaTail = 100;

  sizeHead = 50;

  sizeTail = this.sizeHead / 2;

  previousPoints = [];

  limitHistory = 100;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw = function() {
    this.drawHistory();
    this.drawHead();
  }

  move = function(maxX, maxY) {
    this.previousPoints.push({ x: this.x, y: this.y });

    if (this.previousPoints.length > this.limitHistory) {
      this.previousPoints.shift();
    }

    if (this.wiggle) {
      for (var i = 0; i < this.previousPoints.length; i++) {
        let point = this.previousPoints[i];

        point.x = this.getNewValue(this.wiggleStep, point.x, maxX);
        point.y = this.getNewValue(this.wiggleStep, point.y, maxY);
      }
    }

    this.x = this.getNewValue(this.step, this.x, maxX);
    this.y = this.getNewValue(this.step, this.y, maxY);

    return { x: this.x, y: this.y };
  }

  getNewValue = function(step, current, max) {
    current += getRndInteger(-step, step);

    if (current > max) {
      current = 0;
    } else if (current < 0) {
      current = max;
    }

    return current;
  }

  drawHead = function() {
    noStroke();
    fill(100);
    circle(this.x, this.y, this.sizeHead);
  }

  drawHistory = function() {
    let previousPoint;

    for (var i = 0; i < this.previousPoints.length; i++) {
      let alpha = map(i, 0, this.previousPoints.length, 0, this.maxAlphaTail);
      let radio = map(i, 0, this.previousPoints.length, 0, this.sizeTail);
      let point = this.previousPoints[i];

      noStroke();
      fill(150, alpha);
      circle(point.x, point.y, radio);

      if (previousPoint) {
        stroke(0, alpha);
        line(previousPoint.x, previousPoint.y, point.x, point.y);
      }

      previousPoint = point;
    }
  }
}

function getRndInteger(min, max) {
  return Math.round(Math.random() * (max - min) ) + min;
}

module.exports = Particle;
