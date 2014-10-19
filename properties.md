---
section: docs
header: Properties
title: Audio Kit Properties
permalink: /properties/
---

Properties come in two flavors, [AKInstrumentProperty](/Classes/AKInstrumentProperty.html) for instruments and [AKNoteProperty](/Classes/AKNoteProperty.html) for notes. Both kinds of properties can control anything about an instrument, the primary difference is that changing an instrument property will change the sounds of all sounds being created by an instrument whereas adjusting a note property only affects that occurrence of the sound. A good example of the difference might be if you are describing a guitar instrument, an instrument property could be the body resonance or tone control, but the frequency would be a note property since a guitar can play six individual frequencies as six notes for each string.
