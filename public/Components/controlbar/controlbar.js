import * as File from '../../Features/common/file.js'
import { linkControlBarToMusicPlayer } from '../../Js/controlBar/controlBar.js'
import SongPlayer from '../../Features/musicplayer/songplayer.class.js'
export {
    createControlBar,
    updateControlBarInformation,
    updateSliderBarValue,
    updateSliderCountingTime,
    updateControlBarButtonColor,
    setSliderValue
}

//![Dont create a songPlayer instance at global scope]. Create a SongPlayer instance at this module can cause a confict between this module and control bar javascript module

const ButtonColor = {
    // unactived: '#'
}
let sliderBar = document.getElementById('music-slider');
let live_sliderDurationCurrentTimeElement = document.getElementById('music-slider__duration-current-time');
// const musicPlayer = MusicPlayer.getInstance()




const createJsLink = async (sideBarHtmlElement) => {
    const scriptTag = document.createElement('script')
    scriptTag.src = "/Js/controlbar/controlbar.js"
    scriptTag.type = 'module'
    sideBarHtmlElement.insertAdjacentElement('afterend', scriptTag)
}

const createControlBar = async () => {
    console.log('Creating control bar...')
    let sidebar_html = await File.getTextFromFile('/Views/controlbar.html')

    const htmlParser = new DOMParser()
    const doc = htmlParser.parseFromString(sidebar_html, "text/html")

    let tempSideBarHtmlElement = doc.querySelector('#control-bar')
    let mainSideBarHtmlElement = document.getElementById('control-bar')

    mainSideBarHtmlElement.classList = tempSideBarHtmlElement.classList
    mainSideBarHtmlElement.innerHTML = tempSideBarHtmlElement.innerHTML

    createJsLink(mainSideBarHtmlElement)

    linkControlBarToMusicPlayer()
}



const updateSliderBarValue = (duration) => {
    if (!sliderBar) sliderBar = document.getElementById('music-slider');
    const delayTime = 0.1; //0.1s
    console.log(sliderBar.value)
    let tmpInterval = setInterval(() => {
        // console.log('test: ' + typeof(parseFloat(sliderBar.value)) + ' ' + parseFloat(sliderBar.value))
        sliderBar.value = (parseFloat(sliderBar.value) + delayTime);
        if (sliderBar.value > Math.floor(duration)) clearInterval(tmpInterval);

    }, delayTime * 1000)

}

const setSliderValue = (time) => {
    if (!sliderBar) sliderBar = document.getElementById('music-slider');
    sliderBar.value = time;
}
const updateSliderCountingTime = (duration) => {
    let durationOnMinute = Math.floor(Math.floor(duration / 60));
    let durationOnSecond = Math.floor(duration % 60);

    let minuteString = (durationOnMinute > 9) ? durationOnMinute : '0' + durationOnMinute;
    let secondString = (durationOnSecond > 9) ? durationOnSecond : '0' + durationOnSecond;

    if (!live_sliderDurationCurrentTimeElement) live_sliderDurationCurrentTimeElement = document.getElementById('music-slider__duration-current-time');
    live_sliderDurationCurrentTimeElement.innerHTML = minuteString + ':' + secondString;

}

const updateControlBarInformation = (songName, songImagePath, songAuthorName, duration) => {
    let durationOnMinute = Math.floor(Math.floor(duration / 60));
    let durationOnSecond = Math.floor(duration % 60);

    let minuteString = (durationOnMinute > 9) ? durationOnMinute : '0' + durationOnMinute;
    let secondString = (durationOnSecond > 9) ? durationOnSecond : '0' + durationOnSecond;


    document.getElementById('control-song-name').innerHTML = songName;
    document.getElementById('control-song-image').src = songImagePath;
    document.getElementById('control-song-author').innerHTML = songAuthorName;
    document.getElementById('music-slider__duration-limit-time').innerHTML = minuteString + ':' + secondString
}


const updateControlBarButtonColor = () => {
    const setActive = (svgElement) => {
        svgElement.classList.remove('fill-control-button');
        svgElement.classList.remove('stroke-control-button');
        svgElement.classList.add('fill-control-button--active');
        svgElement.classList.add('stroke-control-button--active');
    }
    const setUnactive = (svgElement) => {
        svgElement.classList.remove('fill-control-button--active');
        svgElement.classList.remove('stroke-control-button--active');
        svgElement.classList.add('fill-control-button');
        svgElement.classList.add('stroke-control-button');
    }

    const songPlayer = SongPlayer.getSongPlayer();

    let loopButtonImage = document.getElementById('control-bar__loop-button').querySelector('svg');
    console.log(loopButtonImage);
    let muteButtonImage = document.getElementById('control-bar__mute-button').querySelector('svg');
    let sufferButtonImage = document.getElementById('control-bar__suffer-button').querySelector('svg');
    let lyricButtonImage = document.getElementById('control-bar__lyric-button').querySelector('svg')
    let continueButtonImage = document.getElementById('control__play-button--continue');
    let pauseButtonImage = document.getElementById('control__play-button--pausing');

    if (songPlayer.looping()) {
        setActive(loopButtonImage);
    } else setUnactive(loopButtonImage);

    // if (songPlayer.muted()) {
    //     setActive(muteButtonImage);
    // } else setUnactive(muteButtonImage);

    if (songPlayer.suffering()) {
        setActive(sufferButtonImage);
    } else setUnactive(sufferButtonImage);


    let songPlayerStatus = songPlayer.getStatus();
    if (songPlayerStatus == SongPlayer.STATUS_PLAYING) {
        continueButtonImage.classList.remove('hidden');
        continueButtonImage.classList.add('inline-block');
        pauseButtonImage.classList.add('hidden');
        pauseButtonImage.classList.remove('inline-block');
    } else {
        continueButtonImage.classList.add('hidden');
        continueButtonImage.classList.remove('inline-block');
        pauseButtonImage.classList.remove('hidden');
        pauseButtonImage.classList.add('inline-block');
    }
}




