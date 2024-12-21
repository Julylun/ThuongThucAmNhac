import MusicPlayer from '../../Features/musicplayer/musicplayer.js';
import * as ExplorerUtils from './explore.utils.js'; 
import * as ExploreComponent from '../../Components/explore/exploreComponent.js';

const musicPlayer = MusicPlayer.getInstance();

const onStart = async () => {
  console.log('[explorer.js]: Explorer is loaded..');
  // console.log(await ExplorerUtils.generateSuggestionSongsComponent());
  ExploreComponent.createMusicSector('New release song', 'newly-release-song');
  ExploreComponent.renderMusicItem(
    await ExplorerUtils.getSuggestionSong(),
    document.getElementById('music-col-explore-suggestion'),
  )
  ExploreComponent.renderMusicItem(
    await ExplorerUtils.getSuggestionSong(),
    document.getElementById('music-col-newly-release-song'),
  )
};

await onStart();
