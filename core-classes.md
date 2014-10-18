---
layout: page
title: Core Classes
permalink: /core-classes/
---

The core classes are contained in the `AudioKit/Core Classes` folder and include:

* AKFoundation: This header file contains all the includes you might need for any AudioKit file
* [AKManager](/docs/Classes/AKManager.html): The manager controls all the interaction with the base audio generation system, Csound.
* [AKOrchestra](/docs/Classes/AKOrchestra.html): This is the set of instruments available to play.
* [AKInstrument](/docs/Classes/AKInstrument.html): This is one sound generator or processor which has its own controllable pproperties.
* [AKNote](/docs/Classes/AKNote.html): This is an instance of a instrument sound that may have separate properties to the instrument (for instance a guitar note has its own frequency from other simultaneous guitar notes).
* [AKMidi](/docs/Classes/AKMidi.html)

We also include here the time-classes:

* [AKEvent](/docs/Classes/AKEvent.html): An event that can be created and triggered at any time.
* [AKSequence](/docs/Classes/AKSequence.html): A series of events.

[Parameters](/parameters/) and [Properties](/properties/) are also core classes although they appear in their own directories.
