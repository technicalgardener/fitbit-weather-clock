import { isDay, isSunrise, isSunset} from "../common/util";
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

export function changeBackgroundImg(data) {
    currentCondition = data.conditionCode;
    currentStatus = {
        isDay:     isDay(data),
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

function statusChanged() {
    if (currentStatus.isDay !== lastStatus.isDay || currentStatus.isSunrise !== lastStatus.isSunrise || currentStatus.isSunset !== lastStatus.isSunset) {
        return true;
    }

    return false;
}

function conditionChanged() {
    if (currentCondition !== lastCondition) {
        return true;
    }
    
    return false;
}