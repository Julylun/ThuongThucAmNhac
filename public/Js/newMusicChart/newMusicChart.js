import { renderSong } from "../../Components/newMusicChart/newMusicChart.component.js";

import * as NewMusicChartUtils from './newMusicChart.utils.js'

// const Url = "http://localhost:27075/api/v1/song/suggest";

// const onStart = async () => {
//     renderSong(await NewMusicChartUtils.getSongData());
// }

const onStart = async () => {
    const songs = await NewMusicChartUtils.getSongData();

    const rankedSongs = songs.sort((a, b) => b.listenTimes - a.listenTimes);

    rankedSongs.forEach((song, index) => {
        song.songId = index + 1;
    });

    renderSong(rankedSongs);
};
await onStart();
