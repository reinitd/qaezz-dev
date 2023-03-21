console.log("Hello");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function anim_frame(audio_analyser, data_array) {
    console.log("ok");
}

/*
function playSong() {

    audio.crossOrigin = "anonymous";

    audio.volume = 0.2;

    audio.play();

    audio.addEventListener("ended", function (e) {
        playSong();
    });
}
*/

function run() {
    /*
    This was taken from https://ibuprofen.cc
    */
    let song = "assets/d2h5IGRpZCB5b3UgdGFrZSB0aGUgdGltZSB0byBkZWNvZGUgdGhpcw==.mp3";

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
