class FadeOut {
  original;

  img;

  cycleCount = 0;

  constructor(theImage) {
    this.original = theImage;
    this.original.loadPixels();

    this.newImage();
  }

  newImage() {
    this.img = createImage(this.original.width, this.original.height);
    this.img.loadPixels();

    for (var i = 0; i < this.original.pixels.length; i++) {
      this.img.pixels[i] = this.original.pixels[i];
    }
  }

  updateImage() {
    if (this.cycleCount > 255) {
      return;
    }

    this.cycleCount++;

    for (var i = 0; i < this.original.pixels.length; i++) {
      if (this.img.pixels[i] > 0) {
        this.img.pixels[i]--;
      }
    }

    this.img.updatePixels();
  }

  reset() {
    this.cycleCount = 0;

    this.newImage();
  }
}
