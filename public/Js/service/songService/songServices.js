export { getSuggestionSong };
export { getListenTimesofAllSongs };

import ApiService from '../../api/apiService.js';

const getSuggestionSong = async (type) => {
  let apiBase = (await ApiService.getApiBase()) + 'song/suggest' + (type ? `?type=${type}` : '');

  let responseData = await fetch(apiBase, { method: 'GET' })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return await responseData;
};
const getListenTimesofAllSongs = async () => {
  let apiBase = (await ApiService.getApiBase()) + 'song/suggest' + (type ? `?type=${type}` : '');

  let responseData = await fetch(apiBase, { method: 'GET' })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return await responseData;
}