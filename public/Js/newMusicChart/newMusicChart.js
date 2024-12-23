import { renderSong } from "../../Components/newMusicChart/newMusicChart.component.js";

import * as NewMusicChartUtils from './newMusicChart.utils.js'

// const Url = "http://localhost:27075/api/v1/song/suggest";

const onStart = async () => {
    renderSong(await NewMusicChartUtils.getSongData());
}


await onStart();
