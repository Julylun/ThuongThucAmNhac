import { isEmailAddress } from "../../Features/common/email.js";
import * as RegisterService from '../../Js/service/registerService/registerService.js'
import Router from "../../Components/router/router.js";

export {
    setDefaultEvent
}

let userAddressInput = document.getElementById('js__user-address-input');
let usernameInput = document.getElementById('js__user-name-input');
let userPasswordInput = document.getElementById('js__user-password-input');
let userRepeatPasswordInput = document.getElementById('js__user-repeat-password-input');
let logupButton = document.getElementById('js__logup-button');

const ERROR_WRONG_EMAIL_FORMAT = 'Value in the email address field is not email address format.';
const ERROR_PASSWORD_DOESNT_MATCH = 'Password and repeat password doesnt match';
const setDefaultEvent = async () => {
    logupButton.addEventListener('click', async () => {
        if (!isEmailAddress(userAddressInput.value)) throw new Error(ERROR_WRONG_EMAIL_FORMAT);
        if (userPasswordInput.value != userRepeatPasswordInput.value) throw new Error(ERROR_PASSWORD_DOESNT_MATCH)

        let statusCode = await RegisterService.registerSystemAccount(
            userAddressInput.value,
            usernameInput.value,
            userPasswordInput.value
        );

        if (statusCode == 200) {
            let router = Router.getInstance();
            let otpToken = sessionStorage.getItem('__otp__token__');
            sessionStorage.removeItem('__otp__token__');
            router.directNoReload('confirm?token=' + otpToken);
        }
    })

}