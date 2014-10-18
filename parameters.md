---
layout: page
title: Parameters
permalink: /parameters/
---

Parameters are arguments to [Operations](/operations/).  They come in three varieties for audio rate, control rate, and constant values. When something is declared as an [AKParameter](/docs/Classes/AKParameter.html), it is at audio rate.  [AKControl](/docs/Classes/AKControl.html) and [AKConstant](/docs/Classes/AKConstant.html) should be used for slower rate variables.

[AKAudio](/docs/Classes/AKAudio.html) is a parameter usually designated as an audible signal.  [AKStereoAudio](/docs/Classes/AKStereoAudio.html) is a left and right pair of [AKAudio](/docs/Classes/AKAudio.html) signals.

An [AKArray](/docs/Classes/AKArray.html) is used for an arbitrarily long array of AKParameters.

[F-Tables](/f-tables/) are also parameters.
