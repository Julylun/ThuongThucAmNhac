import * as File from '../Features/common/file.js'

export {
    Page,
    PAGELOAD_EXPLORE,
    pageLoad,
    reloadContent,
    setCurrentPage,
    getPageFromIndentifyData,
    global_currentPage,

}

let global_currentPage

class Page {
    constructor(path, id_name) {
        this.path = path
        this.id_name = id_name
    }

    async setTag() {
        // Get html text and convert it into htmlELement
        let fileText_html = await File.getTextFromFile(this.path)

        const htmlParser = new DOMParser()
        const doc = htmlParser.parseFromString(fileText_html, "text/html")


        // Get page tag
        let tempTag = doc.querySelector('#' + this.id_name)

        let contentParent = document.getElementById('js__content')

        while (contentParent.firstChild) { //Remove all children in js__content
            contentParent.removeChild(contentParent.firstChild);
        }

        contentParent.appendChild(tempTag)
        contentParent.classList = doc.querySelector('#js__content').classList


        //TODO: Create script file and remove all old script file
    }
}

const PAGELOAD_LIBRARY = new Page('','')
const PAGELOAD_EXPLORE = new Page('/Views/Pages/explore.html','content-page__explore')
const PAGELOAD_LEELUNCHART = new Page('','')
const PAGELOAD_NEW_MUSIC_CHART = new Page('','')
const PAGELOAD_TOPIC_GENRE = new Page('','')
const PAGELOAD_TOP_100 = new Page('','')


const getPageFromIndentifyData = (indentifyData) => {
    switch(indentifyData) {
        case 'library': return PAGELOAD_LIBRARY 
        case 'explore': return PAGELOAD_EXPLORE
        case 'leelunchart': return PAGELOAD_LEELUNCHART
        case 'new_music_chart': return PAGELOAD_NEW_MUSIC_CHART
        case 'topic_genre': return PAGELOAD_TOPIC_GENRE
        case 'top100': return PAGELOAD_TOP_100
    }
}

const pageLoad = (page) => {
    page.setTag()
}

const reloadContent = () => {
    pageLoad(global_currentPage)
}

const setCurrentPage = (page) => {
    global_currentPage = page
    console.log("[FlowDebug](loader.js - setCurrentPage): Set current page to %s", global_currentPage.id_name)
}
const onStart = () => {
    global_currentPage = PAGELOAD_EXPLORE
}

onStart()