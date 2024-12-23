export {
    renderButtons,
    renderPlaylistButtons,
    renderAlbums,
    renderFavoriteSongs
}

//FIXME:: We shouldnt set button id is song id because this can cause conflict with other id in the page. To fix this, you can use a prefix for the id like "song-<song_id>" or create a custom attribute like "data-song-id" to store the song id (You can use chat gpt to know the prefix of attribute "data-"
function createButton({ name, imgSrc, id }) {
    const container = document.createElement("div");
    container.className = "relative w-32 h-32 border rounded-full border-[#fff] overflow-visible mt-4 group";
    container.style.marginBottom = "15px";

    const button = document.createElement("button");
    button.id = `song-${id}`;
    button.className = "relative w-full h-full overflow-hidden rounded-full";
    button.setAttribute('data-song-id', id);

    if (imgSrc) {
        const img = document.createElement("img");
        img.className = "w-full h-full object-cover rounded-2xl bg-[#FFF] transition-transform duration-300 ease-in-out hover:scale-110";
        img.src = '../../Assets/image/library/HTHai.png';
        img.alt = name;
        button.appendChild(img);
    }

    container.appendChild(button);

    if (imgSrc) {
        const actionButton = document.createElement("button");
        actionButton.className = "absolute w-8 h-8 bottom-2 right-2 bg-[#fff] p-2 rounded-full shadow-md hover:bg-[#d8d7d7] z-20";
        actionButton.innerHTML = `
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.772 4.28c.56-.144 1.097.246 1.206.814.1.517-.263 1.004-.771 1.14A7 7 0 1 0 19 12.9c.009-.5.4-.945.895-1 .603-.067 1.112.371 1.106.977L21 13c0 .107-.002.213-.006.32a.898.898 0 0 1 0 .164l-.008.122a9 9 0 0 1-9.172 8.392A9 9 0 0 1 9.772 4.28z" fill="#000000" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.93 13.753a4.001 4.001 0 1 1-6.758-3.581A4 4 0 0 1 12 9c.75 0 1.3.16 2 .53 0 0 .15.09.25.17-.1-.35-.228-1.296-.25-1.7a58.75 58.75 0 0 1-.025-2.035V2.96c0-.52.432-.94.965-.94.103 0 .206.016.305.048l4.572 1.689c.446.145.597.23.745.353.148.122.258.27.33.446.073.176.108.342.108.801v1.16c0 .518-.443.94-.975.94a.987.987 0 0 1-.305-.049l-1.379-.447-.151-.05c-.437-.14-.618-.2-.788-.26a5.697 5.697 0 0 1-.514-.207 3.53 3.53 0 0 1-.213-.107c-.098-.05-.237-.124-.521-.263L16 6l.011 7c0 .255-.028.507-.082.753h.001z" fill="#000000" />
            </svg>
        `;
        container.appendChild(actionButton);
    }

    const label = document.createElement("p");
    label.className = "text-center text-[#fff] font-medium mt-3 group-hover:text-[#bd6fe7]";
    label.textContent = name;
    container.appendChild(label);

    if (name === "See All") {
        const seeAllButton = container.querySelector("button");
        seeAllButton.classList.add("flex", "justify-center", "items-center");
        seeAllButton.style.position = "relative";

        seeAllButton.innerHTML = `
            <svg class="w-8 h-8 fill-[#fff] group-hover:fill-[#bd6fe7]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="#fff" opacity="0"/>
                <path d="M10.22,9.28a.75.75,0,0,1,0-1.06l2.72-2.72H.75A.75.75,0,0,1,.75,4H12.938L10.22,1.281A.75.75,0,1,1,11.281.22l4,4a.749.749,0,0,1,0,1.06l-4,4a.75.75,0,0,1-1.061,0Z" transform="translate(4.25 7.25)" fill=""/>
            </svg>
        `;
    }

    return container;
}


//FIXME: Similar above
function createPlaylistButton({ playlistName }) {
    const button = document.createElement("button");
    button.className = "relative w-48 h-48 mr-5 overflow-hidden rounded-2xl mt-5";

    const imgContainer = document.createElement("div");
    imgContainer.className = "absolute inset-0";

    const img = document.createElement("img");
    img.className = "w-full h-full object-cover rounded-2xl bg-[#FFF] transition-transform duration-300 ease-in-out hover:scale-110";
    img.src = "../../Assets/image/library/playlist.png";
    img.alt = playlistName || "Playlist";
    imgContainer.appendChild(img);

    const textContainer = document.createElement("div");
    textContainer.className = "absolute inset-0 flex font-Nunito justify-center items-center pointer-events-none";

    const title = document.createElement("h1");
    title.className = "text-[#fff] font-bold text-xl";
    title.textContent = playlistName;
    textContainer.appendChild(title);

    button.appendChild(imgContainer);
    button.appendChild(textContainer);

    button.addEventListener("click", () => {
        console.log(`${playlistName} clicked!`);
    });

    return button;
}


/**
 * 
 * @param {LibraryButtonData[]} libraries - List of library buttons
 */
// function renderButtons(libraries) {
//     const librarySection = document.getElementById("js_library-button");
//     libraries.forEach((item) => {
//         const buttonElement = createButton(item);
//         librarySection.appendChild(buttonElement);
//     });
// }

function renderButtons(libraries) {
    const librarySection = document.getElementById("js_library-button");
    if (!librarySection) {
        console.error("Library section not found in DOM.");
        return;
    }

    const processedArtists = new Set(); // Track unique artists
    libraries.forEach((item) => {
        // Check if the artist is already processed
        if (!processedArtists.has(item.artistName)) {
            const buttonElement = createButton({
                name: item.artistName,
                imgSrc: item.imgSrc,
                id: item.id,
            });
            librarySection.appendChild(buttonElement);
            processedArtists.add(item.artistName); // Add artist to the processed set
        }
    });
}


/**
 * 
 * 
 * @param {PlaylistButtonData[]} myPlaylists - List of playlist buttons
 */
    // function renderPlaylistButtons(myPlaylists) {
    //     const container = document.getElementById("js_mylibrary-button");
    //     myPlaylists.forEach((playlist) => {
    //         const playlistButton = createPlaylistButton(playlist);
    //         container.appendChild(playlistButton);
    //     });
    // }

    function renderPlaylistButtons(myPlaylists) {
        const container = document.getElementById("js_mylibrary-button");
        if (myPlaylists && Array.isArray(myPlaylists)) {
            myPlaylists.forEach((playlist) => {
                const playlistButton = createPlaylistButton({
                    playlistName: playlist.playlistName,
                    imgSrc: "../../Assets/image/library/playlist.png"
                });
                container.appendChild(playlistButton);
            });
        } else {
            console.error('Invalid playlists data:', myPlaylists);
        }
    }
   

const renderAlbums = (myAlbums) => {
    const albumsContainer = document.getElementById('js_myAlbums');

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

}

function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const renderFavoriteSongs = (myFavoriteSongs) => {
    
    const favoriteSongsContainer = document.getElementById('js_myFavoriteSongs');
    
    myFavoriteSongs.forEach(song => {
        const songRow = document.createElement('div');
        songRow.classList.add('grid', 'grid-cols-3', 'gap-3', 'border-y-1.5', 'border-[#1D1529]', 'hover:bg-[#2F2739]', 'hover:rounded-md');
        const formattedTime = formatDuration(song.time);
        songRow.innerHTML = `
        <div>
            <button class="ml-5 w-full h-full">
                <div class="_music-item group font-Nunito flex flex-row items-center w-full">
                    <img class="bg-[#AAA] size-20 mt-4 mb-4 rounded-lg md:mt-2 md:mb-2 md:size-14 md:rounded-sm" src="${song.image}" alt="${song.song}">
                    <div class="ml-3 flex flex-col">
                        <p class="font-semibold text-sm text-[#FFF] group-hover:text-[#b66dde] md:text-base">${song.song}</p>
                        <p class="font-semibold text-sm text-[#888888] md:text-sm hover:underline text-left">${song.artist}</p>
                    </div>
                </div>
            </button>
        </div>
         ${song.album ? `
        <div class="flex items-center justify-center h-full">
            <a href="#" class="text-center text-[#fff] text-[15px] hover:text-[#b66dde] hover:underline">${song.album}</a>
        </div>
        ` : '<div></div>'}
        <div class="flex items-center justify-end h-full mr-2">
            <button>
                <svg class="w-[25px] h-[25px] mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#b66dde"/>
                </svg>
            </button>
            <h2 class="text-right font-normal text-sm text-[#888888]">${formattedTime}</h2>
        </div>
    `;

        favoriteSongsContainer.appendChild(songRow);
    });

}

