import * as PageLoader from '../Components/loader.js'
import MusicPlayer from '../Features/musicplayer/musicplayer.js'
import { linkControlBarToMusicPlayer } from './controlBar/controlBar.js'

const musicPlayer = MusicPlayer.getInstance()
let songQueue = []

const reloadContent = () => {
    PageLoader.pageLoad(PageLoader.global_currentPage)
}
/**
 * onStart is the main function of this javascript file. That means onStart will be called first.
 */
const onStart = () => {
    // console.log('[FlowDebug](index.js - onStart): Index is starting..')
    // console.log('[FlowDebug](index.js - onStart): Set default content: %s', PageLoader.PAGELOAD_EXPLORE.id_name)


    PageLoader.reloadContent()
    // reloadContent()

}

onStart()