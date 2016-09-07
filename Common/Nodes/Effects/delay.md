---
title: Delay Nodes
header: Delay Nodes
permalink: /nodes/effects/delay
layout: effect_nodes
---

### AKDelay

AudioKit's version of Apple's delay. 

#### 5 inputs

input: Input audio AKNode to process
time: Delay time in seconds, ranges from 0 to 2 (Default: 1)
feedback: Amount of feedback (Normalized Value) ranges from 0 to 1 (Default: 0.5)
lowPassCutoff: Low-pass cutoff frequency in Hz (Default 15000)
dryWetMix: Amount of unprocessed (dry) to delayed (wet) audio (Normalized Value) ranges from 0 to 1 (Default: 0.5)


### AKVariableDelay