import SongPlayer from '../../Features/musicplayer/songplayer.class.js';
import * as UserService from '../service/userService/userServices.js'
import * as ControlBarComponent from '../../Components/controlbar/controlbar.js'

export {
    linkControlBarToMusicPlayer,
    updateControlBarInformation
}

const songPlayer = SongPlayer.getSongPlayer()

const setDurationLimit = (duration) => {
    let musicSlider = document.getElementById('music-slider');

    let durationOnMinute = duration/60;
    let durationOnSecond = duration%60;
    musicSlider.setAttribute('min','0');
    musicSlider.setAttribute('max',duration);

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
            currentSong.songImage,
            songArtistInformation.personName
        )

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
        songPlayer.unloadSong();

        songPlayer.loadSong();
        songPlayer.playSong()


    }
}


/**
 * Change the current song to the previous song in the queue and play it
 */
const previousSong = () => {
    if (songPlayer.previousSongIndex()) {
        songPlayer.unloadSong();
        songPlayer.loadSong();
        songPlayer.playSong();
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


/**
 * Play song but loading before playing
 */
const playSong = () => {
    songPlayer.stop();
    songPlayer.unloadSong();
    songPlayer.loadSong()
    songPlayer.playSong();
}



/**
 * Set volume for the music player
 * @param {*} volume 
 */
const setVolume = (volume) => {
    songPlayer.setVolume(volume)
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

    nextButton.addEventListener('click', nextSong);
    previousButton.addEventListener('click', previousSong);

    volumeSlider.addEventListener('input', () => {
        setVolume(volumeSlider.value / 100);
    })

    playButton.addEventListener('click', playSong);
}

