---
title: Audiobus and Inter-App Audio
header: Audiobus and Inter-App Audio
permalink: /audiobus/
layout: section_index_header
---

This document will serve to introduce you to developing inter-app audio applications using AudioKit.

AudioKit aims to make developing audio simple, but for the case of inter-app audio, there's only so much we can build into the framework and you'll have a process to follow rather than just a usage API. Hence this tutorial was created to walk you through the process.

Intro
-----

"Audiobus" and "Inter-App" Audio are two different but similar ways of sharing audio between applications on iOS.  Audiobus was developed by the Amazing Michael Tyson and came first.  Later, Apple invented their own way of doing what Audiobus already did and they called it Inter-App Audio.  Because Audiobus came first, and because we know and love Michael Tyson, we give Audiobus top billing. But, there's no reason you can't get both things working in your app simultaneously, and that's what we'll be doing here.

What you'll build
-----------------

There are basically three different things you can do with inter-app audio: you can generate audio to send to other applications, you can receive audio to process and filter and send back out to other apps, or you can receive audio and do something with that audio without sending it back out.

This tutorial, at least initially, will cover only the first two of these use cases.  We'll build a simple synthesizer application to demonstrate generating audio. Then, we'll build a second application to take an audio stream and a nice sounding reverb to it.  By separating these functions into two apps, you have more flexibility, but it is also very possible to have one app that can both generate and filter audio.

Even if you're not interested in generating audio and only filtering audio, it is recommended that you follow the tutorial from start to finish as concepts will only be introduced once.  You'll learn the most by following along and building the applications on your machine, but the finished versions will also be included in AudioKit's Examples folder.

This tutorial will stand on its own, but content for it has been shamelessly lifted from other sources, notably the Audiobus tutorials, and we'll provide links at the end so you can dive in deeper if you need to.

Starting the Synth Project
--------------------------

We're going to build this from scratch, so in order to not spend much time with UI issues, we are going to make use of AudioKit's built-in UI elements that are normally used in playgrounds and our example apps.

From within Xcode, create a new project with the single view application template.  Give it a product name of "SenderSynth" (no spaces) and make it a Universal Swift application as shown below:

(Image)

Since Audiobus is most easily installed uing Cocoapods, we could use Cocoapods to install AudioKit, and eventually this tutorial will be updated as such, but for now, add AudioKit's iOS project from the develop branch as a subproject.

Set Up the Synth (easy!)
------------------------

Inside the ViewController.swift, first import AudioKit:

import AudioKit

Create the oscillator by adding it as an instance variable,

{% highlight ruby %}
class ViewController: UIViewController {

    let oscillator = AKOscillatorBank()
{% endhighlight %}

and then use oscillator as AudioKit's output and start things up:

{% highlight ruby %}
    override func viewDidLoad() {
        super.viewDidLoad()

        AudioKit.output = oscillator
        AudioKit.start()
    }
{% endhighlight %}

User Interface
--------------

This tutorial will not use storyboards because they require too much mouse activity to describe, so instead we'll build the UI programmatically.

Next, build the views:

{% highlight ruby %}
    override func viewDidLoad() {
        super.viewDidLoad()

        AudioKit.output = oscillator
        AudioKit.start()

        setupUI()
    }

    func setupUI() {
        let stackView = UIStackView()
        stackView.axis = .vertical
        stackView.distribution = .fillEqually
        stackView.alignment = .fill
        stackView.translatesAutoresizingMaskIntoConstraints = false

        let adsrView = AKADSRView()
        stackView.addArrangedSubview(adsrView)
        let keyboardView = AKKeyboardView()
        stackView.addArrangedSubview(keyboardView)

        view.addSubview(stackView)

        stackView.widthAnchor.constraint(equalToConstant: view.frame.width).isActive = true
        stackView.heightAnchor.constraint(equalToConstant: view.frame.height).isActive = true

        stackView.centerXAnchor.constraint(equalTo: self.view.centerXAnchor).isActive = true
        stackView.centerYAnchor.constraint(equalTo: self.view.centerYAnchor).isActive = true
    }
{% endhighlight %}

While this may seem like a lot of code, its a lot more reliable than describing how to do this with storyboards.

The last step is to hook up controls.  For the keyboard, make the view controller conform to the AKKeyboardDelegate protocol:

{% highlight ruby %}
class ViewController: UIViewController, AKKeyboardDelegate {
{% endhighlight %}
and add these functions:

{% highlight ruby %}
    func noteOn(note: MIDINoteNumber) {
        oscillator.play(noteNumber: note, velocity: 80)
    }

    func noteOff(note: MIDINoteNumber) {
        oscillator.stop(noteNumber: note)
    }
{% endhighlight %}

If you run your app now, it will respond to the keys, but the ADSR envelope won't do anything.  Replace the ADSR creation step with this one defining a code block:

{% highlight ruby %}
        let adsrView = AKADSRView() { att, dec, sus, rel in
            self.oscillator.attackDuration = att
            self.oscillator.decayDuration = dec
            self.oscillator.sustainLevel = sus
            self.oscillator.releaseDuration = rel
        }
{% endhighlight %}

Now you're really done with all the AudioKit stuff.  From here, it's all inter-app audio.

Installing Audiobus
-------------------

You will need Cocoapods to do this step.  Close the project you created and open up a terminal and go to the projects folder and type:

> pod init

Add a pod 'Audiobus' line to the Podfile that was just created in this folder:

{% highlight ruby %}
    # Uncomment the next line to define a global platform for your project
    # platform :ios, '9.0'

    target 'SenderSynth' do
      # Comment the next line if you're not using Swift and don't want to use dynamic frameworks
      use_frameworks!

      # Pods for SenderSynth
      pod 'Audiobus'
    end
{% endhighlight %}

Back on the commandline,
{% highlight ruby %}
> pod install
{% endhighlight %}

This should work as follows:

{% highlight ruby %}
    Analyzing dependencies
    Downloading dependencies
    Installing Audiobus (2.3.1)
    Generating Pods project
    Integrating client project
{% endhighlight %}

It may also produce some warning messages which can be ignored for now.  There are alternative installation instructions on the Audiobus integration page if you do not want to use Cocoapods.

From now on, we will be working with the SenderSynth.xcworkspace file instead of the project file, so open that in Xcode now.

Add the Audiobus Files
----------------------

Since Audiobus is not a Swift framework, we need to import the Audiobus header into a bridging header.  There are a few ways to create a bridging header, but the way I recommend is to go to your app's target Build Settings tab and search for "Bridging".  All of the settings will be filtered and you'll be left with one remaining "Objective-C Bridging Header" setting in which you can paste "$(SRCROOT)/SenderSynth/SenderSynth-BridgingHeader.h" so that it looks like the following screenshot.

Image

Then create a new file, of type "Header File", name it "SenderSynth-BridgingHeader.h" and add the import line so that it looks like:

{% highlight ruby %}
#ifndef SenderSynth_BridgingHeader_h
#define SenderSynth_BridgingHeader_h

#import "Audiobus.h"

#endif /* SenderSynth_BridgingHeader_h */
{% endhighlight %}

Next grab the Audiobus.swift file from our repository and place it in your project, creating a copy.

Back in your ViewController.swift file:

{% highlight ruby %}
        AudioKit.output = oscillator
        AudioKit.start()
        Audiobus.start()
{% endhighlight %}

Project Settings
----------------

You need to enable background audio and inter-app audio.  Follow these steps to do so:

1. Open your app target screen within Xcode by selecting your project entry at the top of Xcode's Project Navigator, and selecting your app from under the "TARGETS" heading.

2. Select the "Capabilities" tab.

3. Underneath the "Background Modes" section, make sure you have "Audio, AirPlay, and Picture in Picture" ticked.

4. To the right of the "Inter-App Audio" title, turn the switch to the "ON" position – this will cause Xcode to update your App ID with Apple's "Certificates, Identifiers & Profiles" portal, and create or update an Entitlements file.

Next, set up a launch URL:

1. Open your app target screen within Xcode by selecting your project entry at the top of Xcode's Project Navigator, and selecting your app from under the "TARGETS" heading.

2. Select the "Info" tab.

3. Open the "URL types" group at the bottom.

4. Click the "Add" button at the bottom left. Then enter this identifier for the URL: io.audiokit.sendersynth

5. Enter the new Audiobus URL scheme for your app, generally the name of the app, a dash, and then a version number: "SenderSynth-1.0.audiobus".

Of course when you do all this for a new app, you'll need to have your new app's name in these fields.

Here is one step that is not documented on the Audiobus web site:

1. Give your app a bundle name.  In the Info tab, you might see grayed out default text in the Identity section's display name field.  Go ahead and type or re-type the app's name.  Here I just added a space to call the app "Sender Synth".

More Project Settings (for Sender apps)
--------------------------------------

Create your sender port by following these steps:

1. Open your app target screen within Xcode by selecting your project entry at the top of Xcode's Project Navigator, and selecting your app from under the "TARGETS" heading.

2. Select the "Info" tab.

3. If you don't already have an "AudioComponents" group, then under the "Custom iOS Target Properties" group, right-click and select "Add Row", then name it "AudioComponents". Set the type to "Array" in the second column.

4. Open up the "AudioComponents" group by clicking on the disclosure triangle, then right-click on "AudioComponents" and select "Add Row". Set the type of the row in the second column to "Dictionary". Now make sure the new row is selected, and open up the new group using its disclosure triangle.

5. Create five different new rows, by pressing Enter to create a new row and editing its properties:

6. "manufacturer" (of type String): set this to "AuKt" which stands for AudioKit.

7. "type" (of type String): set this to "auri", which means a "Remote Instrument" unit.

8. "subtype" (of type String): set this to "akri", which is just AudioKit's version of "Remote Instrument"

9. "name" (of type String): set this to "AudioKit: Sender"

10. "version" (of type Number): set this to an integer. "1" is a good place to start.

In the end your Info.plist should now have the following:

Image


Audiobus and Registration
-------------------------

Perhaps it goes without saying, but you need to have the Audiobus application installed on your device.  Next, you'll need create a user at develop.audiob.us.  Next, back in Xcode, build the SenderSynth project and right click on the app in the Products directory, and "Show in Finder".  In the Finder, right click on the app and "Show Package Contents".  Using a web browser, go to the Audiobus [Temporary Registration](https://developer.audiob.us/temporary-registration) and drag the Info.plist file from this directory into the web page.

Complete the temporary registration by choosing the SDK version you're using, adding an icon to the sender port, and adding a title as shown:

Image

You will be given an API Key that will be good for 14 days.  Copy the text of the key and create a new document of type "Other / Empty" and call it "Audiobus.txt".  Paste the API Key in that file.

You should also click the "email this to me" link on the Audiobus registration page so that you can open up the email on your device and tap the link to add an entry to your local Audiobus app for the Sender Synth.

Build the app to your device
----------------------------

This is pretty straightforward, but you do need to make sure to give your app app icons.

Image and link to icons


Filtering App
=============

The process for creating the filter is very similar, but even so, its worth going through the process a second time to really solidify your understanding. It will be described here in slightly less detail.

The project will just create a few sliders for some standard AudioKit effects.

Create a single view application called Filter Effects

Image

Set up the effects
------------------

The AudioKit code here is a little bit longer than for the synth, mainly so we can offer quite a few effects:

{% highlight ruby %}
    import UIKit
    import AudioKit

    class ViewController: UIViewController {

        var filter: AKMoogLadder?
        var delay: AKVariableDelay?
        var delayMixer: AKDryWetMixer?
        var reverb: AKCostelloReverb?
        var reverbMixer: AKDryWetMixer?
        var booster: AKBooster?

        override func viewDidLoad() {
            super.viewDidLoad()

            filter = AKMoogLadder(AKMicrophone())

            delay = AKVariableDelay(filter!)
            delay?.rampTime = 0.5 // Allows for some cool effects
            delayMixer = AKDryWetMixer(filter!, delay!)

            reverb = AKCostelloReverb(delayMixer!)
            reverbMixer = AKDryWetMixer(delayMixer!, reverb!)

            booster = AKBooster(reverbMixer!)

            AudioKit.output = booster
            AudioKit.start()
        }
    }
{% endhighlight %}

It's worth stating that this code will not run in the simulator because it requires an audio input device, which the simulator is not currently able to emulate.  I can't imagine that this won't ever be fixed by Apple, but for now, let's move on.

Set up the User Interface
-------------------------

...

While this may not be the case once the app is used within Audiobus, to run the app before we integrate Audiobus, add the following to the Info.plist: "Privacy - Microphone Usage Description" for which the string can be blank.

Add this UI Set up code to create the UI:

{% highlight ruby %}
    override func viewDidLoad() {
        // All the code from before plus the next line:
        setupUI()
    }

    func setupUI() {
        let stackView = UIStackView()
        stackView.axis = .vertical
        stackView.distribution = .fillEqually
        stackView.alignment = .fill
        stackView.translatesAutoresizingMaskIntoConstraints = false

        stackView.addArrangedSubview(AKPropertySlider(
            property: "Cutoff Frequency",
            format: "%0.1f Hz",
            value: self.filter!.cutoffFrequency, minimum: 1, maximum: 2000,
            color: UIColor.orange) { sliderValue in
                self.filter?.cutoffFrequency = sliderValue
        })

        stackView.addArrangedSubview(AKPropertySlider(
            property: "Resonance",
            format: "%0.2f",
            value: self.filter!.resonance, minimum: 0, maximum: 0.99,
            color: UIColor.orange) { sliderValue in
                self.filter?.resonance = sliderValue
        })

        stackView.addArrangedSubview(AKPropertySlider(
            property: "Delay Time",
            format: "%0.2f s",
            value: self.delay!.time, minimum: 0, maximum: 1,
            color: UIColor.green) { sliderValue in
                self.delay?.time = sliderValue
        })

        stackView.addArrangedSubview(AKPropertySlider(
            property: "Delay Feedback",
            format: "%0.2f",
            value: self.delay!.feedback, minimum: 0, maximum: 0.99,
            color: UIColor.green) { sliderValue in
                self.delay?.feedback = sliderValue
        })

        stackView.addArrangedSubview(AKPropertySlider(
            property: "Delay Mix",
            format: "%0.2f",
            value: self.delayMixer!.balance, minimum: 0, maximum: 1,
            color: UIColor.green) { sliderValue in
                self.delayMixer?.balance = sliderValue
        })

        stackView.addArrangedSubview(AKPropertySlider(
            property: "Reverb Feedback",
            format: "%0.2f",
            value: self.reverb!.feedback, minimum: 0, maximum: 0.99,
            color: UIColor.red) { sliderValue in
                self.reverb?.feedback = sliderValue
        })

        stackView.addArrangedSubview(AKPropertySlider(
            property: "Reverb Mix",
            format: "%0.2f",
            value: self.reverbMixer!.balance, minimum: 0, maximum: 1,
            color: UIColor.red) { sliderValue in
                self.reverbMixer?.balance = sliderValue
        })

        stackView.addArrangedSubview(AKPropertySlider(
            property: "Output Volume",
            format: "%0.2f",
            value: self.booster!.gain, minimum: 0, maximum: 2,
            color: UIColor.yellow) { sliderValue in
                self.booster?.gain = sliderValue
        })

        view.addSubview(stackView)

        stackView.widthAnchor.constraint(equalToConstant: view.frame.width).isActive = true
        stackView.heightAnchor.constraint(equalToConstant: view.frame.height).isActive = true

        stackView.centerXAnchor.constraint(equalTo: self.view.centerXAnchor).isActive = true
        stackView.centerYAnchor.constraint(equalTo: self.view.centerYAnchor).isActive = true
    }
{% endhighlight %}
This should all work on your device at this point.  And now, we just need to do the configuration song and dance. :)

Install Audiobus
----------------
This is the same process as it was for the Sender Synth, except of course, for the name of the app.

Add the Audiobus Files
----------------------
This is the same as for a sender app, except you will want to name the bridging header according to the new app name: "FilterEffects-BridgingHeader.h"

Project Settings
----------------

This is also the same as the Project Settings section above.  For the URLs use: io.audiokit.filtereffects and for the URL scheme use: "FilterEffects-1.0.audiobus".

Once that's done here are the steps for the filter port:

1. Open your app target screen within Xcode by selecting your project entry at the top of Xcode's Project Navigator, and selecting your app from under the "TARGETS" heading.

2. Select the "Info" tab.

3. If you don't already have an "AudioComponents" group, then under the "Custom iOS Target Properties" group, right-click and select "Add Row", then name it "AudioComponents". Set the type to "Array" in the second column.

4. Open up the "AudioComponents" group by clicking on the disclosure triangle, then right-click on "AudioComponents" and select "Add Row". Set the type of the row in the second column to "Dictionary". Now make sure the new row is selected, and open up the new group using its disclosure triangle.

5. Create five different new rows, by pressing Enter to create a new row and editing its properties:

6. "manufacturer" (of type String): set this to "AuKt" which stands for AudioKit.

7. "type" (of type String): set this to "aurm", which means a "Remote Music effect" unit.

8. "subtype" (of type String): set this to "akrim, which is just AudioKit's version of "Remote Instrument"

9. "name" (of type String): set this to "AudioKit: Filter"

10. "version" (of type Number): set this to an integer. "1" is a good place to start.

In the end your Info.plist should now have the following:

Image




Links
=====
[Audiobus Integration Guide](https://developer.audiob.us/doc/_integration-_guide.html)