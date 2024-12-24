import * as NavigationBar from './navigationbar/navigationbar.js'
import * as SideBar from './sidebar/sidebar.js'
import * as ControlBar from './controlbar/controlbar.js'
export {
    onStart
}
const defaultConfig = async () => {
    // console.log('[FlowDebug](layout.js): set default configuration (Create navigation bar and side bar).')

    let bodyClassList = ['w-screen', 'h-screen', 'flex', 'overflow-hidden']
    for (let classname of bodyClassList) {
        document.body.classList.add(classname)
    }

    NavigationBar.createNavigationBar()
    SideBar.createSideBar()
    await ControlBar.createControlBar()
    // console.log('[FlowDebug](layout.js): set default configuration (Create navigation bar and side bar) done.')
    // console.log(document.getElementById('control-bar'))
}


/**
 * [Set sidebar, navigation bar, control bar to current page]
 * When start layout, sidebar, navigation bar and control bar will be added to page. This must be called first if you want your page having full components without conflict
 */
const onStart = async () => {
    await defaultConfig()
}
