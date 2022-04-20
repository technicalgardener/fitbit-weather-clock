import * as messaging from "messaging";
import * as util from "../common/utils";

let handleCallback;
let data;

// Fetch Weather
// requests updated weather data from the companion device
function fetchWeather() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    console.log("Requesting weather");
    messaging.peerSocket.send({
      command: "weather"
    });
  }
}

// Initialize Weather
// Opens a message listener and calls the function
// to request weather data. Once message is received
// data's units are converted and the function call
// is made to return output to device screen
export function initialize(callback) {
  handleCallback = callback;
  messaging.peerSocket.addEventListener("open", (evt) => {
    console.log("Ready to send or receive messages");
    fetchWeather();
  });
  
  messaging.peerSocket.addEventListener("message", (evt) => {
    if (evt.data) {
      console.log("MESSAGE received");
      data = evt.data;
      util.toFahrenheit(data);
      
      updatedData();
    }
  });
  
  messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
  });
  
  // Data Exists
  // checks to see if valid data has been recieved
  function existsData() {
    if (data === undefined) {
      console.warn("No data found.");
      return false;
    }
    return true;
  }

  // Updated Data
  // if data exists then it hands the updated to the callback function
  function updatedData() {
    if (typeof handleCallback === "function" && existsData()) {
      console.log("Sending updated data to display")
     handleCallback(data);
    }
  }
  
  setInterval(fetchWeather, 30 * 1000 * 60);
}