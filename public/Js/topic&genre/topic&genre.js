import { setCurrentPage } from '../../Components/loader.js';

document.addEventListener('DOMContentLoaded', () => {
    const top100Button = document.getElementById('js_top100-button');
    if (top100Button) {
        top100Button.addEventListener('click', () => {
            setCurrentPage(PAGELOAD_TOP_100);
            window.history.pushState(null, null, '/top100');
        });
    }

    const newMusicChartButton = document.getElementById('js_newmusicChart-button');
    if (newMusicChartButton) {
        newMusicChartButton.addEventListener('click', () => {
            setCurrentPage(PAGELOAD_NEW_MUSIC_CHART);
            window.history.pushState(null, null, '/new_music_chart');
        });
    }
});