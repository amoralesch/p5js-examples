var size = 400;
var starsCount = 400;
var stars = [];

function setup() {
  createCanvas(size * 2, size * 2);

  for (var i = 0; i < starsCount; i++) {
    stars[i] = new Star(size);
  }
}

function draw() {
  background(100);
  translate(size, size);

  let speed = map(mouseX, 0, width, 0, 25);
  let maxSize = map(mouseY, 0, height, 0, 100);

  for (var i = 0; i < stars.length; i++) {
    stars[i].update(speed);
    stars[i].show(maxSize);
  }
}
