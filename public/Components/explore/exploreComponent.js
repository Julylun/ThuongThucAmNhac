import { createElement } from "../common/component.js";

export {
    createMusicItem,
    createMusicSector
}

const createMusicSector = (sectorName, sectorId) => {
    const explorerSuggestions = createElement('div', ['explorer__suggestions', 'ml-10', 'mt-5', 'flex', 'flex-col', 'w-full', 'overflow-y-scroll'],document.getElementById('content-page__explore'),{},sectorId);

    const firstDiv = createElement('div', ['w-full', 'min-w-96', 'flex', 'flex-row', 'justify-between', 'items-center'], explorerSuggestions);

    const secondDiv = createElement('div', ['w-fit', 'h-full', 'mr-4'], firstDiv);
    createElement('p', ['hidden', 'text-[#817D88]', 'font-semibold', 'text-xs', 'md:text-sm'], secondDiv, null, null).innerText = "Start listen from a song";
    createElement('p', ['text-[#FFF]', 'font-bold', 'text-xl', 'md:text-2xl'], secondDiv, null, null).innerText = sectorName;

    const thirdDiv = createElement('div', ['w-full', 'min-w-96'], explorerSuggestions);
    const musicColDiv = createElement('div', ['_music-col', 'columns-1', 'md:columns-2', 'xl:columns-3', 'mt-5', 'mr-20'], thirdDiv, {},'music-col-'+sectorId);

    return explorerSuggestions
}



const createMusicItem = (songName, songAuthor, imageSource, parentElement) => {
    const button = createElement('button', ['w-full'], parentElement);
    const musicItem = createElement(
        'div',
        ['_music-item', 'group', 'font-Nunito', 'flex', 'flex-row', 'items-center', 'w-full'],
        button
    );
    createElement(
        'img', ['bg-[#AAA]', 'size-20', 'mt-4', 'mb-4', 'rounded-lg', 'group-hover:size-24', 'group-hover:mt-2', 'group-hover:mb-2', 'md:size-14', 'md:group-hover:size-16', 'md:mt-3', 'md:mb-3', 'md:group-hover:mt-2', 'md:group-hover:mb-2', 'md:rounded-sm'], musicItem, { src: imageSource }
    );
    const textContainer = createElement(
        'div', ['ml-3', 'flex', 'flex-col'], musicItem
    );
    createElement(
        'p', ['font-semibold', 'text-xl', 'text-[#FFF]', 'group-hover:text-[#FDC018]', 'md:text-base'], textContainer, { innerHTML: songName }
    );
    createElement(
        'p', ['font-semibold', 'text-sm', 'text-[#888888]', 'text-left', 'group-hover:text-[#D3AA71]', 'md:text-sm'], textContainer, { innerHTML: songAuthor }
    );

    return button

    // <button class="w-full"> <div class="_music-item group font-Nunito flex flex-row items-center w-full"> <img class="bg-[#AAA] size-20 mt-4 mb-4 rounded-lg group-hover:size-24 group-hover:mt-2 group-hover:mb-2 md:size-14 md:group-hover:size-16 md:mt-3 md:mb-3 md:group-hover:mt-2 md:group-hover:mb-2 md:rounded-sm " src="#"> <div class="ml-3 flex flex-col"> <p class="font-semibold text-xl text-[#FFF] group-hover:text-[#FDC018] md:text-base"> Ngua o</p> <p class="font-semibold text-sm text-[#888888] group-hover:text-[#D3AA71] md:text-sm"> JulyLun</p> </div> </div> </button>

}