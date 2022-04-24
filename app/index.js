import * as weather from "./weather";
import * as clock from "./clock";
import * as activity from "./activity";
import document from "document";

console.log("App code started.");

const time = document.getElementById("time");
const details = document.getElementById("details");
const steps = document.getElementById("steps");
const img = document.getElementById("img")

let currentDate;

clock.initialize("minutes", data => {
    let date = data.date;
    console.log(`Time is: ${data.time}`);
    time.text = data.time;

    if(date !== currentDate) {
        currentDate = date;
        console.log(`Date is: ${currentDate}`);
        details.text = currentDate;
    }
    
})

weather.initialize(data => {
    let condition = data.conditionString;
    console.log(`Weather is: ${condition}`);
});

activity.initialize(data => {
    console.log(`Current steps: ${data.steps}`);
    steps.text = data.steps;
})