import MusicPlayer from '../../Features/musicplayer/musicplayer.js';
export {
    linkControlBarToMusicPlayer,
}






const linkControlBarToMusicPlayer = (musicPlayer) => {
    if(musicPlayer === undefined || musicPlayer === null) {
        musicPlayer = MusicPlayer.getInstance();
    }
    const playButton = document.getElementById('control-play-button');
    console.log('[linkControlBarToMusicPlayer] playButton: ', playButton);
    const nextButton = document.getElementById('control-next-button');
    const previousButton = document.getElementById('control-previous-button');
    const musicSlider = document.getElementById('music-slider');
    const volumeSlider = document.getElementById('volume-slider');

    musicPlayer.progressBar = musicSlider;

    musicSlider.addEventListener('onchange', () => {
        musicPlayer.setCurrentTime(musicSlider.value);
    });

    // musicSlider.addEventListener('input', () => {  
        // musicPlayer.audio.pause()
        // musicPlayer.audio.currentTime = musicSlider.value;  
    //   });  
    volumeSlider.addEventListener('input', () => {
        console.log('Volume: ', volumeSlider.value / 100);
        musicPlayer.audio.volume = volumeSlider.value / 100;
    });

    playButton.addEventListener('click', () => {
        if (musicPlayer.isPlaying) {
            musicPlayer.pause();
        } else {
            musicPlayer.play();
        }
    });

    nextButton.addEventListener('click', () => {
        musicPlayer.next();
    });

    previousButton.addEventListener('click', () => {
        musicPlayer.previous();
    });
}

const onStart = () => {

}