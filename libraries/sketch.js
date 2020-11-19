let fft, mic, songfile;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function touchStarted() { getAudioContext().resume(); } 


function draw() {
  background(0);
  let spectrum = fft.analyze();
  let bass, lowMid, mid, highMid, treble;

  bass = fft.getEnergy("bass");
  lowMid = fft.getEnergy("lowMid");
  mid = fft.getEnergy("mid");
  highMid = fft.getEnergy("highMid");
  treble = fft.getEnergy("treble");

  let bins=[bass,lowMid,mid,highMid,treble]

  for (var i =0;i<5;i++){
    fill(i+1*(255/5)/255,(i+1)*(255/5),0);
    rect((i*width/5)+10, height/2, 30, map(bins[i], 0, 255, 0,-height/2));

  }
  
console.log("Bass: "+bass+" lowMid: "+lowMid+" mid: "+mid+" highMid: "+highMid+" treble: "+treble);

beginShape();
stroke(0, 255, 0);
noFill();
for (var i = 0; i < spectrum.length; i++) {
let x, y;
x = map(i, 0, spectrum.length - 1, 0, windowWidth);
y = map(spectrum[i], 0, 255, height / 2, 0);
vertex(x, y);
}
endShape();
}
