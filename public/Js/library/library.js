import * as LibraryComponent from '../../Components/library/library.componet.js';
import { getPlaylistData } from './library.utils.js';
import { getSongsByPlaylistId } from '../../Js/service/playlistService/playlistService.js';

const onStart = async () => {
    try {
        const response = await getPlaylistData();
        console.log('Fetched Data:', response);

        if (response && Array.isArray(response.data)) {
            const allLibraries = [];
            const allSongs = [];
            for (const playlist of response.data) {
                const songs = await getSongsByPlaylistId(playlist.playlistId);

                const libraries = songs.map((song) => ({
                    name: song.songName,
                    imgSrc: song.songImage,
                    id: song.songId,
                    artistName: song.songArtist?.artistName || "Unknown Artist",
                }));

                allLibraries.push(...libraries);
                allSongs.push(...songs);
            }

            const uniqueLibraries = getUniqueArtists(allLibraries);
            LibraryComponent.renderButtons(uniqueLibraries);

            const myPlaylists = response.data.map((item) => ({
                playlistId: item.playlistId,
                playlistName: item.playlistName,
                artistName: item.artistName,
                playlistType: item.playlistType || 0,
            }));
            LibraryComponent.renderPlaylistButtons(myPlaylists);

            const myFavoriteSongs = allSongs.map((song) => ({
                song: song.songName,
                artist: song.songArtist?.artistName || "Unknown Artist",
                album: song.albumName,
                time: song.songDuration,
                image: song.songImage,
            }));
            LibraryComponent.renderFavoriteSongs(myFavoriteSongs);
            console.log('Playlists rendered successfully.');
        } else {
            console.error('Invalid or missing data:', response);
        }
    } catch (error) {
        console.error('Error in onStart:', error);
    }
};

function getUniqueArtists(libraries) {
    const artistNames = new Set();
    return libraries.filter((library) => {
        if (!artistNames.has(library.artistName)) {
            artistNames.add(library.artistName);
            return true;
        }
        return false;
    });
}

onStart();