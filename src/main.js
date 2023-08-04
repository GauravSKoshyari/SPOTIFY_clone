import './style.css';
const APP_URL = import.meta.env.VITE_APP_URL;

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("accessToken")) {         // means we are logged in 
    window.location.href = `${APP_URL}/dashboard/dashboard.html`;
  } else {           //not logged in 
    window.location.href = `${APP_URL}/login/login.html`;
  }
})

// if u go to localhost:3000 ->  if u have access token(means logged in) : dashboard.html
                                  // otherwise  : login.html
