import * as messaging from "messaging";
import { weatherWakeTime } from "../common/constants";
import { toFahrenheit } from "../common/util.js";
import { changeBackgroundImg } from "./background";

let handleCallback;
let currentCondition = "cloudy";
let lastCondition = "rainy";
let data;

export function initialize(callback) {
    handleCallback = callback;
    messaging.peerSocket.addEventListener("open", (evt) => {
        console.log(`Ready to send or recieve messages`); 
        fetchWeather();  
    });

    messaging.peerSocket.addEventListener("message", (evt) => {
        if (evt.data) {
            console.log(`Message received`);
            data = evt.data;
            currentCondition = data.condition;
            toFahrenheit(data);

            changeBackgroundImg(data);
            updateData();
        }
    });
    
    
    setInterval(fetchWeather, weatherWakeTime);
}

function fetchWeather() {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        console.log(`Requesting weather`);
        messaging.peerSocket.send({
            command: "weather"
        });
    } else {
        console.error(`Error: messager not open`);
    }
}

function updateData() {
    if (typeof handleCallback === "function" && dataExists()) {
        handleCallback(data);
    }
}

function dataExists() {
    if (data === undefined) {
        console.warn(`No data exists`);
        return false;
    }

    return true;
}