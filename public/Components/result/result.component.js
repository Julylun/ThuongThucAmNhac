export {
    renderSongRows,
    renderAlbumButtons,
    renderArtistButtons
}
const favoriteSongsContainer = document.getElementById('js_Songs');
const albumsContainer = document.getElementById('js_Albums');
const artistContainer = document.getElementById('js_Artist');

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



const createSongRow = (song) => {
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
}

const createAlbumButton = (albumData) => {
    const albumButton = document.createElement('button');
    albumButton.classList.add('relative', 'w-full', 'h-[250px]', 'overflow-hidden', 'rounded-2xl', 'group');

    albumButton.innerHTML = `
        <div class="absolute inset-0">
            <img
                class="w-full h-full object-cover rounded-2xl bg-[#FFF] transition-transform duration-300 ease-in-out group-hover:scale-110"
                src="${albumData.image}"
                alt="${albumData.alt}">
        </div>
        
        <div class="absolute inset-0 flex font-Nunito justify-center items-center bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 ease-in-out pointer-events-none">
            <h1 class="text-[#fff] font-bold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">${albumData.title}</h1>
        </div>
    `;

    albumsContainer.appendChild(albumButton);

}

createArtistButton = (artistData) => {
    const group = document.createElement('div');
    group.className = 'group relative overflow-visible';

    const button = document.createElement('button');
    button.className = 'relative overflow-hidden rounded-full';

    const img = document.createElement('img');
    img.className = 'object-cover aspect-square transition-transform duration-300 group-hover:scale-110';
    img.src = artistData.img;
    img.alt = artistData.name;
    button.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity';
    button.appendChild(overlay);

    group.appendChild(button);

    const title = document.createElement('h1');
    title.className = 'font-Nunito text-center text-[#fff] mt-[10px] group-hover:text-[#A35DE1]';
    title.textContent = artistData.name;
    group.appendChild(title);

    artistContainer.appendChild(group);
}


const renderSongRows = (songs) => {
    songs.forEach((song) => createSongRow(song));
}

const renderAlbumButtons = (albums) => {
    albums.forEach((album) => createAlbumButton(album));
}

const renderArtistButtons = (artists) => {
    artists.forEach((artist) => createArtistButton(artist));
}