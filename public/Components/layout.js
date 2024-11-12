import * as NavigationBar from './navigationbar/navigationbar.js'
import * as SideBar from './sidebar/sidebar.js'
const defaultConfig = () => {
    let bodyClassList = ['w-screen', 'h-screen', 'flex', 'overflow-hidden']
    for (let classname of bodyClassList) {
        console.log(classname)
        document.body.classList.add(classname)
    }
    NavigationBar.createNavigationBar()
    SideBar.createSideBar()
}

defaultConfig()