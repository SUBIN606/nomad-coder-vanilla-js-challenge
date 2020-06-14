import "../styles/weather.css";

const COORDS = "coords";
const API_KEY = "76a3e5ae28ff2a5f76a18c6cb0242bde";

const weatherContainer = document.querySelector(".js-weather-container");
const weatherIcon = weatherContainer.querySelector(".js-weather-icon");
const weatherSpan = weatherContainer.querySelector(".js-weather");

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
        const temp = data.main.temp;
        const weathers = data.weather[data.weather.length -1];
        weatherIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
        weatherSpan.innerHTML = `${temp}&#176;C ${weathers.main}`;
    })
}
function handleGeoSucc(position) {
    const latitude = position.coords.latitude;  // 경도  
    const longitude = position.coords.longitude;  // 위도
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoErr() {
    console.log("geo err");
}

function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        requestCoords();
    }else {
        const coords = JSON.parse(loadedCoords);
        getWeather(coords.latitude, coords.longitude);
    }
}

function init () {
    loadCoords();
}

init();