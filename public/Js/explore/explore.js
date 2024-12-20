import * as ExploreComponent from '../../Components/explore/exploreComponent.js'
import * as SongApi from '../api/song.js'
import MusicPlayer from '../../Features/musicplayer/musicplayer.js'


const musicPlayer = MusicPlayer.getInstance()
const generateSuggestionSongsComponent = async () => {
    let suggestionSongPromise = await SongApi.getSuggestionSong()
    if (suggestionSongPromise.data != null) {
        for (let song of suggestionSongPromise.data) {
            console.log(song)
            ExploreComponent.createMusicItem(song.songName, song.songArtist.artistName, window.origin + song.songImage.slice(6, song.songImage.length), document.getElementById('music-col-explore-suggestion'))
        }


        musicPlayer.addSongsToQueue(suggestionSongPromise.data)
        console.log("Loaded music- - V")
        console.log(musicPlayer.nextQueue)
        musicPlayer.setDefaultSong()
    }
}
const example = async () => {
    ExploreComponent.createMusicSector('Newly release song', 'newly-release-song')
    for (let index = 0; index <= 20; index += 1) {
        ExploreComponent.createMusicItem('Nhac cua Luan', 'Julylun', '#', document.getElementById('music-col-explore-suggestion'))
        ExploreComponent.createMusicItem('Nhac cua Ly', 'Julylun', '#', document.getElementById('music-col-newly-release-song'))
    }

}
const onStart = () => {

    generateSuggestionSongsComponent()
    // example()
}


onStart()