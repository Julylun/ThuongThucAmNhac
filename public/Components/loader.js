import * as File from '../Features/common/file.js'
import { setActivedSidebarButton } from '../Js/sidebar/sidebarUtils.js'

export {
    Page,
    PAGELOAD_EXPLORE,
    pageLoad,
    reloadContent,
    setCurrentPage,
    getPageFromIndentifyData,
    global_currentPage,
    loadPosition

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
        let tempScript = doc.getElementsByClassName('page-script')
        console.log(tempScript)


        // Remove all script tag in current page if it is page-script
        console.log(document.getElementsByClassName('page-script').length)
        while (document.getElementsByClassName('page-script').length != 0) {
            for (let script of document.getElementsByClassName('page-script')) {
                console.log('deleted:')
                console.log(script)
                script.remove()
            }
        }


        // Remove all children in js__content
        let contentParent = document.getElementById('js__content')
        while (contentParent.firstChild) { //Remove all children in js__content
            contentParent.removeChild(contentParent.firstChild);
        }

        contentParent.appendChild(tempTag)
        contentParent.classList = doc.querySelector('#js__content').classList



        //If tmepscript is not null then append it to body
        if (tempScript) {
            for (let _tempScript of tempScript) {
                let script = document.createElement('script')

                let tmpId = (!_tempScript.classList.contains('no-reload')) ? '?timesamp=' + Date.now() : ''
                script.src = _tempScript.src + tmpId
                script.type = _tempScript.type
                // script.defer = true
                script.classList = _tempScript.classList

                document.body.appendChild(script)
            }
        }
    }
}

const PAGELOAD_LIBRARY = new Page('/Views/Pages/pageload_library.html', 'content-page__library')
const PAGELOAD_EXPLORE = new Page('/Views/Pages/pageload_explore.html', 'content-page__explore')
const PAGELOAD_LEELUNCHART = new Page('/Views/Pages/pageload_leelunchart.html', 'content-page__leelunchart')
const PAGELOAD_NEW_MUSIC_CHART = new Page('/Views/Pages/pageload_newMusicChart.html', 'content-page__newMusicChart')
const PAGELOAD_TOPIC_GENRE = new Page('/Views/Pages/pageload_topic&genre.html', 'content-page__topic-genre')
const PAGELOAD_TOP_100 = new Page('/Views/Pages/pageload_top100.html', 'content-page__top100')


const getPageFromIndentifyData = (indentifyData) => {
    switch (indentifyData) {
        case 'library': return PAGELOAD_LIBRARY
        case 'explore': return PAGELOAD_EXPLORE
        case 'leelunchart': return PAGELOAD_LEELUNCHART
        case 'new_music_chart': return PAGELOAD_NEW_MUSIC_CHART
        case 'topic_genre': return PAGELOAD_TOPIC_GENRE
        case 'top100': return PAGELOAD_TOP_100
    }
}

const pageToIndentifyData = (page) => {
    switch (page) {
        case PAGELOAD_LIBRARY: return 'library'
        case PAGELOAD_EXPLORE: return 'explore'
        case PAGELOAD_LEELUNCHART: return 'leelunchart'
        case PAGELOAD_NEW_MUSIC_CHART: return 'new_music_chart'
        case PAGELOAD_TOPIC_GENRE: return 'topic_genre'
        case PAGELOAD_TOP_100: return 'top100'
    }
}

const pageLoad = (page) => {
    page.setTag()
    setActivedSidebarButton(pageToIndentifyData(page))

}

const loadPosition = () => {
    let pathName = window.location.pathname;
    switch (pathName) {
        case '/explore': {
            setCurrentPage(PAGELOAD_EXPLORE);
            break;
        }
        case '/library': {
            setCurrentPage(PAGELOAD_LIBRARY);
            break;
        } case '/leelunchart': {
            setCurrentPage(PAGELOAD_LEELUNCHART);
            break;
        } case '/new_music_chart': {
            setCurrentPage(PAGELOAD_NEW_MUSIC_CHART);
            break;
        }
        case '/topic_genre': {
            setCurrentPage(PAGELOAD_TOPIC_GENRE);
            break;
        }
        case '/top100': {
            setCurrentPage(PAGELOAD_TOP_100);
            break;
        }
        case '/administrator': {
            window.location.href = '/Admin/index.admin.html'
            break;
        }
    }
}

const changePage = () => {
    document.removeChild();
}
const reloadContent = () => {
    pageLoad(global_currentPage);
    setActivedSidebarButton(pageToIndentifyData(global_currentPage))
    window.history.pushState(null, null, '/' + pageToIndentifyData(global_currentPage));
}

const setCurrentPage = (page) => {
    global_currentPage = page
    console.log("[FlowDebug](loader.js - setCurrentPage): Set current page to %s", global_currentPage.id_name)
}
const onStart = () => {
    global_currentPage = PAGELOAD_EXPLORE
}

onStart()