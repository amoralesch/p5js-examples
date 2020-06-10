class LineByLine {
  original;

  img;

  y = 0;

  constructor(theImage) {
    this.original = theImage;
    this.original.loadPixels();

    this.newImage(this.original.width, this.original.height);
  }

  newImage(theWidth, theHeight) {
    this.img = createImage(theWidth, theHeight);
    this.img.loadPixels();

    for (var i = 0; i < this.img.pixels.length; i++) {
      this.img.pixels[i] = 0;
    }
  }

  updateImage() {
    if (this.y > this.original.height) {
      return
    }

    this.y++;

    for (var x = 0; x < this.original.width; x++) {
      this.copyPixel(x, this.y);
    }

    this.img.updatePixels();
  }

  copyPixel(x, y) {
    let index = (x + y * this.original.width) * 4;

    this.img.pixels[index] = this.original.pixels[index];
    this.img.pixels[index + 1] = this.original.pixels[index + 1];
    this.img.pixels[index + 2] = this.original.pixels[index + 2];
    this.img.pixels[index + 3] = this.original.pixels[index + 3];
  }

  reset() {
    this.y = 0;

    this.newImage(this.original.width, this.original.height);
  }
}
