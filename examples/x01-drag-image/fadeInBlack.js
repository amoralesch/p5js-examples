class FadeInBlack {
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

    for (var i = 0; i < this.img.pixels.length; i++) {
      this.img.pixels[i] = 255;
    }
  }

  updateImage() {
    if (this.cycleCount > 255) {
      return;
    }

    this.cycleCount++;

    for (var x = 0; x < this.original.pixels.length; x++) {
      if (this.original.pixels[x] < this.img.pixels[x]) {
        this.img.pixels[x]--;
      }
    }

    this.img.updatePixels();
  }

  reset() {
    this.cycleCount = 0;

    this.newImage(this.original.width, this.original.height);
  }
}
