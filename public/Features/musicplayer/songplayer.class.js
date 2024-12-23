import * as ControlBar from '../../Js/controlBar/controlBar.js'
import * as ControlBarComponent from '../../Components/controlbar/controlbar.js'

class SongPlayer {
    static STATUS_STOPPED = -1;
    static STATUS_PAUSED = 0;
    static STATUS_PLAYING = 1;

    static instance = null;
    static songIdToHref(songId) {
        console.log(songId)
        return window.origin + '/api/v1/song/stream?id=' + songId;
    }
    static getSongPlayer = () => {
        if (!this.instance) {
            this.instance = new SongPlayer();
        }
        return this.instance;
    }

    constructor() {
        this.audio = null;
        this.queue = [];
        this.songIndex = 0;
        this.progressBar = document.getElementById('music-slider');
        this.volume = 0.7;
        this.status = SongPlayer.STATUS_STOPPED;
        this.isLooping = false;
        this.isSuffering = false;
    }

    addSongToCurrentPosition(song) {
        this.queue.splice(this.songIndex + 1, 0, song);
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
            onend: () => {ControlBarComponent.updateControlBarButtonColor() ;ControlBar.onEndSong() }
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
            if (this.isSuffering) {
                Math.floor(Math.random() * this.queue.length)
            }
            else this.songIndex += 1;
            return true;
        }
        return false
    }

    /**
     * Decrease song index one unit
     * @returns true if current index is not at the first of queue, false if it is the first of queue 
     */
    previousSongIndex() {
        if (this.songIndex - 1 >= 0) {
            if (this.isSuffering) {
                Math.floor(Math.random() * this.queue.length)
            } else this.songIndex -= 1;
            return true;
        }
        return false;
    }

    /**
     * Play loaded song
     * @returns true if play song successfully, reversing false
     */
    playSong() {
        try {
            this.audio.play();
            this.status = SongPlayer.STATUS_PLAYING;
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
        this.status = SongPlayer.STATUS_PLAYING;
    }

    /**
     * Stop song
     */
    stop() {
        this.audio.stop();
        this.status = SongPlayer.STATUS_STOPPED;
    }

    /**
     * Pause song
     */
    pauseSong() {
        this.audio.pause();
        this.status = SongPlayer.STATUS_PAUSED;
    }

    /**
     * Get current time of audio
     * @returns time on second
     */
    getCurrentTime() {
        console.log(this.audio.seek())
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
        if (volumeNumber < 0 || volumeNumber > 1) {
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


    looping() {
        return this.isLooping;
    }

    setLooping(isLooping) {
        this.isLooping = isLooping;
    }

    suffering() {
        return this.suffuring;
    }

    setSuffering(suffering) {
        this.suffuring = suffering;
    }



    //TODO: <Hoang Luan> [Create]: Create removeSongAt method
    removeSongAt(index) {
    }

    getStatus() {
        return this.status;
    }
}


export default SongPlayer;