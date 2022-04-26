import * as messaging from "messaging";
import { geolocation } from "geolocation";
import { mapCode } from "../common/constants";

const apiKey = "";
const endpoint = "https://api.openweathermap.org/data/2.5/weather?";

let handleCallback;
let latitude;
let longitude;
let ForecastURL;

// Query Location
// Retrieves the current gps location from the companion and then
// returns it to the callback (fetchWeatherData).
function queryLocation(callback) {
    handleCallback = callback;
  
    geolocation.getCurrentPosition(function(position) {
        latitude  = position.coords.latitude;
        longitude = position.coords.longitude;
        handleCallback();
    });
}

// Fetch Weather Data
// Assembles the url needed for the api call and sends it to queryWeather to be processed.
function fetchWeatherData() {
    ForecastURL = endpoint + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    queryWeather(ForecastURL);
}

// Query Weather
// Fetches and records the most up-to-date weather information from  openweathermap.org to
// be sent back to the device.
function queryWeather(url) {
    fetch(url).then(function (response) {
        response.json().then(function (data) {
            let condition = data.weather[0].id;
            condition = mapCode[condition];

            let forecast = {
                temp:            data.main.temp,
                unit:            "K",
                condition:       data.weather[0].id,
                conditionCode:   condition,
                conditionString: data.weather[0].description,
                clouds:          data.clouds.all,
                currentTime:     data.dt,
                sunrise:         data.sys.sunrise,
                sunset:          data.sys.sunset
            };
          
            returnWeatherData(forecast);
        }).catch(function (err) {
          console.error(`Failed to load data: ${err}`);
        });
    }).catch(function (err) {
        console.error(`URL fetch error: ${err}`);
    });
}

// Return Weather Data
// Sends the weather data as a message back to the device.
function returnWeatherData(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    } 
    
    else {
        console.error(`Error: Connection is not open`);
    }
}

messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt.data && evt.data.command === "weather") {
        queryLocation(fetchWeatherData);
    }
});

messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code}: ${err.message}`);
})