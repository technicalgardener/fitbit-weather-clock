import { isDay, isSunrise, isSunset, isNight } from "../common/util";
import document from "document";

let currentCondition;
let lastCondition;
let currentStatus;
let lastStatus = {
  isDay: false,
  isNight: false,
  isSunrise: false,
  isSunset: false
};

const img = document.getElementById("img");

// Change Background Image
// Evaluates time of day status and current weather conditions to control which
// background image is chosen to display. If there is no change in status or
// conditions from the last poll, then the display is not updated to prevent
// an unnecessary call to redraw the same background image.
export function changeBackgroundImg(data) {
    currentCondition = data.conditionCode;
    currentStatus = {
        isDay:     isDay(data),
        isNight:   isNight(data),
        isSunrise: isSunrise(data),
        isSunset:  isSunset(data)
    };

    if (statusChanged() && conditionChanged()) {
        if(currentStatus.isDay) {
            if (currentStatus.isSunrise) {
                img.href = "images/sunrise.jpg";
            }

            else if (currentStatus.isSunset) {
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

        lastStatus = currentStatus;
        lastCondition = currentCondition
    }
}


// Status Changed
// Helper function for changeBackgroundImg
function statusChanged() {
    if (currentStatus.isDay !== lastStatus.isDay || currentStatus.isSunrise !== lastStatus.isSunrise || currentStatus.isSunset !== lastStatus.isSunset || currentStatus.isNight !== lastStatus.isNight) {
        return true;
    }

    return false;
}

// Condition Changed
// Helper function for changeBackgroundImg
function conditionChanged() {
    if (currentCondition !== lastCondition) {
        return true;
    }
    
    return false;
}