export {
    addSongToCurrentPositionEvent
}

import SongPlayer from "../musicplayer/songplayer.class.js";
import { nextSong, playSong } from "../../Js/controlBar/controlBar.js";


const songPlayer = SongPlayer.getSongPlayer();

/**
 * Add event to a button when you want that button can be used to play its song.
 * @param {Song} data 
 * @example  songButtn.onclick = () => { addSongToCurrentPositionEvent(songData) }
 */
const addSongToCurrentPositionEvent = (data) => {
    songPlayer.addSongToCurrentPosition(data);
    songPlayer.nextSongIndex();
    playSong();
    // nextSong();
}