import MusicPlayer from "./musicplayer";

const musicPlayer = MusicPlayer


const removeAllSongs = () => {
    musicPlayer.removeAllSong();
}

const addSongToQueue = (song) => {
    musicPlayer.addSongToQueue(song);
}

const addSongsToQueue = (songs) => {
    for(let song of songs) addSongToQueue(song)
}
