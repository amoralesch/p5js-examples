class Star {
  constructor(max) {
    this.max = max;
    this.init(true);
  }

  update = function(speed) {
    this.pz = this.z;
    this.z -= speed;

    if (this.z < 1) {
      this.init(false);
    }
  }

  show = function(size) {
    this.drawStar(size);
    this.drawTail();
  }

  drawStar = function(size) {
    fill(255);
    noStroke();

    let sx = map(this.x / this.z, -1, 1, -this.max, this.max);
    let sy = map(this.y / this.z, -1, 1, -this.max, this.max);
    let r = map(this.z, 0, this.max, size, 0);

    circle(sx, sy, r / 2);
  }

  drawTail = function() {
    let sx = map(this.x / this.z, -1, 1, -this.max, this.max);
    let sy = map(this.y / this.z, -1, 1, -this.max, this.max);
    let px = map(this.x / this.pz, -1, 1, -this.max, this.max);
    let py = map(this.y / this.pz, -1, 1, -this.max, this.max);

    stroke(255);
    line(px, py, sx, sy);
  }

  init = function(rnd) {
    this.x = random(-this.max, this.max);
    this.y = random(-this.max, this.max);
    this.z = rnd ? random(this.max) : this.max;

    this.pz = this.z;
  }
}

module.exports = Star;
