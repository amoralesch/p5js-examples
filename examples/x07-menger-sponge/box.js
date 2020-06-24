class Box {
  constructor(x, y, z, size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
  }

  split = function() {
    var newBoxes = [];
    for (var x = -1; x < 2; x++) {
      for (var y = -1; y < 2; y++) {
        for (var z = -1; z < 2; z++) {
          var add = (abs(x) + abs(y) + abs(z)) > 1;

          if (!add) {
            continue;
          }

          var newSize = this.size / 3;
          var newX = this.x + x * newSize;
          var newY = this.y + y * newSize;
          var newZ = this.z + z * newSize;

          newBoxes.push(new Box(newX, newY, newZ, newSize))
        }
      }
    }

    return newBoxes;
  }

  show = function() {
    push();

    noStroke();
    fill(255);
    translate(this.x, this.y, this.z);
    box(this.size);

    pop();
  }
}

module.exports = Box;
