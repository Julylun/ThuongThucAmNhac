import * as PageLoader from '../Components/loader.js'
import SongPlayer from '../Features/musicplayer/songplayer.class.js';
import { linkControlBarToMusicPlayer } from './controlBar/controlBar.js'
import * as SongService from './service/songService/songServices.js'

const songPlayer = SongPlayer.getSongPlayer();


/**
 * onStart is the main function of this javascript file. That means onStart will be called first.
 */
const onStart = async () => {
    // console.log('[FlowDebug](index.js - onStart): Index is starting..')
    // console.log('[FlowDebug](index.js - onStart): Set default content: %s', PageLoader.PAGELOAD_EXPLORE.id_name)

    PageLoader.loadPosition();
    PageLoader.reloadContent();


    let songData = (await SongService.getSuggestionSong()).data;
    console.log(songData)
    songPlayer.addSongsToQueue(songData);
    songPlayer.loadSong();
    // songPlayer.playSong();
    // await linkControlBarToMusicPlayer(musicPlayer)
    // reloadContent()

}

await onStart()