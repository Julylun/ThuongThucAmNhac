
class MusicPlayer {
  //Singleton
  static instance = null;
  static getInstance() {
    if (this.instance == null) {
      this.instance = new MusicPlayer();
    }
    return this.instance;
  }


  constructor() {
    this.audio = new Audio();
    this.isPlaying = false;
    this.nextQueue = [];
    this.previousQueue = [];
    this.currentSong = null;
    this.progressBar = document.getElementById('music-slider');



    this.audio.addEventListener('timeupdate', () => {
      this.progressBar.setAttribute('value', Math.floor(this.audio.currentTime))
      console.log(this.audio)
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.progressBar.setAttribute('max', Math.floor(this.audio.duration));
    })
  }






  static songIdToHref(songId) {
    return window.origin + '/api/song/stream?id=' + songId;
  }


  addSongToQueue(inputSong) {
    if (song.isArray())
      for (let _song of inputSong) {
        this.nextQueue.push(song);
      }
      else this.nextQueue.push(inputSong);
  }

  setCurrentTime(time) {
    this.audio.currentTime = Math.floor(time);
  }

  setDefaultSong(song) {
    if (!song) {
      this.previousQueue.push(this.currentSong);
      this.currentSong = this.nextQueue.shift();
      this.audio.src = MusicPlayer.songIdToHref(this.currentSong.songId);
      this.load();
      return
    }
  }

  next() {
    if (this.nextQueue.length > 0) {
      this.previousQueue.push(this.currentSong);
      this.currentSong = this.nextQueue.shift();
      this.audio.src = MusicPlayer.songIdToHref(this.currentSong.songId);
      this.audio.load();
      this.audio.play();
      return true;
    } else {
      console.error('No next song');
      return false;
    }
  }

  previous() {
    if (this.previousQueue.length > 0) {
      this.nextQueue.push(this.currentSong);
      this.currentSong = this.previousQueue.pop();
      this.audio.src = MusicPlayer.songIdToHref(this.currentSong.songId);
      this.audio.load()
      this.audio.play()
      return true;
    } else {
      console.error('No previous song');
      return false;
    }
  }

  /**
   *  Load song from URL.
   * @param {string} url
   */
  load(url) {
    this.audio.src = url;
    this.audio.load();
    this.updateInformationToControlBar()
    console.log(`Music loaded: ${url}`);
  }

  updateInformationToControlBar() {
    const songName = document.getElementById('control-song-name')
    const songAuthor = document.getElementById('control-song-author')
    const songImage = document.getElementById('control-song-image')
    songName.innerText = this.currentSong.songName
    songAuthor.innerText = this.currentSong.songArtist.artistName
    songImage.src = '/' + this.currentSong.songImage
  }

  /**
   *  Play song
   */
  play() {
    if (this.audio.src) {
      this.audio.play();
      this.isPlaying = true;
      // console.log('Music is playing...');
    } else {
      console.error('No music loaded. Call load(url) before playing.');
    }
  }

  /**
   *  Pause music
   */
  pause() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      console.log('Music paused.');
    }
  }

  /**
   * Stop music and set currentTime to 0
   */
  stop() {
    if (this.audio.src) {
      this.audio.pause();
      this.audio.currentTime = 0; // Đặt lại thời gian phát về 0
      this.isPlaying = false;
      console.log('Music stopped.');
    }
  }

  /**
   * Set volume of music.
   * @param {number} volume - Volume must be between 0.0 and 1.0
   */
  setVolume(volume) {
    if (volume < 0 || volume > 1) {
      console.error('Volume must be between 0.0 and 1.0');
    } else {
      this.audio.volume = volume;
      console.log(`Volume set to ${volume}`);
    }
  }

  /**
   * Set callback when music ends.
   * @param {Function} callback - The funciotn to be called when music ends.
   */
  onEnd(callback) {
    this.audio.onended = callback;
    console.log('Callback set for when music ends.');
  }
}

export default MusicPlayer;
