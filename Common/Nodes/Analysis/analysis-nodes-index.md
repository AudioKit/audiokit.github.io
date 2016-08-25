---
title: Analysis Nodes
header: Analysis Nodes
permalink: /nodes/anaylsis
layout: nodes
---

## AKAmplitude Tracker

Performs a "root-mean-square" on a signal to get overall amplitude of a signal. The output signal looks similar to that of a classic VU meter.

**RMS (Root-Mean-Square):** A value that is the effective value of the total waveform.  It is really the area under the curve. In audio it is the continuous or music power that the amplifier can deliver.

<div class="row">
  <div class="col-sm-6">
    <strong>VU:</strong> a device displaying a representation of the signal level in audio equipment
  </div>
  
  <div class="col-sm-6">
    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/VU_Meter.jpg" alt="VU Meter">
  </div>
</div>
<br>

## AKFrequency Tracker

This is based on an algorithm originally created by Miller Puckette.
[Original Here](http://academics.wellesley.edu/Physics/brown/pubs/effalgV92P2698-P2701.pdf){:target="_blank"}

Parameters:
* input (input node to process)
* hopSize: Hop Size
* peakCount: Number of Peaks

<h1 class="center">See Them in Action</h1>
[Tracking Amplitude Playground](/playgrounds/Tracking%20Amplitude/)

[Tracking Frequency Playground](/playgrounds/Tracking%20Frequency/)

[Tracking Frequency of an Audiofile Playground](/playgrounds/Tracking%20Amplitude/)

[FFT Analysis Playground](/playgrounds/Tracking%20Amplitude/)


