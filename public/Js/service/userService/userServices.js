import ApiService from '../../api/apiService.js';

export {
    findUser,
    getUserProfile
}

const getUserProfile = async () => {
    try {
        if(!localStorage.getItem('accessToken')) throw new Error('401: Unauthorized');

        const apiBase = (await  ApiService.getApiBase()) + 'user'
        let responsePromise = await fetch(apiBase, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('accessToken'),
            }
        }
        )
        if (!responsePromise.ok) throw new Error('500: Internal server error');

        let responseData = await responsePromise.json();
        if(responseData.statusCode != 200) throw new Error(responseData.statusCode + ': ' + responseData.message);
        
        localStorage.setItem('profile',JSON.stringify(responseData.data));
        return true;
    } catch (error) {
        console.error(error);
        localStorage.removeItem('profile');
        return false;
    }

}


const findUser = async (userId) => {
    try {
        let apiBase = (await ApiService.getApiBase()) + 'user/find?id=' + userId;

        let resposnePromise = await fetch(apiBase, { method: 'GET' })

        console.log(resposnePromise)
        if (resposnePromise.ok) resposnePromise = await resposnePromise.json();
        else throw new Error('Server not responsing... Error code: 500 - Internal server error');

        console.log(resposnePromise)
        if (resposnePromise.statusCode != 200) throw new Error('An error occured while fetch api... Error code: ' + resposnePromise.statusCode);

        console.log(resposnePromise.data)
        return resposnePromise.data;

    } catch (error) {
        console.error(error);
        return null
    }
}

//TODO: [Complete] Complete this function to get user information from "/api/user"
const getUser = async (id) => {
    if (!id) {
        let userPromise = await fetchGetUser()
        userPromise.then((response) => {
            if (response.status === 401) {
                console.log('[FlowDebug](user.js) - getUser(): Get user failed')
                console.error('Error:', response)
                window.location.href = '/login'
            }


            return response.json()
        })
    }
}