import * as SongService from '../service/songService/songServices.js';
import * as ExploreComponent from '../../Components/explore/exploreComponent.js';

export {
    generateSuggestionSongsComponent,
    getSuggestionSong,
}


const getSuggestionSong = async () => {
  let ressponseData = await SongService.getSuggestionSong()
  return ressponseData.data;
}
const generateSuggestionSongsComponent = async () => {
  let suggestionSongPromise = await SongService.getSuggestionSong();
  if (suggestionSongPromise.data != null) {
    ExploreComponent.renderMusicItem(
      suggestionSongPromise.data,
      document.getElementById('music-col-explore-suggestion'),
    )
    
    musicPlayer.addSongsToQueue(suggestionSongPromise.data);
    console.log('Loaded music- - V');
    console.log(musicPlayer.nextQueue);
    musicPlayer.setDefaultSong();
  }
};

















const example = async () => {
  ExploreComponent.createMusicSector(
    'Newly release song',
    'newly-release-song',
  );
  for (let index = 0; index <= 20; index += 1) {
    ExploreComponent.createMusicItem(
      'Nhac cua Luan',
      'Julylun',
      '#',
      document.getElementById('music-col-explore-suggestion'),
    );
    ExploreComponent.createMusicItem(
      'Nhac cua Ly',
      'Julylun',
      '#',
      document.getElementById('music-col-newly-release-song'),
    );
  }
};


