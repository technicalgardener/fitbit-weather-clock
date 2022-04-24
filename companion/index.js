import * as messaging from "messaging";
import { geolocation } from "geolocation";
import { mapCode } from "../common/util";

const apiKey = "";
const endpoint = "https://api.openweathermap.org/data/2.5/weather?";

let latitude;
let longitude;

let ForecastURL;

let handleCallback;

function queryLocation(callback) {
    handleCallback = callback;
    console.log("querying Location");
    geolocation.getCurrentPosition(function(position) {
        console.log("location: " + position.coords.latitude + ", " + position.coords.longitude);
        latitude  = position.coords.latitude;
        longitude = position.coords.longitude;
        handleCallback();
    });
}

function fetchWeatherData() {
    ForecastURL = endpoint + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    queryWeather(ForecastURL);
}

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
                conditionString: data.weather[0].main,
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

function returnWeatherData(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    } else {
        console.error(`Error: Connection is not open`);
    }
}

function locationSuccess(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
}

function locationError(err) {
    console.error(`Location Error: ${err.code}: ${err.message}`);
}

messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt.data && evt.data.command === "weather") {
        queryLocation(fetchWeatherData);
    }
});

messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code}: ${err.message}`);
})