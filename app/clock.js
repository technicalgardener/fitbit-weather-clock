import clock from "clock";
import { preferences } from "user-settings";
import * as util from "../common/utils";

let handleCallback;

// Initialize Clock
// This function starts a service to grab the current device time.
// It will request updated time data according to the clock granularity
// by calling the tick function at the granularity's set interval
export function initialize(granularity, callback) {
  console.log("initializing clock");
  clock.granularity = granularity ? granularity : "minutes";
  handleCallback = callback;
  clock.addEventListener("tick", tick);
}


// Tick
// converts time to the preferred time format
// and returns the time to be displayed on device screen
export function tick(evt) {
  const today = evt ? evt.date : new Date();
  const mins = util.zeroPad(today.getMinutes());
  let hours = today.getHours();
  
  

  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }

  if (typeof handleCallback === "function") {
    handleCallback({ time: `${hours}:${mins}` });
  }
}