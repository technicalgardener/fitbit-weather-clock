console.log("App code started");

import document from "document";
import * as clock from "./clock";
import * as weather from "./weather";
import * as heartRate from "./heart";

const time = document.getElementById("time");
const details = document.getElementById("details");
const heart = document.getElementById("heart");
const img = document.getElementById("img")

// Initialize Clock
// Calls clock program and displays its return
// as output to the device screen
clock.initialize("minutes", data => {
  //curTime = data;
  // clock ticked
  console.error(JSON.stringify(data.time));
  time.text = data.time;
});


// Initialize Weather
// Calls weather program and displays
// its temperature value as output to the device screen
// This also changes the background image based on time of day
//
// sunset/sunrise time is given in unix time from api, so it
// is simpler to compare against the current time given at the time
// of the query, which is also in unix time, than from the device time
weather.initialize(data => {
  //curWeather = data;
  details.text = `${data.temp}\u00B0 ${data.unit}`;
  console.log(JSON.stringify(data.curTime));
  console.log(JSON.stringify(data.sunset));
  
  // sunset golden hour
  if ((data.curTime > (data.sunset - 2700)) && (data.curTime < (data.sunset + 2700))) {
    img.href = "images/sunset.jpg";
  }
  
  // sunrise golden hour
  if ((data.curTime > (data.sunrise - 2700)) && (data.curTime < (data.sunrise + 2700))) {
    img.href = "images/dawn.jpg";
  }
  
  // after sunset / before sunrise
  if ((((data.sunset + 2700) - data.curTime) < 0) || ((data.sunrise - 2700) - data.curTime > 0) ) {
    img.href = "images/night-clear.jpg";
  }
  clock.tick();
});

// Initialize Heart Rate
// calls Heart Rate program and displays 
// its return as output to the device screen
heartRate.initialize(data => {
  heart.text = data.hr;
});