export {
    onStart
}

import * as LogupUtils from './logup.utils.js';

const onStart = async () => {
    await LogupUtils.setDefaultEvent();
}

await onStart();