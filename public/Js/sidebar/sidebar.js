import * as Svg from '../../Components/svg.js'
import * as PageLoader from '../../Components/loader.js'


const PageLoadList = [
    PageLoader.PAGELOAD_EXPLORE,
    PageLoader.PAGELOAD_EXPLORE,
    PageLoader.PAGELOAD_EXPLORE,
    PageLoader.PAGELOAD_EXPLORE,
    PageLoader.PAGELOAD_EXPLORE,
    PageLoader.PAGELOAD_EXPLORE,
    PageLoader.PAGELOAD_EXPLORE,
]

const setSideBarButtonFunction = () => {
    let sideBarButtonHtmlElementList = document.getElementsByClassName('js-sidebar__button')
    for (let button of sideBarButtonHtmlElementList) {
        // console.log(button)
        button.addEventListener('click', () => {
           PageLoader.setCurrentPage(
            PageLoader.getPageFromIndentifyData(button.getAttribute('data-page-indentify'))
           )
           PageLoader.reloadContent()
        })
    }
}

const onStart = () => {
    console.log('[FlowDebug](sidebar.js - onStart): Start sidebar')

    Svg.changeElementsColor('js-sidebar__icon-button', '#C6C5C7')
    console.log('[FlowDebug](sidebar.js - onStart): Changed SVG color')

    console.log('[FlowDebug](sidebar.js - onStart): Setting side bar button function...')
    setSideBarButtonFunction()

}

document.getElementById('createPlaylist').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('form_addPlaylist').classList.remove('hidden');
});

document.getElementById('close_createPlaylist').addEventListener('click', function () {
    document.getElementById('form_addPlaylist').classList.add('hidden');
});

onStart()

