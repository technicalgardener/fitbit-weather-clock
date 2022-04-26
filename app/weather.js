import * as messaging from "messaging";
import { weatherWakeTime } from "../common/constants";
import { toFahrenheit } from "../common/util.js";

let handleCallback;
let data;

// Initialize Weather
// This function opens the messenger service that will ask the companion device for
// the most current weather data for the devices gps location. Once a message response is
// received from the companion the data is returned to the callback parameter.
export function initialize(callback) {
    handleCallback = callback;
    messaging.peerSocket.addEventListener("open", (evt) => {
        fetchWeather();  
    });

    messaging.peerSocket.addEventListener("message", (evt) => {
        if (evt.data) {
            data = evt.data;

            toFahrenheit(data);
            updateData();
        }
    });
    
    
    setInterval(fetchWeather, weatherWakeTime);
}

// Fetch Weather
// Sends the command to the companion to request updated weather data.
function fetchWeather() {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send({
            command: "weather"
        });
    } 
    
    else {
        console.error(`Error: messager not open`);
    }
}

// Update Data
// Returns the weather data received from the companion to the callback function
// in initialize
function updateData() {
    if (typeof handleCallback === "function" && dataExists()) {
        handleCallback(data);
    }
}

// Data Exists
function dataExists() {
    if (data === undefined) {
        console.warn(`No data exists`);
        return false;
    }

    return true;
}