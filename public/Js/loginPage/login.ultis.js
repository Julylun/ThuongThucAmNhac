export {
    setDefaultEvent
}

import * as LoginService from '../service/loginService/loginService.js'
import { isEmailAddress } from '../../Features/common/email.js';
import Router from '../../Components/router/router.js';

let loginButton = document.getElementById('js__login-button');
let emailInput = document.getElementById('js__email-input');
let passwordInput = document.getElementById('js__password-input');



const handleLoginButton = async () => {
    try {
        console.log('hehe')
        let userEmail = emailInput.value;
        let userPassword = passwordInput.value;

        if (!isEmailAddress(userEmail)) return -400;
        let errorCode = await LoginService.loginWithSystemAccount(userEmail, userPassword);
        if (errorCode < 0) {
            console.error(errorCode);
        }
        return errorCode;
    } catch (error) {
        console.error(error);
        return -500;
    }
}

const setDefaultEvent = async () => {
    loginButton.addEventListener('click', async () => {
        let loginStatus = await handleLoginButton();
        //TODO: If login status < 0 => display error
        if(loginStatus > 0) await (Router.getInstance()).direct('')
        console.log('login status: ' + loginStatus)
    })
}