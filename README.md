# Beatbox-To-Drums-Part-1

To-Do:

1.) I have been able to get the recording element to work, as well as display the FTT into 5 different buckets.
I also have a couple of drum samples include in the file, the kick drum, hi hat, and snare drum. 
My next goal is to have a sample play when the amplitude of one of the frequency buckets hits a certain limit. 

I can do some more analysis of the sample frequencies, but I know the kick has around 100-200 Hz, snare is 250-400, hi hat is >400. 
So when the user is beatboxing, and doing a kick drum sound, it should spike in the 100-200 Hz range, at which point I would want to trigger the kick drum sample to be played.

I have some code for a polymetric sampler, which maybe able to be used, but I can't conceptualize it yet... 

I think in the initial set up, the user would select a BPM (Beats Per Minute), and possibly a metronome. From there, they would beatbox, and the samples would be recordered on the sampler. 


Want to essentially get to the point where  something like this happens:

let sampler = new Tone.Sampler({“kick drum”: kicksample.mp3});
}
Sampler.toMaster();

function when() {
	bass= fft.getEngery(“bass”)>100;
	sampler.triggerAttack(“kick drum”);
}

function when(){
	bass= fft.getEngery(“bass”)<100;
	sampletriggerRelease();

function setup() {

}


2.) Step Sequencer - 

Once the sample is triggered, it needs to be housed somewhere. A step sequencer is a way to integrate the samples into a visable matrix. Ideally you'd be able to set the starting BPM of the step sequencer (maybe with a metronome) and when recording, a sample will be added to the step sequencer in the right location. 

<-----------(80 BPM)---------------->.   BPM Slider

---------------------------------
|X| | | |X|X| | | |X| | | | |X| |.  Kick Drum
---------------------------------
---------------------------------
| | |X| | | | |X| | | |X| | | | |.  Snare
---------------------------------
---------------------------------
|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|.  Hi Hat
---------------------------------

