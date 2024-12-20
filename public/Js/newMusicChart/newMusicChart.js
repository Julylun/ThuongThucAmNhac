const songs = [
    { rank: 1, title: 'Em Đã Thương Người Ta Hơn Anh', artist: 'Quang Hùng MasterD', time: '02:28', imgSrc: 'https://media.wired.com/photos/5926df59f3e2356fd800ab80/master/w_2560%2Cc_limit/GettyImages-543338600-S2.jpg' },
    { rank: 2, title: 'Hẹn Em Ở Lần Yêu Thứ 2', artist: 'Quang Hùng MasterD', time: '02:28', imgSrc: '#' },
    { rank: 3, title: 'Hai người đau, bốn người hạnh phúc', artist: 'Quang Hùng MasterD', time: '02:28', imgSrc: '#' },
    { rank: 4, title: 'Chúng Ta Của Hiện Tại ', artist: 'Sơn Tùng M-TP', time: '02:28', imgSrc: '#' },
    { rank: 5, title: 'Đừng khóc một mình', artist: 'Quang Hùng MasterD', time: '02:28', imgSrc: '#' },
    { rank: 6, title: 'Đừng khóc một mình', artist: 'Quang Hùng MasterD', time: '02:28', imgSrc: '#' },
    { rank: 7, title: 'Đừng khóc một mình', artist: 'Quang Hùng MasterD', time: '02:28', imgSrc: '#' },
    { rank: 8, title: 'Đừng khóc một mình', artist: 'Quang Hùng MasterD', time: '02:28', imgSrc: '#' },
    { rank: 9, title: 'Đừng khóc một mình', artist: 'Quang Hùng MasterD', time: '02:28', imgSrc: '#' },
    { rank: 10, title: 'Đừng khóc một mình', artist: 'Quang Hùng MasterD', time: '02:28', imgSrc: '#' },
    { rank: 11, title: 'Đừng khóc một mình', artist: 'Quang Hùng MasterD', time: '02:28', imgSrc: '#' },
    { rank: 20, title: 'Đừng khóc một mình', artist: 'Quang Hùng MasterD', time: '02:28', imgSrc: '#' },
    { rank: 56, title: 'Đừng khóc một mình', artist: 'Quang Hùng MasterD', time: '02:28', imgSrc: '#' }
  ];
  
  function createSong(song) {
   
    const songDiv = document.createElement('div');
    songDiv.classList.add('font-Nunito', 'flex', 'items-center', 'bg-transparent', 'hover:bg-[#2f2739]', 'hover:rounded-md', 'max-w-[90%]', 'mx-auto');
    
    const rankDiv = document.createElement('div');
    const rank = document.createElement('h1');
    rank.classList.add('font-Nunito', 'font-bold', 'text-4xl', 'pl-4');

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

    rank.textContent = song.rank;
    rankDiv.appendChild(rank);
        
    const minusSign = document.createElement('h1');
    minusSign.classList.add('font-Nunito', 'font-normal', 'text-[#888888]', 'text-[50px]', 'ml-5');
    minusSign.textContent = '-';
    
    const button = document.createElement('button');
    button.classList.add('ml-5', 'w-full', 'h-full');
    
    const musicItemDiv = document.createElement('div');
    musicItemDiv.classList.add('_music-item', 'group', 'font-Nunito', 'flex', 'flex-row', 'items-center', 'w-full');
    
    const img = document.createElement('img');
    img.classList.add('bg-[#AAA]', 'size-10', 'mt-4', 'mb-4', 'rounded-lg', 'md:mt-2', 'md:mb-2', 'md:size-14', 'md:rounded-sm');
    img.src = song.imgSrc;
    
    const textDiv = document.createElement('div');
    textDiv.classList.add('flex', 'flex-col', 'ml-4', 'md:ml-5');
    
    const title = document.createElement('p');
    title.classList.add('font-semibold', 'text-sm', 'text-[#FFF]', 'group-hover:text-[#b66dde]', 'md:text-base');
    title.textContent = song.title;
    
    const artist = document.createElement('p');
    artist.classList.add('font-semibold', 'text-sm', 'text-[#888888]', 'md:text-md', 'hover:underline', 'text-left');
    artist.textContent = song.artist;
    
    textDiv.appendChild(title);
    textDiv.appendChild(artist);
    musicItemDiv.appendChild(img);
    musicItemDiv.appendChild(textDiv);
    
    button.appendChild(musicItemDiv);
    
    const time = document.createElement('h2');
    time.classList.add('pr-[50px]', 'text-[#888888]');
    time.textContent = song.time;
  
    songDiv.appendChild(rankDiv);
    songDiv.appendChild(minusSign);
    songDiv.appendChild(button);
    songDiv.appendChild(time);
    
    return songDiv;
  }
  
  const container = document.getElementById('js_newMusicChart');
  songs.forEach(song => {
    container.appendChild(createSong(song));
  });
  