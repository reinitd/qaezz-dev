var titleText = document.title;

const previousSongButton = document.getElementById('previous-song');
const playPauseButton = document.getElementById('play-pause');
const nextSongButton = document.getElementById('next-song');

const songCoverImage = document.getElementById('song-cover');
const songNameField = document.getElementById('song-name');
const songArtistField = document.getElementById('song-artist');

const navigationValues = document.getElementsByClassName('fa-angle-right');

var audio;
var songIndex;


const songs = [
    {
        'artist': '6LACK',
        'name': 'Never Know',
        'extension': 'jpg',
        'nameSize': 1.5
    },
    {
        'artist': 'blksmiith',
        'name': 'SR20DET',
        'extension': 'jpg',
        'nameSize': 2
    },
    {
        'artist': 'F L R S H',
        'name': 'ILLUSIONS',
        'extension': 'jpg',
        'nameSize': 2
    },
    {
        'artist': 'piri & tommy',
        'name': 'on & on',
        'extension': 'jpg',
        'nameSize': 2
    },
    {
        'artist': 'Travis Scott',
        'name': 'My Eyes (BPE)',
        'extension': 'png',
        'nameSize': 1.5
    },
    {
        'artist': 'Lul Tys 🕊',
        'name': 'What Love Is',
        'extension': 'png',
        'nameSize': 1.5
    }
];

function musicSeekHandler() {
    nextSongButton.addEventListener('click', function (e) {
        songIndex++;

        if (playPauseButton.classList.contains('fa-play')) {
            playPauseButton.classList.remove('fa-play');
            playPauseButton.classList.add('fa-pause');
        }

        audio.pause()
        if (songIndex < songs.length) {
            playSong(songs[songIndex]);
        } else {
            songIndex = 0;
            playSong(songs[songIndex]);
        }
    });

    previousSongButton.addEventListener('click', function (e) {
        songIndex--;

        if (playPauseButton.classList.contains('fa-play')) {
            playPauseButton.classList.remove('fa-play');
            playPauseButton.classList.add('fa-pause');
        }

        audio.pause();
        if (songIndex < 0) {
            songIndex = songs.length - 1;
            playSong(songs[songIndex]);
        } else if (songIndex < songs.length) {
            playSong(songs[songIndex]);
        } else {
            songIndex = 0;
            playSong(songs[songIndex]);
        }
    });
}

function toggleMusic() {

    if (playPauseButton.classList.contains('fa-play')) {
        playPauseButton.classList.remove('fa-play');
        playPauseButton.classList.add('fa-pause');

        if (playPauseButton.classList.contains('first-run')) {
            playPauseButton.classList.remove('first-run');

            songIndex = 0;
            playSong(songs[songIndex]);
            musicSeekHandler();
        }

        audio.play();

    } else {
        playPauseButton.classList.remove('fa-pause');
        playPauseButton.classList.add('fa-play');

        audio.pause();
    }
}

function playSong(songData) {
    let song = `assets/audio/${songData.name}.mp3`;

    songCoverImage.setAttribute('src', `assets/images/covers/${songData.name}.${songData.extension}`);
    songNameField.textContent = songData.name;
    songArtistField.textContent = songData.artist;

    songNameField.setAttribute('style', `font-size: ${songData.nameSize}em`);

    if (document.getElementById('song-player') !== null) {
        audio.remove();
    }

    audio = new Audio(song);
    audio.id = 'song-player';
    audio.crossOrigin = 'anonymous';
    audio.volume = 0.2;

    console.log(`%cNow Playing: %c${songData.name} %cby %c${songData.artist} %c(Song index: %c${songIndex}%c)`, 'color: green;', 'color: yellow;', 'color: default;', 'color: blue;', 'color: default;', 'color: cyan;', 'color: default;');
    var playPromise = audio.play();

    audio.addEventListener('ended', function (e) {
        songIndex++;
        if (songIndex < songs.length) {
            playSong(songs[songIndex]);
        } else {
            songIndex = 0;
            playSong(songs[songIndex]);
        }
        console.log(`Played Index: ${songIndex}`);
    });
}


function navigationHover(anchor, hovering) {
    const icon = anchor.querySelector("i");

    if (hovering) {
        icon.setAttribute('style', 'transform: rotate(360deg)');

        icon.classList.remove('fa-angle-right');
        icon.classList.add('fa-arrow-right');

        anchor.style.marginLeft = '20px';
    } else {
        icon.setAttribute('style', 'transform: rotate(-360deg)');

        icon.classList.remove('fa-arrow-right');
        icon.classList.add('fa-angle-right');

        anchor.style.marginLeft = '10px';
    }
}

function titleMarquee() {
    titleText =
        titleText.substring(1, titleText.length) + titleText.substring(0, 1);
    document.title = titleText;
    setTimeout("titleMarquee()", 500);
}


window.addEventListener('scroll', () => {
    const opacity = 1 - window.scrollY / (document.body.scrollHeight - window.innerHeight) * 5;

    // limit opacity between 0 and 0.5
    const limitedOpacity = Math.max(0, Math.min(opacity, 0.5));

    document.querySelectorAll('.fa-angle-down').forEach(element => {
        element.style.opacity = limitedOpacity;
    });
});


titleMarquee();
