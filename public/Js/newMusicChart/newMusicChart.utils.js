import * as SongService from '../../Js/service/songService/songServices.js'

export {
    getSongData
}
export {
    getListenTimesofAllSongs
}
const getSongData = async (type) => {
    let responseData = (await SongService.getSuggestionSong(type)).data;

    return responseData;
}
const getListenTimesofAllSongs = async () => {
    let responseData = (await SongService.getListenTimesofAllSongs()).data;

    return responseData;
}