class FakeData {
    static Library = new Object({
        // LIBRARY -> My FAV Songs -> MY ALBUMS -> My PLAYLIST
        libraries: [
            { name: "Jack J97", imgSrc: "../../Assets/image/library/j97.jpg", id: "button-1" },
            { name: "Jack J97", imgSrc: "../../Assets/image/library/j97.jpg", id: "button-2" },
            { name: "Jack J97", imgSrc: "../../Assets/image/library/j97.jpg", id: "button-3" },
            { name: "Jack J97", imgSrc: "../../Assets/image/library/j97.jpg", id: "button-4" },
            { name: "Jack J97", imgSrc: "../../Assets/image/library/j97.jpg", id: "button-4" },
            { name: "Jack J97", imgSrc: "../../Assets/image/library/j97.jpg", id: "button-4" },
            { name: "See All", imgSrc: "", id: "js_seeAll" }
        ],
        myFavoriteSongs: [
            {
                song: 'Đừng khóc một mình',
                artist: 'Quang Hùng MasterD',
                album: 'abc',
                time: '02:28',
                image: '../../Assets/image/topic&genre/news.jpg',
            },
            {
                song: 'Another Song',
                artist: 'Artist Name',
                album: 'Album Name',
                time: '03:00',
                image: '../../Assets/image/topic&genre/news.jpg',
            },
            {
                song: 'Another Song',
                artist: 'Artist Name',
                album: 'Album Name',
                time: '03:00',
                image: '../../Assets/image/topic&genre/news.jpg',
            },
            {
                song: 'Another Song',
                artist: 'Artist Name',
                album: 'Album Name',
                time: '03:00',
                image: '../../Assets/image/topic&genre/news.jpg',
            },
            {
                song: 'Another Song',
                artist: 'Artist Name',
                album: 'Album Name',
                time: '03:00',
                image: '../../Assets/image/topic&genre/news.jpg',
            }
        ],

        
        myAlbums: [
            {
                title: 'HIEU THU HAI',
                image: '../../Assets/image/library/HTHai.png',
                alt: 'News',
            },
            {
                title: 'Another Album',
                image: '../../Assets/image/library/HTHai.png',
                alt: 'Another News',
            },
            {
                title: 'Another Album',
                image: '../../Assets/image/library/HTHai.png',
                alt: 'Another News',
            }

        ],
        myPlaylists: [
            { name: "Tên playlist", imgSrc: "../../Assets/image/topic&genre/news.jpg", id: "button-playlist-1" },
            { name: "Tên playlist 2", imgSrc: "../../Assets/image/topic&genre/news.jpg", id: "button-playlist-2" },
            { name: "Tên playlist 3", imgSrc: "../../Assets/image/topic&genre/news.jpg", id: "button-playlist-3" },
        ]
    });

}


export default FakeData;