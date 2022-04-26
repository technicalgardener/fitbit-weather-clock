import * as weather from "./weather";
import * as clock from "./clock";
import * as activity from "./activity";
import document from "document";

const time = document.getElementById("time");
const details = document.getElementById("details");
const steps = document.getElementById("steps");
const img = document.getElementById("img")

let currentDate;

clock.initialize("minutes", data => {
    let date = data.date;
    time.text = data.time;

    if(date !== currentDate) {
        currentDate = date;
        details.text = currentDate;
    }
    
})

weather.initialize(data => {});

activity.initialize(data => {
    steps.text = data.steps;
})