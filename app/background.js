import { secondsPerHour } from "../common/constants";
import document from "document";

let currentCondition;
let lastStatus;

const img = document.getElementById("img");

export function changeBackgroundImg(data, lastCondition) {
    console.log(`Running background Check`);
    currentCondition = data.conditionCode;
    let status = {
        isDay:     isDay(data),
        isNight:   isNight(data),
        isSunrise: isSunrise(data),
        isSunset:  isSunset(data)

    };
    console.log(JSON.stringify(status));
    if (status !== lastStatus && currentCondition !== lastCondition) {
        console.log(`Background Image Requested`);
        console.log(`Condition: ${currentCondition}`);

        if(status.isDay) {
            if (status.isSunrise) {
                img.href = "images/sunrise.jpg";
            }
            else if (status.isSunset) {
                if(currentCondition !== 0 && currentCondition !== 1) {
                    img.href = "images/sunrise.jpg";
                }
                else {
                    img.href = "images/sunset.jpg";
                }
            }
            else {
                if(currentCondition === 0) { img.href = "images/dayClear.jpg"; }
                else if (currentCondition === 1) { img.href = "images/dayPartlyCloudy.jpg"; }
                else if (currentCondition === 2) { img.href = "images/dayCloudy.jpg"; }
                else if (currentCondition === 3) { img.href = "images/dayCloudy.jpg"; }
                else if (currentCondition === 4) { img.href = "images/dayCloudy.jpg"; }
                else if (currentCondition === 5) { img.href = "images/dayCloudy.jpg"; }
                else if (currentCondition === 6) { img.href = "images/dayCloudy.jpg"; }
                else { img.href = "images/dayClear.jpg"; }
            }
        }
        else {
            if(currentCondition === 0 || currentCondition === 1) { img.href = "images/nightClear.jpg"; }
            else { img.href = "images/nightCloudy.jpg"; }
        }

        lastStatus = status;
        lastCondition = currentCondition
    }
    
}

function isSunrise(data) {
    if (data.currentTime < (data.sunrise + 1 * secondsPerHour ) && data.currentTime > data.sunrise) {
        return true;
    }
    return false;
}

function isSunset(data) {
    if (data.currentTime > (data.sunset - 1 * secondsPerHour ) && data.currentTime < data.sunset) {
        return true;
    }
    return false;
}

function isDay(data) {
    if (data.currentTime > data.sunrise && data.currentTime < data.sunset) {
        return true;
    }
    return false;
}

function isNight(data) {
    if (data.currentTime > data.sunset || data.currentTime < data.sunrise) {
        return true;
    }
    return false;
}
