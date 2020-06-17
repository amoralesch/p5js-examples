var driver;
var process = false;
var screenshot;
var vScale = 5;

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
}

function draw() {
  background(0);

  if (screenshot) {
    if (process) {
      screenshot.loadPixels();

      for (var i = 0; i < screenshot.pixels.length; i++) {
        if ((i + 1) % 4 != 0) {
          screenshot.pixels[i] = 255 - screenshot.pixels[i];
        }
      }

      screenshot.updatePixels();
      process = false;
    }

    image(screenshot, 0, 0, width, height);
  }
}

function mousePressed() {
  screenshot = driver.get();
  process = true;
}
