var a = 0;
var sponge = [];

function setup() {
  createCanvas(400, 400, WEBGL);

  sponge[0] = new Box(0, 0, 0, 200);
}

function draw() {
  background(100);
  stroke(255);
  noFill();
  lights();

  rotateX(a);
  rotateY(a);
  rotateZ(a);

  for (var i = 0; i < sponge.length; i++) {
    sponge[i].show();
  }

  a += 0.01;
}

function mousePressed() {
  var newSponge = [];

  for (var i = 0; i < sponge.length; i++) {
    newSponge.push(...sponge[i].split());
  }

  sponge = newSponge;
}
