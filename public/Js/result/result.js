
//Songs
const Songs = [
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
];

const favoriteSongsContainer = document.getElementById('js_Songs');

Songs.forEach(song => {
    const songRow = document.createElement('div');
    songRow.classList.add('grid', 'grid-cols-3', 'gap-3', 'border-y-1.5', 'border-[#1D1529]', 'hover:bg-[#2F2739]', 'hover:rounded-md');

    songRow.innerHTML = `
        <div>
            <button class="ml-5 w-full h-full">
                <div class="_music-item group font-Nunito flex flex-row items-center w-full">
                    <img class="bg-[#AAA] size-20 mt-4 mb-4 rounded-lg md:mt-2 md:mb-2 md:size-14 md:rounded-sm" src="${song.image}" alt="${song.song}">
                    <div class="ml-3 flex flex-col">
                        <p class="font-semibold text-sm text-[#FFF] group-hover:text-[#b66dde] md:text-lg">${song.song}</p>
                        <p class="font-semibold text-sm text-[#888888] md:text-sm hover:underline text-left">${song.artist}</p>
                    </div>
                </div>
            </button>
        </div>
        <div class="flex items-center justify-center h-full">
            <a href="#" class="text-center text-[#fff] text-[15px] hover:text-[#b66dde] hover:underline">${song.album}</a>
        </div>
        <div class="flex items-center justify-end h-full mr-2">
            <h2 class="text-right font-normal text-sm text-[#888888]">${song.time}</h2>
        </div>
    `;

    favoriteSongsContainer.appendChild(songRow);
});

//ALBUMS
const myAlbums = [
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
    
];

const albumsContainer = document.getElementById('js_Albums');

myAlbums.forEach(album => {
    const albumButton = document.createElement('button');
    albumButton.classList.add('relative', 'w-full', 'h-[250px]', 'overflow-hidden', 'rounded-2xl', 'group');
    
    albumButton.innerHTML = `
        <div class="absolute inset-0">
            <img
                class="w-full h-full object-cover rounded-2xl bg-[#FFF] transition-transform duration-300 ease-in-out group-hover:scale-110"
                src="${album.image}"
                alt="${album.alt}">
        </div>
        
        <div class="absolute inset-0 flex font-Nunito justify-center items-center bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 ease-in-out pointer-events-none">
            <h1 class="text-[#fff] font-bold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">${album.title}</h1>
        </div>
    `;

    albumsContainer.appendChild(albumButton);
});

// Hàm tạo nội dung cho mỗi mục
function createCard(imageSrc, name) {
    return `
        <div class="group relative overflow-visible">
            <button class="relative overflow-hidden rounded-full">
                <img
                    class="object-cover aspect-square transition-transform duration-300 group-hover:scale-110"
                    src="${imageSrc}"
                    alt="${name}"
                >
                <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
            <h1 class="font-Nunito text-center text-[#fff] mt-[10px] group-hover:text-[#A35DE1]">${name}</h1>
        </div>
    `;
}



// ARTISTS
const artists = [
    { img: '/Assets/image/top100/top100EDMSong.jpg', name: 'Hoàng Dũng' },
    { img: '/Assets/image/top100/top100EDMSong.jpg', name: 'Artist 2' },
    { img: '/Assets/image/top100/top100EDMSong.jpg', name: 'Artist 3' },
    { img: '/Assets/image/top100/top100EDMSong.jpg', name: 'Artist 4' },
    { img: '/Assets/image/top100/top100EDMSong.jpg', name: 'Artist 5' }
];

const artistContainer = document.getElementById('js_Artist');

artists.forEach(artist => {
    const group = document.createElement('div');
    group.className = 'group relative overflow-visible';

    const button = document.createElement('button');
    button.className = 'relative overflow-hidden rounded-full';

    const img = document.createElement('img');
    img.className = 'object-cover aspect-square transition-transform duration-300 group-hover:scale-110';
    img.src = artist.img;
    img.alt = artist.name;
    button.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity';
    button.appendChild(overlay);

    group.appendChild(button);

    const title = document.createElement('h1');
    title.className = 'font-Nunito text-center text-[#fff] mt-[10px] group-hover:text-[#A35DE1]';
    title.textContent = artist.name;
    group.appendChild(title);

    artistContainer.appendChild(group);
});
