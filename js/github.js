user_request = new XMLHttpRequest();
user_request.open('GET', "https://api.github.com/repos/audiokit/AudioKit/contributors", true);

user_request.onload = function() {
  if (user_request.status >= 200 && user_request.status < 400) {
    // Success!
    user_data = JSON.parse(user_request.responseText);
    index = 0;
    for (i=0; i<user_data.length; i++) {
        user = user_data[i]
        if (user.contributions > 0) {
            name = user.login
            url = ""

            // Active Contributors
            if (user.login == "aure") {
                name = "Aurelius Prochazka, Ph.D.";
                url = "aure.com";
                description = "Primary programmer of AudioKit. Lives for this stuff. Your life line if you need help.";
            }
            if (user.login == "eljeff") {
                name = "Jeff Cooper";
                url = "turntablearchives.com";
                description = "Rearchitected all things MIDI, sampler, and sequencer related in AudioKit.";
            }
            if (user.login == "swiftcodex") {
                name = "Matthew Fecher";
                url = "matthewfecher.com";
                description = "Sound design, graphic design, and programming of the Analog Synth X example.";
            }
            if (user.login == "megastep") {
                name = "Stéphane Peter";
                url = "catloafsoft.com";
                description = "Installation and configuration czar and code reviewer.";
            }
            if (user.login == "narner") {
                name = "Nick Arner";
                url = "nickarner.com";
                description = "Longtime contributor to AudioKit and AudioKit's web site.";
            }
            if (user.login == "PaulBatchelor") {
                name = "Paul Batchelor";
                url = "paulbatchelor.github.io";
                description = "The author of Soundpipe, and Sporth, which serve as two primary audio engines in AudioKit.";
            }
            if (user.login == "FlexMonkey") {
                name = "Simon Gladman";
                url = "flexmonkey.blogspot.com";
                description = "Longtime user of AudioKit, contributed his AudioKitParticles project to AudioKit.";
            }
            if (user.login == "laurentVeliscek") {
                name = "Laurent Veliscek";
                url = "https://github.com/laurentVeliscek/";
                description = "Master of the AKAudioFile, AKAudioPlayer, and recording nodes.";
            }

            if (user.login == "roecrew") {
                name = "Brandon Barber";
                url = "https://github.com/roecrew/";
                description = "Deep diver.  Contributed a lot of great pull requests.";
            }

            if (url != "") {
                index++;
                document.getElementById('pic'+(index)).innerHTML = '<img style="padding: 1em;" src="'+user.avatar_url+'">';
                document.getElementById('name'+(index)).innerHTML = '<b>'+name+'</b>';
                document.getElementById('desc'+(index)).innerHTML = description;

                document.getElementById('contact'+(index)).innerHTML = '<a href="http://'+url+'">'+url+'</a><br>' + user.contributions + ' Commits';
            }
        }
    }
  }
};

user_request.send();