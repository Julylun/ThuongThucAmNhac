import * as File from  '../../Features/common/file.js'
import MusicPlayer from '../../Features/musicplayer/musicplayer.js'
import { linkControlBarToMusicPlayer } from '../../Js/controlBar/controlBar.js'
export {
   createControlBar 
}

const musicPlayer = MusicPlayer.getInstance()
const createJsLink = async (sideBarHtmlElement) => {
    const scriptTag = document.createElement('script')
    scriptTag.src = "/Js/controlbar/controlbar.js"
    scriptTag.type = 'module'
    sideBarHtmlElement.insertAdjacentElement('afterend',scriptTag)
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

    
    linkControlBarToMusicPlayer(musicPlayer);
    // console.log(sidebar_html)
}





