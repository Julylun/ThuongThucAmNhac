import ApiService from "../../api/apiService.js";

export {
    refreshAccessToken
}

const refreshAccessToken = async () => {
    const API_BASE = (await ApiService.getApiBase()) + 'auth/accesstoken/refresh';
    try {
        let response = await fetch(API_BASE, {
            method: 'POST',
            credentials: 'include'
        });

        console.log(response)
        if (!response.ok) throw new Error('500: Internal server error');

        let responseData = await response.json();
        if (!responseData) throw new Error('500: Internal server error');

        if (responseData.statusCode != 200) throw new Error(responseData.statusCode + ': ' + responseData.message);

        console.log(responseData.data.accessToken)
        localStorage.setItem('accessToken',responseData.data.accessToken);
        return 200;
    } catch (error) {
        console.error(error);
        return parseInt(error.message.slice(0,3));
    }
}