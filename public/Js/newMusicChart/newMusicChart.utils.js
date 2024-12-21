import * as SongService from '../../Js/service/songService/songServices.js'

export {
    getSongData
}

const getSongData = async (type) => {
    let responseData = (await SongService.getSuggestionSong(type)).data;

    return responseData;
}