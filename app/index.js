import * as weather from "./weather";
import * as clock from "./clock";
import * as activity from "./activity";
import { changeBackgroundImg } from "./background";
import document from "document";

const time = document.getElementById("time");
const details = document.getElementById("details");
const steps = document.getElementById("steps");

let currentDate;

// *** Clock *** //
clock.initialize("minutes", data => {
    let date = data.date;
    time.text = data.time;

    if(date !== currentDate) {
        currentDate = date;
        details.text = currentDate;
    }
    
})

// *** Weather *** //
weather.initialize(data => {
    changeBackgroundImg(data);
});

// *** Step Counter *** //
activity.initialize(data => {
    steps.text = data.steps;
})