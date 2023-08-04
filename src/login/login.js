import { ACCESS_TOKEN, EXPIRES_IN, TOKEN_TYPE } from "../common";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI; //http://localhost:3000/login/login.html
const APP_URL = import.meta.env.VITE_APP_URL;       //    http://localhost:3000
const scopes = "user-top-read user-follow-read playlist-read-private user-library-read";
// scopes - https://developer.spotify.com/documentation/general/guides/authorization/scopes/
// Scopes provide Spotify users using third-party apps the confidence that only the information they choose to share will be shared, and nothing more

const authorizeUser = () => {

    // https://developer.spotify.com/documentation/general/guides/authorization/implicit-grant/ 
    // response_type = token ; since we need access token 
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${scopes}&show_dialog=true`;
    window.open(url, "login", "width=800,height=600");
    //login window will open(As a popup ) with given height and width 
}

document.addEventListener("DOMContentLoaded", () => {

    const loginButton = document.getElementById("login-to-spotify");
    loginButton.addEventListener("click", authorizeUser);

})


// doing something like "var setItemsInLocalStorage = ()=>{}""  is  not adding function to global  , but to Module scope ; check  Sources tab 
//   this might be due to <script type="module" src="login.js"></script>
window.setItemsInLocalStorage = ({ accessToken, tokenType, expiresIn }) => {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_TYPE, tokenType);
    localStorage.setItem(EXPIRES_IN, (Date.now() + (expiresIn * 1000)));       // expiresIn is in sec 
    // Date.now() is current time in ms  , *1000 is done to convert to ms
    // expiresIn is 3600s or 1hr(check hash below) , so we are adding 1 hr to our current time as expiry time 

    window.location.href = APP_URL;         // once logged in , we are going to  APP_URL  

}

window.addEventListener("load", () => {

    console.log("window loaded")

    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {        // if accessToken is already there -> redirecting to dashboard 
        window.location.href = `${APP_URL}/dashboard/dashboard.html`;
        //  when its location will change to dashboard  url  , its window object  will no longer  have 'load' eventlistener  and setItemsInLocalStorage function -> u won't see all those console.log's
    }

    // https://www.w3schools.com/jsref/prop_win_opener.asp
    //     If window xxx opens window yyy:
    // yyy.opener returns xxx.
    // yyy.opener.close() closes xxx.

    // const myWindow = window.open("", "", "width=300,height=300");
    // myWindow.opener.document.getElementById("demo").innerHTML = "HELLO!";
    // myWindow is new window opened  and myWindow.opener is window that opened

    // opener property returns a reference to the window that created the window.

    if (window.opener !== null && !window.opener.closed) {  //  these are true for popup 

        // focus() 
        // const myWindow = window.open("", "", "width=200, height=100"); myWindow.focus();
        // Open a new window and set focus to it:

        // when u login in popup , u will get access_token ,etc in ur url 

        // window.focus();
        if (window.location.href.includes("error")) {
            window.close();
        }

        // window.location.hash   -  https://www.w3schools.com/jsref/prop_loc_hash.asp
        // location.hash property sets or returns the anchor part of a URL, including the hash sign (#).
        // if window  url - '/js/js_strings.asp#part2'   ,  hash ->  #part2
        // set -> location.hash = "part5";


        // when u login in popup , u will get access_token ,etc in ur url 

        const { hash } = window.location;     // console.log(window.location) - u will understand

        // hash 
        // #access_token=BQBD0Wd4kfkC-JMkzXrtetDaXvT6Yqj7WhqQ1OocqhHB1rCEhb4qTZ7d04dSg-RqwYgKETRIxpVUCkLbTeZLNccrCdmOvxRIejuSEHPI67JyEyF2FnoO-Q7pyuSmtwJJj5LdRJBbZJ70HcNTwA6UwOHk4Sa6WH69_Yh5kjba9RdH2ffdchdtHPokBFd9JkvUEJzBihBQnwCxdY6x7pCxO3TtPO3HxdhzDxOpCw&token_type=Bearer&expires_in=3600

        const searchParams = new URLSearchParams(hash);
        const accessToken = searchParams.get("#access_token");

        const tokenType = searchParams.get("token_type");
        const expiresIn = searchParams.get("expires_in");
        if (accessToken) {
            window.close();        // close popup
            // comment this   -> popup will not close 
            // check popup's console
            //  LOADED 
            // LOADED AFTER FOCUS
            //#access_token=BQBD0Wd4kfkC-JMkzXrtetDaXvT6Yqj7WhqQ1OocqhHB1rCEhb4qTZ7d04dSg-RqwYgKETRIxpVUCkLbTeZLNccrCdmOvxRIejuSEHPI67JyEyF2FnoO-Q7pyuSmtwJJj5LdRJBbZJ70HcNTwA6UwOHk4Sa6WH69_Yh5kjba9RdH2ffdchdtHPokBFd9JkvUEJzBihBQnwCxdY6x7pCxO3TtPO3HxdhzDxOpCw&token_type=Bearer&expires_in=3600
            // because - popup's url is http://localhost:3000/login/login.html , so  'load' eventlistener will be executed

            // and main page would be  redirected to dashboard due to line 36(window.location.href = APP_URL; this would make page 'load' , therbey executing line 44 if statement ) 

            window.opener.setItemsInLocalStorage({ accessToken, tokenType, expiresIn });
        } else {
            window.close();
        }
    }
})