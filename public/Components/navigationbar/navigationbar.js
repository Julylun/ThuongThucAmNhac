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


const getLocalStorageData = (item) => {
    try {
        let data = localStorage.getItem(item);
        if (!data) throw new Error('Item is null');
        let parsedData = JSON.parse(data);
        return parsedData;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const updateProfileBox = () => {
    let profileBoxAvatar = document.getElementById('js__profile-box__avatar');
    let profileBoxName = document.getElementById('js__profile-box__name');

    let profileData = getLocalStorageData('profile');
    if (!profileData) {
        console.log('Profile is null. User needs login to have profile data');
        profileBoxAvatar.src = '#';
        profileBoxName.innerHTML = 'Hello Guest'
        return;
    }
    console.log(profileData.personName + 'hehehe')
    if (profileData.personAvatar)
        profileBoxAvatar.src = profileData.personAvatar;
    profileBoxName.innerHTML = 'Hello ' + profileData.personName;
    return;
}
const createNavigationBar = async () => {
    // console.log('[FlowDebug](navigationbar.js) - createNavigationBar(): Start creating navigation bar')
    let sidebar_html = await File.getTextFromFile('/Views/navigationbar.html')

    const htmlParser = new DOMParser()
    const doc = htmlParser.parseFromString(sidebar_html, "text/html")

    let tempSideBarHtmlElement = doc.querySelector('#navigation-bar')
    let mainSideBarHtmlElement = document.getElementById('navigation-bar')

    mainSideBarHtmlElement.classList = tempSideBarHtmlElement.classList
    mainSideBarHtmlElement.innerHTML = tempSideBarHtmlElement.innerHTML

    profileBoxEventAssign()
    updateProfileBox();
    // createJsLink(mainSideBarHtmlElement)

    // console.log(sidebar_html)
}


const showProfileBox = () => {
    const ACTIVED_BACKGROUND_COLOR_PROFILE_ZONE = 'bg-[#04040420]';
    const UNACTIVED_BACKGROUND_COLOR_PROFILE_ZONE = 'bg-[#00000000]';
    const PROFILE_ZONE_BLUR = 'backdrop-blur-xs'


    let profileBoxHtmlElement = document.getElementById('profile-box')
    let profileBoxZoneElement = document.getElementById('profile-box-clear-zone');
    profileBoxHtmlElement.classList.remove(['hidden'])
    profileBoxHtmlElement.classList.add('flex')
    profileBoxZoneElement.classList.add('inline');
    profileBoxZoneElement.classList.remove('hidden')
    let colorIntervalId = undefined;
    colorIntervalId = setInterval(() => {
        profileBoxZoneElement.classList.remove(UNACTIVED_BACKGROUND_COLOR_PROFILE_ZONE)
        profileBoxZoneElement.classList.add(ACTIVED_BACKGROUND_COLOR_PROFILE_ZONE)
        profileBoxZoneElement.classList.add(PROFILE_ZONE_BLUR)
        profileBoxHtmlElement.classList.remove('scale-0')
        profileBoxHtmlElement.classList.add('scale-100')
        profileBoxHtmlElement.classList.remove('-right-64')
        profileBoxHtmlElement.classList.add('right-0')


        clearInterval(colorIntervalId)
    }, 50)
    profileBoxZoneElement.addEventListener('click', function closeProfileBoxEvent(e) {
        profileBoxZoneElement.classList.add(UNACTIVED_BACKGROUND_COLOR_PROFILE_ZONE)
        profileBoxZoneElement.classList.remove(ACTIVED_BACKGROUND_COLOR_PROFILE_ZONE)
        profileBoxZoneElement.classList.remove(PROFILE_ZONE_BLUR)
        profileBoxHtmlElement.classList.remove('right-0')
        profileBoxHtmlElement.classList.add('-right-64')

        let _colorIntervalId = setInterval(() => {
            profileBoxZoneElement.classList.remove('inline');
            profileBoxZoneElement.classList.add('hidden')
            profileBoxHtmlElement.classList.remove('flex')
            profileBoxHtmlElement.classList.add('hidden')

            profileBoxHtmlElement.classList.add('scale-0')
            profileBoxHtmlElement.classList.remove('scale-100')

            clearInterval(_colorIntervalId)
        }, 400)

    })
}
const profileBoxEventAssign = () => {
    document.getElementById('js__profile-button').addEventListener('click', showProfileBox)
}


const onStart = async () => {
    // console.log('nav bar here')
}


onStart()
