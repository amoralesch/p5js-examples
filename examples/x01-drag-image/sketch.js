var effect;

function setup() {
  var p = createP("Drop an image here");
  p.class('dropzone');

  p.dragOver(fileHover);
  p.dragLeave(resetClass);
  p.drop(gotFile, resetClass);

  var canvas = createCanvas(600, 400);
  canvas.style('border', '1px solid black');
}

function draw() {
  background(255);

  if (effect && effect.img) {
    effect.updateImage();

    image(effect.img, 0, 0, width, height);
  }
}

function fileHover() {
  this.addClass('hover');
}

function resetClass() {
  this.removeClass('hover');
}

function gotFile(file) {
  loadImage(file.data, imageLoaded);
}

function imageLoaded(theImage) {
  effect = new FadeIn(theImage);
}

function mousePressed() {
  if (effect) {
    effect.reset();
  }
}
