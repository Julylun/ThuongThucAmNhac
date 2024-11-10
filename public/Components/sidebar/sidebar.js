import * as Path from '../../Features/common/path.js'

const getSideBar = async () => {
    let data = await fetch('/Views/sidebar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("Can't get sidebar from sidebar.html - Sidebar code doesn't exist or the network is bad!")
            }
            return response.text()
        })
    return data
}

const createJsLink = async (sideBarHtmlElement) => {
    const scriptTag = document.createElement('script')
    scriptTag.src = "/Js/sidebar/sidebar.js"
    // scriptTag.src = Path.getRelativePath(window.location.href, Path.getFileAbsolutePath(filePath))
    // console.log(Path.getFileAbsolutePath(filePath))
    scriptTag.type = 'module'
    sideBarHtmlElement.insertAdjacentElement('afterend',scriptTag)
}

const createSideBar = async () => {
    let sidebar_html = await getSideBar()

    const htmlParser = new DOMParser()
    const doc = htmlParser.parseFromString(sidebar_html, "text/html")

    let tempSideBarHtmlElement = doc.querySelector('#side-bar')
    let mainSideBarHtmlElement = document.getElementById('side-bar')

    mainSideBarHtmlElement.classList = tempSideBarHtmlElement.classList
    mainSideBarHtmlElement.innerHTML = tempSideBarHtmlElement.innerHTML

    createJsLink(mainSideBarHtmlElement)

    // console.log(sidebar_html)
}


createSideBar()
