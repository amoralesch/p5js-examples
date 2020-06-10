class PixelByPixel {
  original;

  img;

  x = 0;

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

    if (this.x > this.original.width) {
      this.y++;
      this.x = 0;
    }

    this.x++;

    this.copyPixel();

    this.img.updatePixels();
  }

  copyPixel() {
    let index = (this.x + this.y * this.original.width) * 4;

    this.img.pixels[index] = this.original.pixels[index];
    this.img.pixels[index + 1] = this.original.pixels[index + 1];
    this.img.pixels[index + 2] = this.original.pixels[index + 2];
    this.img.pixels[index + 3] = this.original.pixels[index + 3];
  }

  reset() {
    this.x = 0;
    this.y = 0;

    this.newImage(this.original.width, this.original.height);
  }
}
