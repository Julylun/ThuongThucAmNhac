import * as PageLoader from '../Components/loader.js'

const reloadContent = () => {
    PageLoader.pageLoad(PageLoader.global_currentPage)
}
/**
 * onStart is the main function of this javascript file. That means onStart will be called first.
 */
const onStart = () => {
    console.log('[FlowDebug](index.js - onStart): Index is starting..')
    console.log('[FlowDebug](index.js - onStart): Set default content: %s', PageLoader.PAGELOAD_EXPLORE.id_name)

    reloadContent()
}

onStart()