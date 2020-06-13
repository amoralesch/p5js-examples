class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.radio = r;
  }

  draw = function() {
    circle(this.x, this.y, this.radio * 2);
  }

  overlaps = function(ball) {
    let d = dist(this.x, this.y, ball.x, ball.y);

    return d < (this.radio + ball.radio);
  }
}

module.exports = Ball;
