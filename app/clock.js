import clock from "clock";
import { preferences } from "user-settings";
import { zeroPad } from "../common/util";
import { days, months } from "../common/constants";

let handleCallback;
let date;
let day;
let month;
let dateNum;
let dateString;

// Initialize Clock
// This function starts the clock that is used to update the display.
// The clock is set to update every minute.
export function initialize(granularity, callback) {
    handleCallback = callback;
    clock.granularity = granularity ? granularity : "minutes";

    clock.addEventListener("tick", clockHandler);
}

// Fetch Date
function fetchDate() {
    date    = new Date();
    day     = days[date.getDay()];
    month   = months[date.getMonth()];
    dateNum = zeroPad(date.getDate());
    dateString = `${day}, ${month} ${dateNum}`;
}

// Clock Handler
// Handles the return of the current time and date to be displayed. The time is 
// updated every minute, however, the date is only updated when the date changes 
// from the last poll to prevent an unnecessary call to redraw the same date.
function clockHandler(evt) {
    const today = evt ? evt.date : new Date();
    const mins  = zeroPad(today.getMinutes());
    let hours   = today.getHours();

    if (today.getDate() !== dateNum) {
        fetchDate();
    }

    if(preferences.clockDisplay === "12h") {
        // 12h format
        hours = hours % 12 || 12;
    } 
    
    else {
        // 24h format
        hours = zeroPad(hours);
    }

    const timeString = `${hours}:${mins}`;

    if (typeof handleCallback === "function") {
        handleCallback ({ time: timeString, date: dateString});
    }
}