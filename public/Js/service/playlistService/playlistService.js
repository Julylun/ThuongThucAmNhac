import ApiService from "../../api/apiService.js";

export { getAllPlaylist };

export { getSongsByPlaylistId };

const getAllPlaylist = async () => {
  try {
    const apiBase = (await ApiService.getApiBase()) + "playlist";

    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoibGVlbHlfMjgwMiIsImlhdCI6MTczNDg1MTA3NCwiZXhwIjoxNzM2MTQ3MDc0fQ.Wk-5NY6yDwEfor56iOSD-LPNojI0Gc6a3bNi5JGf8Rk";
    const response = await fetch(apiBase, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return null;
  }
};

const getSongsByPlaylistId = async (playlistId) => {
  try {
      const apiBase = (await ApiService.getApiBase()) + `playlist/get-songs/${playlistId}`;
      const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoibGVlbHlfMjgwMiIsImlhdCI6MTczNDg1MTA3NCwiZXhwIjoxNzM2MTQ3MDc0fQ.Wk-5NY6yDwEfor56iOSD-LPNojI0Gc6a3bNi5JGf8Rk";
      
      const response = await fetch(apiBase, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result.data || [];
  } catch (error) {
      console.error(`Error fetching songs for playlist ${playlistId}:`, error);
      return [];
  }
};
