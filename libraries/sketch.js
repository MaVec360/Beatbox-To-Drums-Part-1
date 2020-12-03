var fft, mic, recorder, songFile, soundFile, key, noteNames,loop,column, metronome, tempo, playPauseIcon, playButton, tempoChangeButtons;
var state = 0;
var bgcolor;

function setup() {
  createCanvas(1042, 400);
  
  bgcolor = color(0,0,0);

  // Setup mic
  mic = new p5.AudioIn();
  mic.start();
  
  // Use mic for FFT
  fft = new p5.FFT();
  fft.setInput(mic);

  // create sound recorder
  recorder = new p5.SoundRecorder();
  //connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  soundFile = new p5.SoundFile();
  //text('keyPress to record', 20, 20);
}

// make sure user enabled the mic
//function touchStarted() { getAudioContext().resume(); } 

function keyPressed() {
  // make sure user enabled the mic
  getAudioContext().resume();
  // call record function here
}


function keyTyped() {
  if (key === 'r') {
    startRec();
  } 
  // uncomment to prevent any default behavior
  return false;
}


//FFT analyzer
function draw() {
  
  background(bgcolor); // change background color based on call to startRec via keyTyped function
  
  // Analyze audio to draw FFT
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
  
  //console.log("Bass: "+bass+" lowMid: "+lowMid+" mid: "+mid+" highMid: "+highMid+" treble: "+treble);

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
    //background(255,0,0);
    bgcolor = color(153, 0, 51);

    //text('Recording!', 20, 20);
    state++;
  }
  else if (state === 1) {
    //background(0,255,0);
    bgcolor = color(51, 204, 51);

    // stop recorder and
    // send result to soundFile
    recorder.stop();

    //text('Stopped', 20, 20);
    state++;
  }
  else if (state === 2) {
    //soundFile.play(); // play the result!
    save(soundFile, 'mySound.wav');
    bgcolor = color(0, 0, 0);
    Text('Recording downloaded!',20,20);
    
    state=0;
    
  }
}
//setup a polyphonic sampler
var keys = new Tone.Players({
  "kick" : "./KICK (POPCORN).[wav]",
  "snare" : "./CLAP (WHO WHAT).[wav[",
  "hat" : "./HIHAT (A MAN).[wav]",
  "clap" : "./clap.[wav]",
}, {
  "volume" : -10,
  "fadeOut" : "64n",
}).toMaster();
//the notes
var noteNames = ["kick", "snare", "hat", "clap"];
var loop = new Tone.Sequence(function(time, col){
  var column = document.querySelector("tone-step-sequencer").currentColumn;
  column.forEach(function(val, i){
    if (val){
      //slightly randomized velocities
      var vel = Math.random() * 0.5 + 0.5;
      keys.get(noteNames[i]).start(time, 0, "32n", 0, vel);
    }
  });
  //set the columne on the correct draw frame
  Tone.Draw.schedule(function(){
    document.querySelector("tone-step-sequencer").setAttribute("highlight", col);
  }, time);
}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);
//bind the interface
document.querySelector("tone-transport").bind(Tone.Transport);
Tone.Transport.on("stop", () => {
  setTimeout(() => {
    document.querySelector("tone-step-sequencer").setAttribute("highlight", "-1");
  }, 100);
});


///set up metronome:

var metronome = new Metronome();
var tempo = document.getElementById('tempo');
tempo.textContent = metronome.tempo;

var playPauseIcon = document.getElementById('play-pause-icon');

var playButton = document.getElementById('play-button');
playButton.addEventListener('click', function() {
    metronome.startStop();

    if (metronome.isRunning) {
        playPauseIcon.className = 'pause';
    }
    else {
        playPauseIcon.className = 'play';
    }

});

var tempoChangeButtons = document.getElementsByClassName('tempo-change');
for (var i = 0; i < tempoChangeButtons.length; i++) {
    tempoChangeButtons[i].addEventListener('click', function() {
        metronome.tempo += parseInt(this.dataset.change);
        tempo.textContent = metronome.tempo;
    });
}


//when the energey of a certain frequency is triggered, return sample sound

//let sampler = new Tone.Sampler({“kickdrum”: KICK.wav});
//}
//Sampler.toMaster();

//function when() {
//	bass= fft.getEngery(“bass”)>100;
//	sampler.triggerAttack(“kickdrum”);
//}

//function when(){
//	bass= fft.getEngery(“bass”)<100;
//	sampletriggerRelease();

//function setup() {


//}
