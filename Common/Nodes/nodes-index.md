---
title: Nodes
header: Nodes
permalink: /nodes/
layout: section_index_header
---

# The Basics
A node is simply an object that will take in audio input(s), process the input, and pass the processed audio to another node, or to the Digital-Analog Converter (speaker)

#### AKNode
Is the parent class for all other AudioKit nodes. Inherits from the abstract class, AVAudioNode.

#### AKPolyphonic
Protocol for responding to play and stop of MIDI notes

##### AKPolyphonicNode
Bare bones implementation of AKPolyphonic protocol

#### AKToggleable
Protocol for dictating that a node can be in a started or stopped state. It's extension allows nodes that conform to AKToggleable to use the following:

Variables 
  * isPlaying
  * isStopped
  * isBypassed

Functions 
  * play
  * bypass

#### AKOperationGenerator
Operation-based generator

# Putting Nodes to Work
## [Analysis Nodes](/nodes/anaylsis)

## [Effect Nodes](/nodes/effects)

## [Generator Nodes](/nodes/generators)

## [Input Nodes](/nodes/inputs)

## [Mixing Nodes](/nodes/mixing)

## [Playback Nodes](/nodes/playback)









