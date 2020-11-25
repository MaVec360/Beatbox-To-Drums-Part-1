# Beatbox-To-Drums-Part-1

I have been able to get the recording element to work, as well as display the FTT into 5 different buckets.
I also have a couple of drum samples include in the file, the kick drum, hi hat, and snare drum. 
My next goal is to have a sample play when the amplitude of one of the frequency buckets hits a certain limit. 

I can do some more analysis of the sample frequencies, but I know the kick has around 100-200 Hz, snare is 250-400, hi hat is >400. 
So when the user is beatboxing, and doing a kick drum sound, it should spike in the 100-200 Hz range, at which point I would want to trigger the kick drum sample to be played.

I have some code for a polymetric sampler, which maybe able to be used, but I can't conceptualize it yet... 

I think in the initial set up, the user would select a BPM (Beats Per Minute), and possibly a metronome. From there, they would beatbox, and the samples would be recordered on the sampler. 

So this is where it all gets very tricky, but please let me know if you have any ideas! Thanks!
