class FadeIn {
  original;

  img;

  cycleCount = 0;

  constructor(theImage) {
    this.original = theImage;
    this.original.loadPixels();

    this.img = createImage(this.original.width, this.original.height);
    this.img.loadPixels();
  }

  updateImage() {
    if (this.cycleCount > 255)
      return;

    for (var x = 0; x < this.original.width; x++) {
      for (var y = 0; y < this.original.height; y++) {
        this.writeColor(x, y);
      }
    }

    this.img.updatePixels();
  }

  writeColor(x, y) {
    let index = (x + y * this.original.width) * 4;

    if (this.original.pixels[index] > this.img.pixels[index]) {
      this.img.pixels[index]++;
    }

    if (this.original.pixels[index + 1] > this.img.pixels[index + 1]) {
      this.img.pixels[index + 1]++;
    }

    if (this.original.pixels[index + 2] > this.img.pixels[index + 2]) {
      this.img.pixels[index + 2]++;
    }

    if (this.original.pixels[index + 3] > this.img.pixels[index + 3]) {
      this.img.pixels[index + 3]++;
    }
  }

  reset() {
    this.cycleCount = 0;
    this.img = createImage(this.original.width, this.original.height);
    this.img.loadPixels();
  }
}
