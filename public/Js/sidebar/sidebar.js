import * as Svg from '../../Components/common/svg.js';
import * as SideBarUltis from './sidebarUtils.js';

/**
 * onStart is the main function of this javascript file. That means onStart will be called first.
 */
const onStart = () => {
    //Set event to create playlist button
    SideBarUltis.setHandleEventForCreatePlaylistButton();

    //Change color of sidebar button
    Svg.changeElementsColor('js-sidebar__icon-button', '#C6C5C7');

    //Set function for sidebar button
    SideBarUltis.setSideBarButtonFunction();
};


onStart();
