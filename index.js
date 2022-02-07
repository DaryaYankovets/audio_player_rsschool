window.addEventListener('DOMContentLoaded', () => {
    const myAudio = new Audio();
    const audioPlayer = document.querySelector('.audio-player');
    let isPlay = false;
    let numPlayTrack = 0;
    let currentTimePlay = 0;
    let lastValueVolume = 0;
    const listTracks = [
        'EMBRZ - Breathe',
        'Brennan Savage, Fish Narc - Hide My Face',
        'Mani Beats - N&N',
        'Masked Wolf - Astronaut In The Ocean',
        'The Weeknd - Call Out My Name',
    ];
    

    const containerListTracks = document.querySelector('.list-tracks');
    listTracks.forEach(elem => {
        const track = document.createElement('div');
        track.textContent = elem;
        track.dataset.track = elem;
        track.className = 'item-track'
        containerListTracks.append(track);
    });

    const playAudio = () => {
        myAudio.src = `./assets/audio/${listTracks[numPlayTrack]}.mp3` ;
        myAudio.currentTime = currentTimePlay;
        myAudio.play();
    }

    const pauseAudio = () => {
        myAudio.pause();
    }

    const toggleBtnPlayPause = () => {
        document.querySelector('.play-audio').classList.toggle('pause-audio');
    }

    const toggleBtnVolume = () => {
        myAudio.muted = !myAudio.muted;
        audioPlayer.querySelector(".volume-btn").classList.toggle('volume-mute');
    }

    const playPreviousTrack = () => {
        numPlayTrack--; 
        if (numPlayTrack < 0) {
            numPlayTrack = listTracks.length - 1;
        }
        setActiveTrack(document.querySelector(`[data-track="${listTracks[numPlayTrack]}"]`));

        if (isPlay === false) {
            isPlay = true;
            toggleBtnPlayPause();
        }
        changeBgImage(listTracks[numPlayTrack]);
    }

    const playNextTrack = () => {
        numPlayTrack++; 
        if (numPlayTrack > listTracks.length - 1) {
            numPlayTrack = 0
        }
        setActiveTrack(document.querySelector(`[data-track="${listTracks[numPlayTrack]}"]`));

        if (isPlay === false) {
            isPlay = true;
            toggleBtnPlayPause();
        }
        changeBgImage(listTracks[numPlayTrack]);
    }

    const getCurrentTime = (num) => {
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;

        if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(
            seconds % 60
        ).padStart(2, 0)}`;
    }

    const changeBgImage = (track) => {
        document.querySelector('.container').style.backgroundImage = `url('./assets/img/${track}.jpeg')`;
        document.querySelector('.bg-audio').style.backgroundImage = `url('./assets/img/${track}.jpeg')`;
    }

    const setActiveTrack = (elem) => {
        document.querySelectorAll('.item-track').forEach(elem => elem.classList.remove('active-item-track'));
        elem.classList.add('active-item-track');
    }

    setInterval(() => {
        audioPlayer.querySelector(".duration-audio .current").textContent = getCurrentTime(myAudio.currentTime);
        document.querySelector('.progress-bar').style.flexBasis = `${(myAudio.currentTime / myAudio.duration) * 100}%`;
        if (myAudio.duration == myAudio.currentTime ) {
            playNextTrack();
            playAudio();
        }
    }, 500);

    audioPlayer.addEventListener('click', (event) => {
        if (event.target.classList.contains('play-audio')) {
            if (!isPlay) {
                playAudio();
                isPlay = true;
                setActiveTrack(document.querySelector(`[data-track="EMBRZ - Breathe"]`));
            } else if (isPlay) {
                pauseAudio();
                currentTimePlay = myAudio.currentTime;
                isPlay = false;
            }
            toggleBtnPlayPause();

        } else if (event.target.classList.contains('previous-audio')) {
            playPreviousTrack();
            playAudio();

        } else if (event.target.classList.contains('next-audio')) {
            playNextTrack();
            playAudio();

        } else if (event.target.classList.contains('progress-bar-block')) {
            /* const progressBarWidth = window.getComputedStyle(event.target).width;
            const timeToSeek = event.offsetX / parseInt(progressBarWidth) * myAudio.duration;
            myAudio.currentTime = timeToSeek; */
            

        } else if (event.target.classList.contains('item-track')) {
            numPlayTrack = listTracks.findIndex(elem => elem === event.target.dataset.track);  
            playAudio();
            isPlay = true;
            document.querySelector('.play-audio').classList.add('pause-audio');

            setActiveTrack(event.target);
            changeBgImage(listTracks[numPlayTrack]);
            currentTimePlay = 0; 

        } else if (event.target.classList.contains('volume-btn')) {
            toggleBtnVolume();
        }
    });

    myAudio.addEventListener('loadeddata', () => {
        audioPlayer.querySelector(".duration-audio .length").textContent = getCurrentTime(myAudio.duration);
        myAudio.volume = 0.5;
    });

    audioPlayer.querySelector(".volume-bar").addEventListener('click', event => {
        const sliderWidth = window.getComputedStyle(audioPlayer.querySelector(".volume-bar")).width;
        const newVolume = event.offsetX / parseInt(sliderWidth);
        myAudio.volume = newVolume;
        audioPlayer.querySelector(".volume-bar-value").style.flexBasis = newVolume * 100 + '%';
    }); 

    audioPlayer.querySelector(".progress-bar-block").addEventListener('click', event => {
        const progressBarWidth = window.getComputedStyle(audioPlayer.querySelector(".progress-bar-block")).width;
        const timeToSeek = event.offsetX / parseInt(progressBarWidth) * myAudio.duration;
        myAudio.currentTime = timeToSeek;
    });
    

});