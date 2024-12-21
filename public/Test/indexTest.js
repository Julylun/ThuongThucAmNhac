import * as Login from '../Js/authentication/login.js'
import ApiService from '../Js/api/apiService.js'

const onStart = async () => {
    // Login.login('hoangluan','123')
    await ApiService.getApiBase();
}

// await onStart()