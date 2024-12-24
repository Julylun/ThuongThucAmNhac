import ApiService from '../../api/apiService.js'

export {
    loginWithSystemAccount
}


const loginWithSystemAccount = async (email, password) => {
    console.log(email + ':' + password)
    const API_BASE = (await ApiService.getApiBase()) + 'login';
    let formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);


    let responsePromise = await fetch(API_BASE, {
        method: 'POST',
        body: new URLSearchParams(formData)
    });

    try {
        // console.log(await responsePromise.json())
        if(!responsePromise.ok) throw new Error('500: Server doesnt response. Internal server error.');
        let responseData = await responsePromise.json();
        // console.log(responseData)

        if(responseData.statusCode != 200) throw new Error(responseData.statusCode + ': Server responses an error. ' + responseData.message);

        if(!responseData.data.accessToken) throw new Error('500: Server doesnt response. Internal server error.');
        localStorage.setItem('accessToken',responseData.data.accessToken);
        console.log('Login completed! Installed access token and refresh token!')
        return 200; 
    } catch(error) {
        console.error(error)
        let errorString = error.message;
        let errorCode = errorString.slice(0,3);
        return parseInt(errorCode);
    }
}