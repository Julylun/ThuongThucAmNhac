import * as ExploreComponent from '../../Components/explore/exploreComponent.js'


const example = () => {
    ExploreComponent.createMusicSector('Newly release song', 'newly-release-song')

    for (let index = 0; index <= 20; index += 1) {
        ExploreComponent.createMusicItem('Nhac cua Luan', 'Julylun', '#', document.getElementById('music-col-explore-suggestion'))
        ExploreComponent.createMusicItem('Nhac cua Ly', 'Julylun', '#', document.getElementById('music-col-newly-release-song'))
    }

}
const onStart = () => {
    example()
}


onStart()