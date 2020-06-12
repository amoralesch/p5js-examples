class Particle {
  step = 15;

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

    this.x = this.getNewValue(this.x, maxX);
    this.y = this.getNewValue(this.y, maxY);

    return { x: this.x, y: this.y };
  }

  getNewValue = function(current, max) {
    current += getRndInteger(-this.step, this.step);

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
    for (var i = 0; i < this.previousPoints.length; i++) {
      let alpha = map(i, 0, this.previousPoints.length, 0, this.maxAlphaTail);
      let radio = map(i, 0, this.previousPoints.length, 0, this.sizeTail);
      let point = this.previousPoints[i];

      fill(150, alpha);
      circle(point.x, point.y, radio);
    }
  }
}

function getRndInteger(min, max) {
  return Math.round(Math.random() * (max - min) ) + min;
}

module.exports = Particle;
