---
title: Nodes
header: Nodes
permalink: /nodes/
layout: section_index_header
---
<h1 class="center">The Basics</h1>
A node is simply an object that will take in audio input(s), process the input, and pass the processed audio to another node, or to the Digital-Analog Converter (speaker). Here the basic classes and protocols that are the building blocks for all of the AudioKit nodes. 

#### AKNode
Is the parent class for all AudioKit nodes. Inherits from the abstract class, AVAudioNode.

#### AKPolyphonic
This protocol allows AudioKit to play and stop MIDI notes.

<img src="/Common/Nodes/midi-notes.GIF" alt="">

#### AKPolyphonicNode
Creates a useable, bare bones implementation of AKPolyphonic protocol

#### AKToggleable
Protocol that allows a node to be in a started or stopped state.

#### AKOperationGenerator
Operation-based generator

<h1 class="center">Explore Nodes</h1>
## [Analysis Nodes](/nodes/anaylsis)

## [Effect Nodes](/nodes/effects)

## [Generator Nodes](/nodes/generators)

## [Input Nodes](/nodes/inputs)

## [Mixing Nodes](/nodes/mixing)

## [Playback Nodes](/nodes/playback)









