// import { Howl, Howler } from './lib/howlerjs/howler.js'

// import { Howl, Howler} from './lib/howlerjs/howler.min.js'
import * as ControlBar from '../../Js/controlBar/controlBar.js'

class SongPlayer {
    static instance = null;
    static songIdToHref(songId) {
        console.log(songId)
        return window.origin + '/api/v1/song/stream?id=' + songId;
    }
    static getSongPlayer = () => {
        if (!this.instance) this.instance = new SongPlayer();
        return this.instance;
    }

    constructor() {
        this.audio = null;
        this.queue = [];
        this.songIndex = 0;
        this.progressBar = document.getElementById('music-slider'),
        this.volume = 0.7;
    }


    /**
     * Add a song to the queue
     * @param {Song} song 
     */
    addSongToQueue(song) {
        this.queue.push(song)
    }


    /**
     * Add a song list to the queue
     * @param {Song[]} songs 
     */
    addSongsToQueue(songs) {
        for (let song of songs) this.addSongToQueue(song);
    }


    /**
     * Remove all songs from the queue
     */
    removeAllSongs() {
        this.queue = []
    }


    /**
     * Load song at current index
     */
    loadSong() {
        console.log(this.queue)
        // console.log(this.songIndex)
        let currentSong = this.queue.at(this.songIndex)
        
        // console.log(currentSong)
        let path = SongPlayer.songIdToHref(currentSong.songId);
        console.log(path)
        this.audio = new Howl({
            src: [path],
            volume: 0.7,
            format: ['mp3'],
            onend: function () { }
        })

        ControlBar.updateControlBarInformation()
    }



    /**
     * Delete song from audio instance (howler instance).
     * Use this before play a new song to free your memory brou
     */
    unloadSong() {
        this.audio.unload();
    }



    /**
     * Increase song index one un
     * @returns true if current index is not at the end of queue, false if it is the end of queue 
     */
    nextSongIndex() {
        if (this.songIndex + 1 < this.queue.length) {
            this.songIndex += 1;
            return true;
        }
        return false
    }

    /**
     * Decrease song index one unit
     * @returns true if current index is not at the first of queue, false if it is the first of queue 
     */
    previousSongIndex() {
        this.songIndex -= 1;
    }

    /**
     * Play loaded song
     * @returns true if play song successfully, reversing false
     */
    playSong() {
        try {
            this.audio.play();
            return true;
        } catch (error) {
            console.error(error)
            return false;
        }
    }


    /**
     * wth
     * ! This can't use right now :v
     */
    resume() {
        this.audio.resume()
    }
    /**
     * Stop song
     */
    stop() {
        this.audio.stop();
    }


    /**
     * Pause song
     */
    pauseSong() {
        this.audio.pause();
    }


    /**
     * Get current time of audio
     * @returns time on second
     */
    getCurrentTime() {
        return this.audio.seek();
    }




    /**
     * set current time of audio
     * @param {number} timeOnSecond 
     */
    setCurrentTime(timeOnSecond) {
        this.audio.seek(timeOnSecond)
    }


    /**
     * Set volume. Volume parameter has value from 0.0 to 1.0.
     * @param {float} volumeNumber 
     */
    setVolume(volumeNumber) {
        if(volumeNumber < 0 || volumeNumber > 1) {
            console.error('Volume number must have value between 0.0 and 1');
            return;
        }
        this.volume = volumeNumber;
        this.audio.volume(volumeNumber)
    }


    /**
     * Get the current song from the music player queue
     * @returns {Song} - An object which has song information
     */
    getCurrentSong() {
        console.log(this.queue)
        console.log(this.songIndex)
        return this.queue[this.songIndex];
    }

    //TODO: <Hoang Luan> [Create]: Create removeSongAt method
    removeSongAt(index) {
    }
}


export default SongPlayer;