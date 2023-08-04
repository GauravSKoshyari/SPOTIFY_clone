export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const TOKEN_TYPE = "TOKEN_TYPE";
export const EXPIRES_IN = "EXPIRES_IN";
export const NOW_PLAYING = "NOW_PLAYING";
export const LOADED_TRACKS = "LOADED_TRACKS";
const APP_URL = import.meta.env.VITE_APP_URL;
export const ENDPOINT = {
    // spotify for developers -> console 
    userInfo: "me",                             // in  Users Profile       - https://developer.spotify.com/console/get-current-user/
    featuredPlayist: "browse/featured-playlists?limit=5",                       // Browse
    toplists: "browse/categories/toplists/playlists?limit=10",                  // Browse
    playlist: "playlists",                        // Playlists
    userPlaylist: "me/playlists"              // Playlists
}

export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(EXPIRES_IN);
    localStorage.removeItem(TOKEN_TYPE);
    window.location.href = `${APP_URL}/login/login.html`;
}

export const getItemFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}
export const setItemInLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
}

export const SECTIONTYPE = {
    DASHBOARD: "DASHBOARD",
    PLAYLIST: "PLAYLIST"
}