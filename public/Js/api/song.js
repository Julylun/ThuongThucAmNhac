export {
    getSuggestionSong
}


const getSuggestionSong = async () => {
    return fetch("/api/song/suggest", {method: 'GET'})
    .then((response) => response.json())
    .then((result) => {
        return result;
    })
    .catch((error) => {
        return null
        console.error(error)
    }); 
}