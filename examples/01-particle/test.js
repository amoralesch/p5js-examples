'use strict';

const expect = require('chai').expect;

const Particle = require('./particle');

describe('Particle tests', function() {
  const x = 50;

  const y = 50;

  let particle;

  beforeEach(function() {
    particle = new Particle(x, y);
  });

  it('should be an object', function(done) {
    expect(particle).to.be.a('object');
    expect(particle.x).to.equal(x);
    expect(particle.y).to.equal(y);
    done();
  });

  it('should move less than step pixels', function(done) {
    particle.move(100, 100);

    expect(particle.x).to.be.gte(x - particle.step);
    expect(particle.x).to.be.lte(x + particle.step);

    expect(particle.y).to.be.gte(y - particle.step);
    expect(particle.y).to.be.lte(y + particle.step);

    done();
  });

  it('should wrap X when X is greater than max width', function(done) {
    particle.x = 100;
    particle.move(10, 10);

    expect(particle.x).to.equal(0);
    done();
  });

  it('should wrap X when X is less than zero', function(done) {
    particle.x = -100;
    particle.move(10, 10);

    expect(particle.x).to.equal(10);
    done();
  });

  it('should wrap Y when Y is greater than max height', function(done) {
    particle.y = 100;
    particle.move(10, 10);

    expect(particle.y).to.equal(0);
    done();
  });

  it('should wrap Y when Y is less than zero', function(done) {
    particle.y = -100;
    particle.move(10, 10);

    expect(particle.y).to.equal(10);
    done();
  });

  it('should store previous position when it moves with wiggle OFF', function(done) {
    particle.wiggle = false;
    particle.move(100, 100);

    expect(particle.previousPoints.length).to.be.equal(1);
    expect(particle.previousPoints[0].x).to.be.equal(x);
    expect(particle.previousPoints[0].y).to.be.equal(y);
    done();
  });

  it('should wiggle previous position when it moves with wiggle ON', function(done) {
    particle.wiggle = true;
    particle.move(100, 100);

    expect(particle.previousPoints.length).to.be.equal(1);
    expect(closeEnough(
      particle.previousPoints[0],
      { x : x, y : y },
      particle.wiggleStep)).to.be.true;
    done();
  });

  it('should delete first element when history is full', function(done) {
    particle.limitHistory = 3;
    let tooOld = particle.move(100, 100);
    let point1 = particle.move(100, 100);
    let point2 = particle.move(100, 100);
    let point3 = particle.move(100, 100);
    let last = particle.move(100, 100);

    expect(particle.previousPoints.length).to.be.equal(3);
    expect(
      closeEnough(particle.previousPoints[0], point1, particle.wiggleStep))
      .to.be.true;
    expect(
      closeEnough(particle.previousPoints[1], point2, particle.wiggleStep))
      .to.be.true;
    expect(
      closeEnough(particle.previousPoints[2], point3, particle.wiggleStep))
      .to.be.true;
    done();
  });

  function closeEnough(pointA, pointB, separation) {
    if (Math.abs(pointA.x - pointB.x) > separation) {
      return false;
    }

    if (Math.abs(pointA.y - pointB.y) > separation) {
      return false;
    }

    return true;
  }
});
