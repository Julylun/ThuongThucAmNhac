import { ApiService } from "./apiService";
export {
    getSuggestionSong
}


const getSuggestionSong = async () => {
    let apiBase = ApiService.getApiBase() + 'song/suggest'
    return fetch(apiBase, {method: 'GET'})
    .then((response) => response.json())
    .then((result) => {
        return result;
    })
    .catch((error) => {
        return null
        console.error(error)
    }); 
}