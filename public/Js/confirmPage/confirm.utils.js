import * as RegisterService from '../service/registerService/registerService.js'
import Router from '../../Components/router/router.js';
import { Page } from '../../Components/loader.js';

export {
    setDefaultEvent
}

let otpInput = document.getElementById('otp-input');
let verifyButton = document.getElementById('verify-button');
const setDefaultEvent = async() => {
    verifyButton.addEventListener('click', async () => {
        try {
            if (otpInput.value.length != 5) throw new Error('Wrong input lenght');
            for(let char of otpInput.value) {
                if (char < '0' || char > '9') throw new Error('Wrong input length');
            }
            let statusNumber = await RegisterService.confirmSystemAccount(parseInt(otpInput.value));
            if(statusNumber < 0) throw new Error('error' + statusNumber);

            let router = Router.getInstance()
            router.directNoReload('login');
        } catch (error) {
            console.error(error);
        }
    })
}