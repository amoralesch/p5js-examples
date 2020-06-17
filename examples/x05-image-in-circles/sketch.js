var driver;
var vScale = 10;
var option;
var process = false;
var screenshoot;

function setup() {
  createCanvas(1600, 1200);

  let constraints = {
    video: {
      width: width / vScale,
      height: height / vScale,
    },
    audio: false
  };

  driver = createCapture(constraints);
  driver.hide();

  option = createCheckbox("Squares?", false);
}

function mousePressed() {
  screenshoot = driver.get();
  process = true;
}

function draw() {
  if (!screenshoot || !process) {
    return;
  }

  background(0);

  screenshoot.loadPixels();

  let offset = vScale / 2;
  for (var y = 0; y < screenshoot.height; y++) {
    for (var x = 0; x < screenshoot.width; x++) {
      let index = x + y * screenshoot.width;

      let r = screenshoot.pixels[(index * 4) + 0];
      let g = screenshoot.pixels[(index * 4) + 1];
      let b = screenshoot.pixels[(index * 4) + 2];

      let brightness = (r + g + b) / 3;
      let size = map(brightness, 0, 255, 0, vScale);

      if (option.checked()) {
        square((x * vScale), (y * vScale), size);
      } else {
        circle((x * vScale) + offset, (y * vScale) + offset, size);
      }
    }
  }

  process = false;
}
