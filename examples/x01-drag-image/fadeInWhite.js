class FadeInWhite {
  original;

  img;

  cycleCount = 0;

  constructor(theImage) {
    this.original = theImage;
    this.original.loadPixels();

    this.newImage(this.original.width, this.original.height);
  }

  newImage(theWidth, theHeight) {
    this.img = createImage(theWidth, theHeight);
    this.img.loadPixels();
  }

  updateImage() {
    if (this.cycleCount > 255) {
      return;
    }

    this.cycleCount++;

    for (var x = 0; x < this.original.pixels.length; x++) {
      if (this.original.pixels[x] > this.img.pixels[x]) {
        this.img.pixels[x]++;
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

    this.newImage(this.original.width, this.original.height);
  }
}
