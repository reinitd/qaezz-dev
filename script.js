console.log("Hello");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function anim_frame(audio_analyser, data_array) {
    console.log("ok");
}

function run() {
    /*
      This was taken from https://ibuprofen.cc
      */
    let song =
        "assets/d2h5IGRpZCB5b3UgdGFrZSB0aGUgdGltZSB0byBkZWNvZGUgdGhpcw==.mp3";

    let audio = new Audio(song);
    audio.volume = 0.2;

    var audio_ctx = new (window.AudioContext || window.webkitAudioContext)();
    var audio_src = audio_ctx.createMediaElementSource(audio);
    var audio_analyser = audio_ctx.createAnalyser();
    var logo = document.getElementById("center-logo");

    audio.play();
    audio_src.connect(audio_analyser);
    audio_src.connect(audio_ctx.destination);
    audio_analyser.fftSize = 2048;

    var buffer_length = audio_analyser.frequencyBinCount;
    var data_array = new Uint8Array(buffer_length);

    audio_analyser.getByteTimeDomainData(data_array);

    document.addEventListener("visibilitychange", async (event) => {
        if (document.visibilityState == "hidden") {
            audio.volume = 0.18;
            await sleep(100);
            audio.volume = 0.16;
            await sleep(100);
            audio.volume = 0.14;
            await sleep(100);
            audio.volume = 0.12;
            await sleep(100);
            audio.volume = 0.1;
            await sleep(100);
            audio.volume = 0.08;
            await sleep(100);
            audio.volume = 0.06;
            await sleep(100);
            audio.volume = 0.04;
            await sleep(100);
            audio.volume = 0.02;
            await sleep(100);
            audio.volume = 0;
            
            audio.pause();
        } else {
            audio.play();

            audio.volume = 0;
            await sleep(100);
            audio.volume = 0.02;
            await sleep(100);
            audio.volume = 0.04;
            await sleep(100);
            audio.volume = 0.06;
            await sleep(100);
            audio.volume = 0.08;
            await sleep(100);
            audio.volume = 0.1;
            await sleep(100);
            audio.volume = 0.12;
            await sleep(100);
            audio.volume = 0.14;
            await sleep(100);
            audio.volume = 0.16;
            await sleep(100);
            audio.volume = 0.18;
            await sleep(100);
            audio.volume = 0.2;
        }
    });

    audio.addEventListener("ended", function (e) {
        audio.play();
    });

    function anim_frame() {
        requestAnimationFrame(anim_frame);
        audio_analyser.getByteFrequencyData(data_array);

        var freq = data_array[3];

        logo.width = freq;
        logo.height = freq;
    }
    anim_frame();
}
