import * as LibraryComponent from '../../Components/library/library.componet.js';
// import * as LibraryUtils from '../../Components/library/library.utils.js';
import FakeData from '../../Test/fakeData/fakedata.data.js';

const onStart = () => {
    LibraryComponent.renderButtons(FakeData.Library.libraries);
    LibraryComponent.renderPlaylistButtons(FakeData.Library.myPlaylists);
    LibraryComponent.renderFavoriteSongs(FakeData.Library.myFavoriteSongs);
    LibraryComponent.renderAlbums(FakeData.Library.myAlbums);
}

onStart();
