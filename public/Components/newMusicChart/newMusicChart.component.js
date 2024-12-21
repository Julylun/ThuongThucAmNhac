export {
    renderSong
}

const container = document.getElementById("js_newMusicChart");

function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function createSong(song) {
    const songDiv = document.createElement("div");
    songDiv.classList.add("font-Nunito", "flex", "items-center", "bg-transparent", "hover:bg-[#2f2739]", "hover:rounded-md", "max-w-[90%]", "mx-auto");

    const rankDiv = document.createElement("div");
    const rank = document.createElement("h1");
    rank.classList.add("font-Nunito", "font-bold", "text-4xl", "pl-4");

    if (song.rank < 10) {
        rank.classList.add('mr-5');
    }
    if (song.rank === 1) {
        rank.classList.add('text-outline1');
    } else if (song.rank === 2) {
        rank.classList.add('text-outline2');
    } else if (song.rank === 3) {
        rank.classList.add('text-outline3');
    } else {
        rank.classList.add('text-outline4');
    }
    rank.textContent = song.songId;
    rankDiv.appendChild(rank);

    const minusSign = document.createElement("h1");
    minusSign.classList.add("font-Nunito", "font-normal", "text-[#888888]", "text-[50px]", "ml-5");
    minusSign.textContent = "-";

    const button = document.createElement("button");
    button.classList.add("ml-5", "w-full", "h-full");

    const musicItemDiv = document.createElement("div");
    musicItemDiv.classList.add("_music-item", "group", "font-Nunito", "flex", "flex-row", "items-center", "w-full");

    const img = document.createElement("img");
    img.classList.add("bg-[#AAA]", "size-10", "mt-4", "mb-4", "rounded-lg", "md:mt-2", "md:mb-2", "md:size-14", "md:rounded-sm");
    img.src = `/public/uploads/songs/image/${song.songImage}`;
    img.alt = song.songName;

    const textDiv = document.createElement("div");
    textDiv.classList.add("flex", "flex-col", "ml-4", "md:ml-5");

    const title = document.createElement("p");
    title.classList.add("font-semibold", "text-sm", "text-[#FFF]", "group-hover:text-[#b66dde]", "md:text-base");
    title.textContent = song.songName;


    const artist = document.createElement("p");
    artist.classList.add("font-semibold", "text-sm", "text-[#888888]", "md:text-md", "hover:underline", "text-left");
    artist.textContent = song.songArtist.artistName;

    textDiv.appendChild(title);
    textDiv.appendChild(artist);
    musicItemDiv.appendChild(img);
    musicItemDiv.appendChild(textDiv);

    button.appendChild(musicItemDiv);

    const time = document.createElement("h2");
    time.classList.add("pr-[50px]", "text-[#888888]");
    time.textContent = formatDuration(song.songDuration);

    songDiv.appendChild(rankDiv);
    songDiv.appendChild(minusSign);

    songDiv.appendChild(button);
    songDiv.appendChild(time);

    return songDiv;
}


const renderSong = (songs) => {
    console.log(songs)
    songs.forEach((song) => {
        const songElement = createSong(song);
        container.appendChild(songElement);
    });
}