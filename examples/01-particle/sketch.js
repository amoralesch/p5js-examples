var particles = [];

function setup() {
  createCanvas(1200, 800);
}

function draw() {
  background(255);
  for (var i = 0; i < particles.length; i++) {
    let particle = particles[i];

    particle.move(width, height);
    particle.draw();
  }
}

function mousePressed() {
  particles.push(new Particle(mouseX, mouseY));
}
