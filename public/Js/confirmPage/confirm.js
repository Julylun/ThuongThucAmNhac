import * as ConfirmUtils from './confirm.utils.js'

const onStart = async () => {
    await ConfirmUtils.setDefaultEvent();
}

await onStart();