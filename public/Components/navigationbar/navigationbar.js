import * as File from '../../Features/common/file.js'
export {
    createNavigationBar
}

const createJsLink = async (sideBarHtmlElement) => {
    const scriptTag = document.createElement('script')
    scriptTag.src = "/Js/sidebar/sidebar.js"
    scriptTag.type = 'module'
    sideBarHtmlElement.insertAdjacentElement('afterend', scriptTag)
}

const createNavigationBar = async () => {
    let sidebar_html = await File.getTextFromFile('/Views/navigationbar.html')

    const htmlParser = new DOMParser()
    const doc = htmlParser.parseFromString(sidebar_html, "text/html")

    let tempSideBarHtmlElement = doc.querySelector('#navigation-bar')
    let mainSideBarHtmlElement = document.getElementById('navigation-bar')

    mainSideBarHtmlElement.classList = tempSideBarHtmlElement.classList
    mainSideBarHtmlElement.innerHTML = tempSideBarHtmlElement.innerHTML

    // createJsLink(mainSideBarHtmlElement)

    // console.log(sidebar_html)
}


//TODO: Create an event listen making profile box hide when clicking on another element
const showProfileBox = () => {
    let profileBoxHtmlElement = document.getElementById('profile-box')
    profileBoxHtmlElement.classList.remove('hidden')
    profileBoxHtmlElement.classList.add('flex')
    // document.addEventListener('click', function closeProfileBoxEvent(e) {
    //     if (!e.target.classList.contains('profile-box')) {
    //         profileBoxHtmlElement.classList.remove('flex')
    //         profileBoxHtmlElement.classList.add('hidden')
    //         document.removeEventListener('click', closeProfileBoxEvent)
    //     }
    // })
}
const profileBoxEventAssign = () => {
    document.getElementById('js__profile-button').addEventListener('click', showProfileBox)
}


const onStart = async () => {
    //    await createNavigationBar()
    profileBoxEventAssign()
}


onStart()
