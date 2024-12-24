import * as File from '../../Features/common/file.js'

export {
    createSideBar
}

const createJsLink = async (sideBarHtmlElement) => {
    const scriptTag = document.createElement('script')
    scriptTag.src = "/Js/sidebar/sidebar.js"
    scriptTag.type = 'module'
    sideBarHtmlElement.insertAdjacentElement('afterend',scriptTag)
}

const createSideBar = async () => {
    let sidebar_html = await File.getTextFromFile('/Views/sidebar.html') 

    const htmlParser = new DOMParser()
    const doc = htmlParser.parseFromString(sidebar_html, "text/html")

    let tempSideBarHtmlElement = doc.querySelector('#side-bar')
    let mainSideBarHtmlElement = document.getElementById('side-bar')

    mainSideBarHtmlElement.classList = tempSideBarHtmlElement.classList
    mainSideBarHtmlElement.innerHTML = tempSideBarHtmlElement.innerHTML

    createJsLink(mainSideBarHtmlElement)

    // console.log(sidebar_html)
}


// createSideBar()
