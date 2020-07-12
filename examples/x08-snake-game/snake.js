class Snake {
  constructor(x, y) {
    this.x = x
    this.y = y;

    this.tail = [];
    this.death = false;

    this.speedX = 1;
    this.speedY = 0;
  }

  move = function(maxX, maxY) {
    if (this.death) {
      return;
    }

    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }

    this.tail[this.tail.length - 1] = createVector(this.x, this.y);

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x >= maxX || this.y < 0 || this.y >= maxY) {
      this.death = true;
      return;
    }

    for (var i = 0; i < this.tail.length; i++) {
      if (dist(this.x, this.y, this.tail[i].x, this.tail[i].y) == 0) {
        this.death = true;
        break;
      }
    }
  }

  changeDirection = function(changeX, changeY) {
    if ((this.speedX + changeX) == 0 && (this.speedY + changeY) == 0) {
      return
    }

    this.speedX = changeX;
    this.speedY = changeY;
  }

  eat = function(fruit) {
    let ate = dist(this.x, this.y, fruit.x, fruit.y) < 1;

    if (ate) {
      this.tail.unshift(createVector(this.x, this.y));
    }

    return ate;
  }
}

module.exports = Snake;
