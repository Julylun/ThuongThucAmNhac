import * as UserService from '../service/userService/userServices.js'
import * as ControlBarComponent from '../../Components/controlbar/controlbar.js'
import SongPlayer from '../../Features/musicplayer/songplayer.class.js';
import ResourceService from '../service/resourceService/resourceService.js';

export {
    linkControlBarToMusicPlayer,
    updateControlBarInformation,
    playSong,
    nextSong,
    onEndSong,
}

let controlBarCurrentTimeCounter = document.getElementById('music-slide__duration-current-time');
let controlBarSongImage = undefined;
let controlBarSongImageDeg = 0;
let intervalId = undefined;
const songPlayer = SongPlayer.getSongPlayer()

const rotateImage = (imageElement, rotateAngle) => {
    imageElement.setAttribute("style", "transform: rotate(" + rotateAngle + "deg)");
}

const setSliderLimit = (duration) => {
    let musicSlider = document.getElementById('music-slider');

    console.log(duration)
    musicSlider.setAttribute('min', '0');
    musicSlider.setAttribute('max', duration + '');
}

/**
 *  Just distplay current song information to control bar
 */
const updateControlBarInformation = async () => {
    try {
        let currentSong = songPlayer.getCurrentSong();
        console.log(currentSong)
        let songArtistInformation = await UserService.findUser(currentSong.songArtist.artistId);

        ControlBarComponent.updateControlBarInformation(
            currentSong.songName,
            ResourceService.DefaultImagePath + currentSong.songImage,
            songArtistInformation.personName,
            currentSong.songDuration
        )

        setSliderLimit(currentSong.songDuration)

    } catch (error) {
        console.error('Some errors occured while updating information to the control bar.');
        console.error(error);
    }
}



/**
 *  Change current the song to the next song in the queue and play it
 */
const nextSong = () => {
    if (songPlayer.nextSongIndex()) {
        playSong();
    }
}


/**
 * Change the current song to the previous song in the queue and play it
 */
const previousSong = () => {
    if (songPlayer.previousSongIndex()) {
        playSong()
    }
}


/**
 * Pause the current song.
 */
const pauseSong = () => {
    songPlayer.pauseSong()
}


/**
 * Continue the paused song (also play song)
 */
const continueSong = () => {
    songPlayer.playSong();
}

let currentTime;

/**
 * Play song but loading before playing
 */
const playSong = () => {
    controlBarSongImage = document.getElementById('control-song-image');

    if (intervalId) clearInterval(intervalId);

    const setDefaultControlBar = () => {
        currentTime = 0;
        ControlBarComponent.updateSliderBarValue(0)
        ControlBarComponent.updateSliderCountingTime(0);
        ControlBarComponent.setSliderValue(0)
        rotateImage(controlBarSongImage, 0);
    }

    setDefaultControlBar();
    songPlayer.stop();
    songPlayer.unloadSong();
    songPlayer.loadSong()
    songPlayer.playSong();
    intervalId = setInterval(() => {
        if (songPlayer.getStatus() == SongPlayer.STATUS_PLAYING) {
            currentTime = songPlayer.getCurrentTime();
            ControlBarComponent.updateSliderBarValue(currentTime)
            ControlBarComponent.updateSliderCountingTime(currentTime);
            // rotateImage(controlBarSongImageDeg);
            controlBarSongImageDeg += 5;
            rotateImage(controlBarSongImage, controlBarSongImageDeg);
        }
    }, 1000)

    ControlBarComponent.updateControlBarButtonColor();
}

const onEndSong = () => {
    if (songPlayer.looping()) playSong();
    else {
        nextSong()
    }
}

const seekAudio = (targetDuration) => {
    if (!controlBarSongImage) controlBarSongImage = document.getElementById('control-song-image');

    songPlayer.setCurrentTime(targetDuration);
    // rotateImage(controlBarSongImage, targetDuration * 5)
    currentTime = songPlayer.getCurrentTime();
}






/**
 * Set volume for the music player
 * @param {*} volume 
 */
const setVolume = (volume) => {
    songPlayer.setVolume(volume)
}


/**
* function to play the music player when click on the play button
*/
const handlePlaySongButton = () => {
    switch (songPlayer.getStatus()) {
        case SongPlayer.STATUS_STOPPED: {
            playSong();
            break;
        }
        case SongPlayer.STATUS_PAUSED: {
            continueSong();
            break;
        }
        case SongPlayer.STATUS_PLAYING: {
            pauseSong();
            break;
        }
    }

    ControlBarComponent.updateControlBarButtonColor();
}

const handleSufferButton = () => {
    songPlayer.setSuffering(!songPlayer.suffering());
    ControlBarComponent.updateControlBarButtonColor();
}

const handleLoopButton = () => {
    songPlayer.setLooping(!songPlayer.looping());
    console.log(songPlayer.looping())
    ControlBarComponent.updateControlBarButtonColor();
}


/**
 * Assign event to control bar button to listen user action
 */
const linkControlBarToMusicPlayer = async () => {
    const playButton = document.getElementById('control-play-button');
    const nextButton = document.getElementById('control-next-button');
    const previousButton = document.getElementById('control-previous-button');
    const musicSlider = document.getElementById('music-slider');
    const volumeSlider = document.getElementById('volume-slider');
    const sufferButton = document.getElementById('control-bar__suffer-button');
    const muteButton = document.getElementById('control-bar__mute-button');
    const loopButton = document.getElementById('control-bar__loop-button');
    const lyricButton = document.getElementById('control-bar__lyric-button');

    //Handle control button
    nextButton.addEventListener('click', nextSong);
    previousButton.addEventListener('click', previousSong);
    playButton.addEventListener('click', handlePlaySongButton);


    //handle time slider/volume slider
    volumeSlider.addEventListener('input', () => {
        setVolume(volumeSlider.value / 100);
    })

    musicSlider.addEventListener('input', () => {
        let isSongPlay = songPlayer.getStatus();

        if (isSongPlay == SongPlayer.STATUS_PLAYING)
            pauseSong();


        seekAudio(Math.floor(musicSlider.value));
        ControlBarComponent.updateSliderCountingTime(musicSlider.value);

        if (isSongPlay == SongPlayer.STATUS_PLAYING)
            continueSong();
    })


    //Handle function button
    sufferButton.addEventListener('click', handleSufferButton);
    loopButton.addEventListener('click', handleLoopButton);


}

