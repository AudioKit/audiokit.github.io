---
title: Playback Nodes
header: Playback Nodes
permalink: /nodes/playback
layout: nodes
---

## Player

AudioKit's Audio Player provides more funcationality to the basic AVAudioPlayer.
1. Create a completion callback function to show if the player is up and running. (Makes debugging easier)
2. Create a constant that contains an audio file
3. Initialize the player with file and the callback function
{% highlight ruby %}
  func myCompletionCallBack() {
      print ("completion callBack has been triggered !")
  }
{% endhighlight %}
{% highlight ruby %}
  let guitarLoop = try? AKAudioFile(readFileName: "guitarloop.wav", baseDir: .Resources)
{% endhighlight %}
{% highlight ruby %}
let player = try? AKAudioPlayer(file: guitarLoop!, completionHandler: myCompletionCallBack)
{% endhighlight %}





{% highlight ruby %}
{% endhighlight %}
## Sampler

## Time Pitch Stretching

## Phase-locked Vocoder

<h1 class="center">See Them in Action</h1>

[Audio Player Playground](/playgrounds/Playback/Audio%20Player/)