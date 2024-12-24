import * as LoginUtils from './login.ultis.js'
import Router from '../../Components/router/router.js';

const onStart = async () => {
    console.log('welcome to login page!')
    let statusCode = await LoginUtils.setDefaultEvent();
}

await onStart();