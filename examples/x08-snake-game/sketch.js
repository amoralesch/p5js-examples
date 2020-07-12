var snake;
var fruit;
var score = 0;

var vScale = 40;
var cols;
var rows;

function setup() {
  createCanvas(800, 600);
  frameRate(10);

  cols = width / vScale;
  rows = height / vScale;

  snake = new Snake(round(cols / 2), round(rows / 2));
  newFruit();
}

function draw() {
  background(100);

  snake.move(cols, rows);

  if (snake.death) {
    reset();
    return;
  }

  if (snake.eat(fruit)) {
    ++score;
    newFruit();
  }

  drawSnake();  
  drawFruit();
  drawScore();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.changeDirection(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.changeDirection(1, 0);
  } else if (keyCode === UP_ARROW) {
    snake.changeDirection(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.changeDirection(0, 1);
  }
}

function newFruit() {
  fruit = createVector(floor(random(cols)), floor(random(rows)));
}

function drawFruit() {
  fill(255, 0, 0);
  circle((fruit.x * vScale) + (vScale / 2), (fruit.y * vScale) + (vScale / 2), vScale);
}

function drawSnake() {
  fill(255);

  for (var i = 0; i < snake.tail.length; i++) {
    square(snake.tail[i].x * vScale, snake.tail[i].y * vScale, vScale);
  }

  square(snake.x * vScale, snake.y * vScale, vScale);
}

function drawScore() {
  fill(255, 255, 0, 150);
  textSize(32);
  text('Score: ' + score, 10, 30);
}

function reset() {
  score = 0;
  snake = new Snake(round(cols / 2), round(rows / 2));
  newFruit();
}