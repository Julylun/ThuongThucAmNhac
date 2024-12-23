import * as PlaylistService from '../../Js/service/playlistService/playlistService.js';

export {
    getPlaylistData
}

const getPlaylistData = async () => {
    try {
        const response = await PlaylistService.getAllPlaylist();
        console.log('Playlist Data:', response);
        return response;
    } catch (error) {
        console.error('Error fetching library data:', error);
        return null;
    }
};
