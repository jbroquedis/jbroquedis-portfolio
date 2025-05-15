export default function (p) {
  let cols, rows;
  let scl = 20;
  let zoff = 0;
  let ripples = [];
  let rippleFrequency = 0.015;
  let rippleSpeed = 0.1;
  let rippleDuration = 300;
  let noiseSpeed = 0.002;
  let bgColor = '#f5f0e6';
  let lineColor = '#3e2f2f';
  let lineAlpha = 255;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);
    p.noFill();
    p.strokeWeight(1);
    p.noiseDetail(4, 0.5);
  };

  p.draw = function () {
    p.background(bgColor);

    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      p.beginShape();
      for (let x = 0; x < cols; x++) {
        let px = x * scl;
        let py = y * scl;
        let n = p.noise(xoff, yoff, zoff);
        let elevation = p.map(n, 0, 1, -50, 50);

        p.stroke(lineColor + p.hex(lineAlpha, 2));
        p.curveVertex(px, py + elevation);
        xoff += 0.1;
      }
      p.endShape();
      yoff += 0.1;
    }

    zoff += noiseSpeed;
  };

  p.mousePressed = function () {
    ripples.push({ x: p.mouseX, y: p.mouseY, startFrame: p.frameCount });
  };
}
