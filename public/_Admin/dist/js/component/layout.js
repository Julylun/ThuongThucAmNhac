import * as File from '../../../../Features/common/file.js'

export {
    onStart
}
const createNavigationBar = async () => {
    let data = await File.getTextFromFile('/_Admin/dist/views/navbar.html');
    console.log(data)
    const _nav = new DOMParser().parseFromString(data, 'text/html').getElementById('navbar-main')
    const nav = document.getElementById('navbar-main');
    nav.innerHTML = _nav.innerHTML;
    nav.classList = _nav.classList
}

const createSideBar = async () => {
    let data = await File.getTextFromFile('/_Admin/dist/views/sidebar.html');
    console.log(data)
    const _sidebar= new DOMParser().parseFromString(data, 'text/html').getElementById('sidebar-main')
    const sidebar= document.getElementById('sidebar-main');
    sidebar.innerHTML = _sidebar.innerHTML;
    sidebar.classList = _sidebar.classList

}

const onStart = async () => {
    await createNavigationBar();
    await createSideBar();
}
