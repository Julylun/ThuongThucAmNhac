import ApiService from "../../api/apiService.js"

export {
    registerSystemAccount,
    confirmSystemAccount
}



/**
 * 
 * @param {*} emailAddress 
 * @param {*} username 
 * @param {*} password 
 * @returns {number} -400 - Missing parameters or parameters are null
 */
const registerSystemAccount = async (emailAddress, username, password) => {

    try {
        let API_BASE = (await ApiService.getApiBase()) + 'register';
        if (!emailAddress || !username || !password) throw new Error('400: Bad request - Missing parameters.')
        let formData = new FormData();
        formData.append('userEmail', emailAddress);
        formData.append('username', username);
        formData.append('userPassword', password);

        let responsePromise = await fetch(API_BASE, {
            method: 'POST',
            body: new URLSearchParams(formData)
        });

        if (!responsePromise.ok) throw new Error(responsePromise.status + ': An unknown error occured while executing client request.');

        let responseData = await responsePromise.json();
        if (responseData.statusCode != 200) throw new Error(responseData.statusCode + ': ' + responseData.message);

        let otpCodeToken = responseData.data.otpCodeToken;
        sessionStorage.setItem('__otp__token__', otpCodeToken);

        return 200;
    } catch (error) {
        console.error(error);
        return parseInt(error.message.splice(0, 3));
    }

}


/**
 * 
 * @param {*} otpCode 
 * @returns 
 */
const confirmSystemAccount = async (otpCode) => {
    try {
        let API_BASE = (await ApiService.getApiBase()) + 'register/confirm?token=' + new URLSearchParams(window.location.search).get('token');

        // console.log(API_BASE)
        let responsePromise = await fetch(API_BASE, {
            method: 'POST',
            body: new URLSearchParams({ optCode: otpCode })
        })
        console.log(responsePromise)

        if (!responsePromise.ok) throw new Error(responsePromise.status + ': An unknown error occured while executing client request.');

        let responseData = await responsePromise.json();
        if (responseData.statusCode != 200) throw new Error(responseData.statusCode + ': ' + responseData.message);

        return 200;
    } catch (error) {
        console.error(error);
        return parseInt(error.message.splice(0, 3));

    }
}