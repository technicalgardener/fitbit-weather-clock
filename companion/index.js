import * as messaging from "messaging";
import { geolocation } from "geolocation";
import { preferences } from "user-settings";

var LATITUDE;
var LONGITUDE;
var APIKEY = "";
var ENDPOINT = "https://api.openweathermap.org/data/2.5/weather?";
var FORECASTURL;

var COUNT = 0;
var data;

// Fetch Weather Data
// collects information needed to make api call
// * this will include prefrences as well in future *
function fetchWeatherData() {
  FORECASTURL = ENDPOINT + "lat=" + LATITUDE + "&lon=" + LONGITUDE + "&appid=" + APIKEY;
  queryWeather(FORECASTURL);
}

// for future use 
//query preferences to get units for display
function queryPreferences(callback) {}

// Query Location
// records gps location and calls
function queryLocation(callback) {
  geolocation.getCurrentPosition(function(position) {
    LATITUDE  = position.coords.latitude;
    LONGITUDE = position.coords.longitude;
    callback();
  });
}

// Query Weather
// records weather data collected from api
// so it can be sent back to the device
function queryWeather(url) {
  fetch(url).then(function (response) {
    response.json().then(function (data) {
      let forecast = {
        temp:      data.main.temp,
        unit:      "K",
        pressure:  data.main.pressure,
        humidity:  data.main.humidity,
        condition: data.weather.main,
        windSpd:   data.wind.speed,
        windDir:   data.wind.deg,
        curTime:   data.dt,
        sunrise:   data.sys.sunrise,
        sunset:    data.sys.sunset
      }
      
      returnWeatherData(forecast);
    });
  }).catch(function (err) {
    console.error(`Error fetching weather data: ${err}`);
  });
}

// sends a message with the collected weather data
// from the companion (phone) to the device (wearable)
function returnWeatherData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  } else {
    console.error("Error: Connection is not open");
  }
}

// Listens for requests for weather
// when recieved its begins the calls to fetch weather data
// by calling queryLocation for gps,
// then fetchWeatherData after gps has been recorded
messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data && evt.data.command === "weather") {
    queryLocation(fetchWeatherData);
  }
});

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});