export { getSuggestionSong };

import ApiService from '../../api/apiService.js';

const getSuggestionSong = async (type) => {
  let apiBase = (await ApiService.getApiBase()) + 'song/suggest' + (type ? `?type=${type}` : '');

  let responseData = fetch(apiBase, { method: 'GET' })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return responseData;
};
