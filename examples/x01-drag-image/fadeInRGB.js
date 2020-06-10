class FadeInRGB {
  original;

  img;

  cycleCount = 0;

  offset = 0;

  constructor(theImage) {
    this.original = theImage;
    this.original.loadPixels();

    this.newImage(this.original.width, this.original.height);
  }

  newImage(theWidth, theHeight) {
    this.img = createImage(theWidth, theHeight);
    this.img.loadPixels();

    for (var i = 0; i < this.img.pixels.length; i++) {
      let isAlpha = (i + 1) % 4 == 0;

      this.img.pixels[i] = isAlpha ? this.original.pixels[i] : 0;
    }
  }

  updateImage() {
    if (this.offset > 2) {
      return
    }

    if (this.cycleCount > 255) {
      this.offset++;
      this.cycleCount = 0;
    }

    this.cycleCount++;

    for (var x = 0; x < this.original.width; x++) {
      for (var y = 0; y < this.original.height; y++) {
        this.writeColor(x, y);
      }
    }

    this.img.updatePixels();
  }

  writeColor(x, y) {
    let index = ((x + y * this.original.width) * 4) + this.offset;

    if (this.original.pixels[index] > this.img.pixels[index]) {
      this.img.pixels[index]++;
    }
  }

  reset() {
    this.offset = 0;
    this.cycleCount = 0;

    this.newImage(this.original.width, this.original.height);
  }
}
