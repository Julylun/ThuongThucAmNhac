import * as Layout from '../Components/layout.js'
import Router from '../Components/router/router.js';

import * as PageLoader from '../Components/loader.js'
import SongPlayer from '../Features/musicplayer/songplayer.class.js';
import * as SongService from './service/songService/songServices.js'


let songPlayer = undefined;
const router = Router.getInstance();

/**
 * Add default route
 */
const routerConfiuration = () => {
    router.createRoute('login', './Views/Pages/login.html');
    router.createRoute('admin', './Admin/index.admin.html');
    router.createRoute('register','./Views/Pages/logup.html');
    router.createRoute('logup','./Views/Pages/logup.html');
    router.createRoute('change-password','/Views/pages/changePassword.html')
    router.createRoute('confirm','/Views/pages/verifyOTP.html')
}


/**
 * onStart is the main function of this javascript file. That means onStart will be called first.
 */
const onStart = async () => {
    // console.debug('checkpoint 1')
    routerConfiuration();
    if ((await router.autoRoute())) {
    } else {
        let songPlayer = SongPlayer.getSongPlayer();


        Layout.onStart();

        PageLoader.loadPosition();
        PageLoader.reloadContent();


        let songData = (await SongService.getSuggestionSong()).data;
        console.log(songData)
        songPlayer.addSongsToQueue(songData);
        songPlayer.loadSong();

    }
}

await onStart()