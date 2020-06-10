var effect;
var effectType = 'FadeInWhite';
var cacheImage;

var classes = {
  'FadeInWhite': FadeInWhite,
  'FadeInBlack': FadeInBlack,
  'FadeInRGB': FadeInRGB,
  'FadeOut': FadeOut,
  'PixelByPixel': PixelByPixel,
  'LineByLine': LineByLine
}

function setup() {
  var p = createP("Drop an image here");
  p.class('dropzone');

  p.dragOver(fileHover);
  p.dragLeave(resetClass);
  p.drop(gotFile, resetClass);

  var s = createSelect();
  s.option('Select an effect');
  s.disable('Select an effect');
  s.option('Fade In from White', 'FadeInWhite');
  s.option('Fade In from Black', 'FadeInBlack');
  s.option('Fade In RGB', 'FadeInRGB');
  s.option('Fade Out', 'FadeOut');
  s.option('Pixel by Pixel', 'PixelByPixel');
  s.option('Line by Line', 'LineByLine');
  s.changed(changeEffect)

  createElement('br');

  var canvas = createCanvas(1200, 800);
  canvas.style('border', '1px solid black');
  canvas.mousePressed(resetImage);
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
  cacheImage = theImage;
  effect = new classes[effectType](cacheImage);
}

function changeEffect() {
  effectType = this.value();

  if (cacheImage) {
    imageLoaded(cacheImage);
  }
}

function resetImage() {
  if (effect) {
    effect.reset();
  }
}
