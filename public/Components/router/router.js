import { getTextFromFile } from "../../Features/common/file.js";
import * as Page from '../../Features/common/page.js';

/**
 * Router is used to change page without reload. This is an upgrade version of Loader.
 * 
 */
class Router {
    static instance = undefined;
    static getInstance() {
        if (this.instance == undefined) this.instance = new Router();
        return this.instance;
    }
    constructor() {
        this.routeContainer = new Map();
    }

    directNoReload = (url) => {
        Page.changeUrlWithoutReload(url);
        this.autoRoute();
    }

    direct = (url) => {
        window.location.href = window.location.origin + '/' + url
    }
    async routeTo(filePath) {
        try {
            let htmlText = await getTextFromFile(filePath);

            let htmlElement = new DOMParser().parseFromString(htmlText, 'text/html');
            Page.documentToBody(htmlElement);
            await Page.injectScript(htmlElement);
        } catch (error) {
            console.error(error);
            throw error;
            // window.location.href = window.location.origin;
        }

    }
    createRoute(url, filePath) {
        if (!url || !filePath) throw new Error('Missing parameters');
        this.routeContainer.set(url, filePath);
    }

    removeRoute(url) {
        this.routeContainer.delete(url)
    }

    /**
     * 
     * @returns {true} if route to another page. @return {false} if donnt route to any page
     */
    async autoRoute() {
        try {
            let pathname = window.location.pathname.slice(1, window.location.pathname.length);
            // console.log('pathname:' + pathname)
            let filePath = this.routeContainer.get(pathname);
            if (filePath != undefined) await this.routeTo(filePath);
            else return false;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}

// const _Router = Router.getInstance();
// _Router.createRoute('login','./Views/Pages/login.html')
// const onStart = async () => {
// await _Router.autoRoute();
// }

export default Router;
