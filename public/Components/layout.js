import * as NavigationBar from './navigationbar/navigationbar.js'
import * as SideBar from './sidebar/sidebar.js'
const defaultConfig = () => {
    console.log('[FlowDebug](layout.js): set default configuration (Create navigation bar and side bar).')

    let bodyClassList = ['w-screen', 'h-screen', 'flex', 'overflow-hidden']
    for (let classname of bodyClassList) {
        document.body.classList.add(classname)
    }
    NavigationBar.createNavigationBar()
    SideBar.createSideBar()
}

defaultConfig()