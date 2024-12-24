export {
    clearBodyContext,
    changeUrlWithoutReload,
    documentToBody,
    injectScript
}

import { getTextFromFile } from "./file.js";

const clearBodyContext = () => {
    document.body.innerHTML = '';
    document.body.classList = ''
}

const documentToBody = (_document) => {
    if (_document == undefined || !_document) {
        throw new Error('The parameter _document in the function documentToBody is null or undefined.');
        return;
    }
    document.body.innerHTML = _document.body.innerHTML;
    document.body.classList = _document.body.classList;
}

/**
 * Remove all unactived script in current body and inject new scripts from Document instance.
 * - Scripts have 'stable-script' class will not be removed.
 * - Scripts have 'stable-script' in new Document instance will not be added also.
 * @param {Document} _document Document instance which contains target body
 */
const injectScript = async (_document) => {
    let oldScripts = document.getElementsByTagName('script');
    for (let oldScriptItem of oldScripts) {
        if (oldScriptItem.classList.contains('stable-script')) continue;
        oldScriptItem.remove();
    }

    let newScripts = _document.getElementsByTagName('script');
    for (let newScript of newScripts) {
        if (newScript.classList.contains('stable-script')) continue;
        import(newScript.src).then((module) => {
            
        }).catch((error) => console.error(error))
    }
}

const changeUrlWithoutReload = (url) => {
    window.history.pushState(null, null, '/' + url);
}