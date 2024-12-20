import * as NavigationBar from './navigationbar/navigationbar.js'
import * as SideBar from './sidebar/sidebar.js'
import * as ControlBar from './controlbar/controlbar.js'
const defaultConfig = async () => {
    console.log('[FlowDebug](layout.js): set default configuration (Create navigation bar and side bar).')

    let bodyClassList = ['w-screen', 'h-screen', 'flex', 'overflow-hidden']
    for (let classname of bodyClassList) {
        document.body.classList.add(classname)
    }

    NavigationBar.createNavigationBar()
    SideBar.createSideBar()
    ControlBar.createControlBar()
    console.log('[FlowDebug](layout.js): set default configuration (Create navigation bar and side bar) done.')
    console.log(document.getElementById('control-bar'))
}

defaultConfig()