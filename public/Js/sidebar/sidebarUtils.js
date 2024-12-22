import * as PageLoader from '../../Components/loader.js'

export {
    setSideBarButtonFunction,
    setHandleEventForCreatePlaylistButton,
    setActivedSidebarButton
}

/**
 * setSideBarButtonFunction is a function that set the function of sidebar buttons
 */
const setSideBarButtonFunction = () => {
    let sideBarButtonHtmlElementList = document.getElementsByClassName('js-sidebar__button')
    for (let button of sideBarButtonHtmlElementList) {
        button.addEventListener('click', () => {
            PageLoader.setCurrentPage(
                PageLoader.getPageFromIndentifyData(button.getAttribute('data-page-indentify'))
            )
            PageLoader.reloadContent()
        })
    }
}

/**
 * set event handling to create playlist button.
 * When user click on create playlist button, 
 * a form will be shown to let user create a new playlist.
 */
const setHandleEventForCreatePlaylistButton = () => {
    document.getElementById('createPlaylist').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('form_addPlaylist').classList.remove('hidden');
    });

    document.getElementById('close_createPlaylist').addEventListener('click', function () {
        document.getElementById('form_addPlaylist').classList.add('hidden');
    });
};


const setActivedSidebarButton = (id_name) => {
    const ActivedColor = "bg-[#393243]";
    const UnactivedColor = "bg-[#231B2E]";
    const HeightLineActivedColor = "bg-[#9B4DE0]";
    const HeightLineUnactivedColor = "bg-[[#231B2E]";

    // console.log('[sidebarUtils.js]: setActivedSidebarButton is called..')
    let sideBarButtonHtmlElementList = document.getElementsByClassName('js-sidebar__button')
    // console.log(sideBarButtonHtmlElementList)
    for (let index = 0; index < sideBarButtonHtmlElementList.length; index++) {
        let sidebarButton = sideBarButtonHtmlElementList[index];
        let sideBarButtonHeightLine = sidebarButton.getElementsByClassName('js-sidebar__height-line')[0];

        sidebarButton.classList.remove(UnactivedColor);
        sidebarButton.classList.remove(ActivedColor);

        sideBarButtonHeightLine.classList.remove(HeightLineActivedColor);
        sideBarButtonHeightLine.classList.add(HeightLineUnactivedColor);


        if (sidebarButton.getAttribute('data-page-indentify') == id_name) {
            sidebarButton.classList.remove(UnactivedColor);
            sidebarButton.classList.add(ActivedColor);

            sideBarButtonHeightLine.classList.add(HeightLineActivedColor);
            sideBarButtonHeightLine.classList.remove(HeightLineUnactivedColor);

            // console.log('[sidebarUtils.js]: catched..')
        }
    }
}