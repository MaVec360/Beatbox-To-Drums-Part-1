let fft, mic, recorder, songFile;
var state = 0;

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



///Can't figure out how to record audio. There is this js code to create a button and when you click it, it records audio.
//But when I add the button code into the setup, it makes all the other functionality disappear.
//where can I add this code to get it to record audio AND show the FTT analysis?

//var mic, recorder, soundFile;
//var state = 0;

//function setup() {
//  createCanvas(600,600);
//  background(200);
  // create an audio in
  
//	button = createButton('click me');
//  button.position(19, 19);
//  button.mousePressed(startRec);
//  mic = new p5.AudioIn();

  // prompts user to enable their browser mic


//  mic.start();
//  mic.start();

  // create a sound recorder
  //recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  //recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  //soundFile = new p5.SoundFile();

 // text('keyPress to record', 20, 20);
//}

//function keyPressed() {
  // make sure user enabled the mic

//}

//function startRec(){
//  if (state === 0 && mic.enabled) {

    // record to our p5.SoundFile
//    recorder.record(soundFile);

//    background(255,0,0);
//    text('Recording!', 20, 20);
//    state++;
//  }
//  else if (state === 1) {
//    background(0,255,0);

    // stop recorder and
    // send result to soundFile
//    recorder.stop();

//    text('Stopped', 20, 20);
//    state++;
//  }

//  else if (state === 2) {
//    soundFile.play(); // play the result!
//    save(soundFile, 'mySound.wav');
//    state++;
//  }

//} 
