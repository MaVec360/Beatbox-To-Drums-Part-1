var fft, mic, recorder, songFile;
var state = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //FFT Set up
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  getAudioContext().resume();
  //Button set up
  button = createButton('click me');
  button.position(0, 0);}
  button.mousePressed(startRec);
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  text('Enable mic and click the mouse to begin recording', 20, 20);

// make sure user enabled the mic
function touchStarted() { getAudioContext().resume(); } 

//function keyPressed() {
  // make sure user enabled the mic

//}




//FFT analyzer
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

//FFT Visualization

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

//Recording functionality

function startRec(){
  if (state === 0 && mic.enabled) {

    // record to our p5.SoundFile
    recorder.record(soundFile);

    text('Recording!', 20, 20);
    state++;
  }
  else if (state === 1) {

    // stop recorder and
    // send result to soundFile
    recorder.stop();

    text('Stopped', 20, 20);
    state++;
  }

  else if (state === 2) {
    soundFile.play(); // play the result!
    save(soundFile, 'mySound.wav');
    state++;
  }

  else if (state === 2) {
    soundFile.play(); // play the result!
    save(soundFile, 'mySound.wav');
    state++;
  }
}
